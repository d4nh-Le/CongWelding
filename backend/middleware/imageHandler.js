const multer = require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require('sharp');
const HttpError = require('../models/httpError');
require('dotenv').config({ path: './local.env' });

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const uploadImage = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    console.log(err);
                    return next(new HttpError('Failed to upload file.', 500));
                }

                // Checks file extension and data contents
                if (!req.file.mimetype.startsWith('image/')) {
                    const error = new HttpError(
                        'Only images are allowed to be uploaded.',
                        400
                    );
                    return next(error);
                }

                sharp(req.file.buffer).metadata()
                    .then(() => {
                        const params = {
                            Bucket: bucketName,
                            Key: req.file.originalname.replace(/\s+/g, ''),
                            Body: req.file.buffer,
                            ContentType: req.file.mimetype
                        };
                    
                        const command = new PutObjectCommand(params);
                    
                        s3.send(command, (err, data) => {
                            if (err) {
                                return next(new HttpError('Failed to save image on cloud.', 500));
                            }
                    
                            res.status(201).json({ imageUrl: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${req.file.originalname.replace(/\s+/g, '')}` });
                        });
                    })
                    .catch((err) => {
                        const error = new HttpError(
                            'Only images are allowed to be uploaded.',
                            400
                        );
                        return next(error);
                    });
            });
        });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Failed to upload file.', 500));
    }
}

  
const deleteImage = async (req, res, next) => {

    const { image } = req.params;
    
    const params = {
        Bucket: bucketName,
        Key: image,
    }

    const command = new DeleteObjectCommand(params);

    try {
        await s3.headObject(params).promise();
      } catch (err) {
        const error = new HttpError(
            'Image not found on cloud.',
             404
        );
        return next(error);
      }

    try {
      await s3.send(command);
    } catch (err) {
        const error = new HttpError(
            'Failed to delete image',
            500
        );
        console.log(err);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted image.' });
}

module.exports = {
    uploadImage,
    deleteImage
}