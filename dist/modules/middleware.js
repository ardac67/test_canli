"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputError = void 0;
var express_validator_1 = require("express-validator");
var handleInputError = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.handleInputError = handleInputError;
//# sourceMappingURL=middleware.js.map