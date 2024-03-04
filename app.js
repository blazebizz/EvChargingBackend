const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const admin = require("firebase-admin");
const {firestore_config} = require('./cred/env');


const indexRouter = require('./routes/index');
const partnerRouter = require('./routes/partner/partner.router');
const authorizationRouter = require('./routes/authorization.router');
const generateToken = require('./routes/token/token.route');
const userDashboard = require('./routes/userDashboard')
// const { requestLogger } = require('./services/validator.service');
const chargingStation = require('./routes/station/charging_station.router');
const slot = require('./routes/station/slot.router');
const {responseCode} = require("./services/static.service");

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'docs')));


// var serviceAccount = firestore_config;
admin.initializeApp({
    credential: admin.credential.cert(firestore_config), // databaseURL: env.firebaseSetup.db
});

//region handling errors
/*app.all("/!*", (req, res, next) => {
    const err = Error(`Can't find ${req.originalUrl} on the server!`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});*/

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: responseCode.FAIL, message: error.message
    })

})
//end region


const root_point_v1 = '/api/v1'

app.use(root_point_v1 + '/docs', express.static(path.join(__dirname, 'doc')));

app.use(root_point_v1 + '/', indexRouter);
app.use(root_point_v1 + '/auth', authorizationRouter);
app.use(root_point_v1 + '/partner', partnerRouter);
app.use(root_point_v1 + '/', generateToken);
app.use(root_point_v1 + '/', userDashboard);
app.use(root_point_v1 + '/', chargingStation);
app.use(root_point_v1 + '/', slot);


module.exports = app;
