var express = require('express');
var app = express();
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

app.use('/voting',ensureAuthenticated,express.static('../src'),express.static('../../election-contract/build/contracts'))

module.exports = router;
