const activeENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'
console.log("envRuning on", activeENV);

const environmentSetup = require(`./../environments/${activeENV}.env.js`)

exports.firestore_config = environmentSetup.firestore_config
exports.external_apis = environmentSetup.external_apis
exports.pg_config = environmentSetup.pg_config
exports.firebase_sdk_cred = environmentSetup.firebase_sdk_cred

exports.collections = {
    partnerOnboard: 'partnerOnboard',
    chargingStationCollection:'rajChargingStation'
}

exports.pgTables = {
    partnerOnboard: 'partnerOnboard',
    userData: 'userData',
    chargingStation:'rajChargingStation',
    partner:'rajPartner',
    slot:'rajSlot'
}



