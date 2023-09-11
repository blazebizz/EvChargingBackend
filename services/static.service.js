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


exports.responseDeliver = (error_code, message, error = "", data = []) => {
    data = Array.isArray(data) ? data : [data]

    let response = { status: this.error_code_wise_status[error_code], message, data }
    console.log("response_logger ==> ", { ...response, error });
    return response
}