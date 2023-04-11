const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new S3Client();

const upload = async() => {
    multer({
        storage: multerS3({
          s3: s3,
          bucket: 'congweldingimages',
          metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
          key: function (req, file, cb) {
            cb(null, Date.now().toString())
          }
        })
      });
}

app.post('/upload', upload.array('photos', 3), function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})