var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var admin = require("firebase-admin");
const { firestore_config } = require('./cred/env');



var indexRouter = require('./routes/index');
var partnerRouter = require('./routes/partner.router');
var authorizationRouter = require('./routes/authorization.router');
const { requestLogger } = require('./services/validator.service');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'docs')));


// var serviceAccount = firestore_config;

admin.initializeApp({
    credential: admin.credential.cert(firestore_config),
    // databaseURL: env.firebaseSetup.db
});


const root_point_v1 = '/api/v1'

app.use(root_point_v1 + '/docs', express.static(path.join(__dirname, 'doc')));

app.use(root_point_v1 + '/', indexRouter);
app.use(root_point_v1 + '/auth', authorizationRouter);
app.use(root_point_v1 + '/partner', partnerRouter);

module.exports = app;
