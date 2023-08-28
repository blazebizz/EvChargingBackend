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
// app.use(express.static(path.join(__dirname, 'docs')));

const root_point_v1 = '/api/v1'

app.use(root_point_v1 + '/docs', express.static(path.join(__dirname, 'doc')));

app.use(root_point_v1 + '/', indexRouter);
app.use(root_point_v1 + '/partner', partnerRouter);

module.exports = app;
