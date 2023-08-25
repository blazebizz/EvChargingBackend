const activeENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'
console.log("envRuning on", activeENV);

const environmentSetup = require(`./../environments/${activeENV}.env.js`)

exports.firestore_config = environmentSetup.firestore_config
exports.external_apis = environmentSetup.external_apis
// exports.externalUrl = environmentSetup.external_urls

exports.collections = {
    partnerOnboard : 'partnerOnboard'
}




