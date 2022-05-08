const { Router } = require('express');
const multer = require('multer');

const path = require('path');

const imageStorage = multer.diskStorage({
  destination: './storage/images',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 30000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a valid Image'));
    }
    cb(undefined, true);
  },
});

function getImage(req, res) {
  const fileName = req.params.id;

  res.sendFile(
    path.join(__dirname, '../..', 'storage/images', fileName),
    (err) => {
      if (err) {
        res.status(err.status).end();
      } else {
        console.log('Sent:', fileName);
      }
    }
  );
}

const fileRoutes = Router();

fileRoutes.get('/images/:id', getImage);
fileRoutes.post('/images', uploadImage.single('image'), (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = fileRoutes;
