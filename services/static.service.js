const jwt = require('jsonwebtoken');

exports.partnerOnboardKey = {
    1: "Basic Info",
    2: "PAN",
    3: "Aadhar",
    4: "Bank Details"
}

exports.error_code_wise_status = {
    400: 0,
    200: 1
}

exports.responseCode = {
    SUCCESS: 1,
    FAIL: 0,
    INTERNAL_ERROR: -1

}


exports.responseDeliver = (code, message, error = "", data = []) => {
    data = Array.isArray(data) ? data : [data]
    let response = {status: code, message, data}
    console.log("response_logger ==> ", {...response, error});
    return response
}

exports.handelErrorResponse = (reject, error, message) => {
    console.log("Getting Error ===>", error)
    if (error.code === 'ENOTFOUND') {
        return reject(this.responseDeliver(this.responseCode.INTERNAL_ERROR, "Unable to connect the database", error));
    }if (error.code === 'ERR_UNHANDLED_REJECTION') {
        return reject(this.responseDeliver(this.responseCode.INTERNAL_ERROR, "Data base operation error", error));
    } else
        return reject(this.responseDeliver(this.responseCode.FAIL, message, error));
};


exports.verifyToken = (req) => {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization;
        if (!token) {
            return reject('No token provided');
        }

        jwt.verify(token, 'my-key', (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err);
                return reject(err);
            } else {
                const { user_id } = decoded;
                let res = this.responseDeliver(this.responseCode.SUCCESS,"verified","",user_id)
                console.log("token verification response ===> ",res);
                return resolve(res);
            }
        });
    });
};
