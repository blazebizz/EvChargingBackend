const { validationResult } = require("express-validator");

exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: -1, statusDesc: "invalid payload", errors: errors.array() });
    } else {
        next();
    }
};

exports.requestLogger = (req, res, next) => {
    let { body, query } = req

    if (Object.keys(body).length > 0) {
        console.log("***request body***", JSON.stringify(body));
    }

    if (Object.keys(query).length > 0) {
        console.log("***request query***", query);
    }

    next()
};


/*// Method to create a UUID of length 7
exports.createUUID = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Get current timestamp

    let randomString = '';
    while (randomString.length < 7) {
        const randomChar = Math.floor(Math.random() * 36); // Generate a random number between 0 and 35 (inclusive)
        if (randomChar < 10) {
            // If the random number is less than 10, it represents a digit (0-9)
            randomString += String.fromCharCode(randomChar + 48); // Convert the number to ASCII character code for digits (48-57)
        } else {
            // If the random number is 10 or greater, it represents an uppercase letter (A-Z)
            randomString += String.fromCharCode(randomChar + 55); // Convert the number to ASCII character code for uppercase letters (65-90)
        }
    }

    return randomString;
};*/


exports.createUUID=()=> {
    return Math.random().toString(36).substring(2, 9).toUpperCase();
}
