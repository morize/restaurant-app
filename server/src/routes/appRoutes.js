const { Router, static } = require('express');
const { join } = require('path');

const appRoutes = Router();

function setAppRouteFolder() {
  return static(join(__dirname, '../../', 'public'));
}

appRoutes.get(
  ['/cafeteria', '/cafeteria/*', '/account', '/admin', '/admin/*'],
  (req, res) => {
    res.sendFile(join(__dirname, '../../public', 'index.html'));
  }
);

module.exports = {
  setAppRouteFolder,
  appRoutes,
};
