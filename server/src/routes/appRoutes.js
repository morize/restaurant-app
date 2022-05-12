const { Router } = require('express');
const { join } = require('path');

const appRoutes = Router();

appRoutes.get(['/app/', '/app/*'], (req, res) => {
  res.sendFile(join(__dirname, '../../public', 'index.html'));
});

module.exports = appRoutes;
