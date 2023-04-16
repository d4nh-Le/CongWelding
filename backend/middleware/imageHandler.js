const AWS = require('aws-sdk');
const multer = require('multer');
const axios = require('axios');
// test code
const fs = require('fs');
const imageBuffer = fs.readFileSync('C:/Users/WinglyRig/Downloads/img/img/ARC 200 EDON.jpg');

// Sets credentials for AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'ca-central-1' // could be wrong
});

// Create S3 client
const s3 = new AWS.S3();

// Uploads new image to cloud storage
const uploadImage = async (req, res, next) => {
  
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // limits the file size to 5MB
    },
    fileFilter: async (req, file) => {
      if (!file.mimetype.startsWith('/image')) {
        const error = new HttpError(
          'File is not an image.',
          400
        );
        throw error;
      }
    }
  });

  let uploadedImage;

  try {
    uploadedImage = await upload.single('image')(req, res);
  } catch (err) {
    const error = new HttpError(
      'Failed to upload image.',
      500
    );
    return next(error);
  }

  // Get the image data
  const imageData = {
    name: uploadedImage.originalname,
    url: uploadedImage.location,
    size: uploadedImage.size,
    mimetype: uploadedImage.mimetype,
  };

  res.status(201).json({ imageData });
};

const testRun = () => {
  axios.post('https://localhost:5000/upload', {
  image: imageBuffer
})
.then(response => {
  // console.log(response.statusCode); // should print 201
  console.log(response); // should print the uploaded image data
})
.catch(error => {
  // console.log(error.response.statusCode); // should print the error status code
  console.log(error.response); // should print the error message
});
}

testRun();


// Deletes image by id on cloud storage
const deleteImage = async () => {

}

module.exports = {
  uploadImage,
  deleteImage
}