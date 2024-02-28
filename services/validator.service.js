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

