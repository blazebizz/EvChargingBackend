var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var partnerRouter = require('./routes/partner.router');
const { requestLogger } = require('./services/validator.service');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const root_point_v1 = '/api/v1'

app.use(root_point_v1 + '/', requestLogger, indexRouter);
app.use(root_point_v1 + '/partner', requestLogger, partnerRouter);

module.exports = app;
