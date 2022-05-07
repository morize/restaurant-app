const { Router } = require('express');
const path = require('path');

function getImage(req, res) {
  const fileName = req.params.id;

  res.sendFile(
    path.join(__dirname, '../..', 'public/images', fileName),
    (err) => {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log('Sent:', fileName);
      }
    }
  );
}

const fileRoutes = Router();

fileRoutes.get('/images/:id', getImage);

module.exports = fileRoutes;
