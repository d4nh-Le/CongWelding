const express = require('express');

const { uploadImage, deleteImage } = require('../middleware/imageHandler');

module.exports = express.Router()
    .post('/upload', uploadImage)
    .delete('/delete/:image', deleteImage);

