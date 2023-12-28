"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorSign = exports.validatorForUser = void 0;
exports.validatorForUser = ({
    user_name: { notEmpty: true },
    password: { notEmpty: true },
    type: { notEmpty: true },
    name: { notEmpty: true }
});
exports.validatorSign = ({
    user_name: { notEmpty: true },
    password: { notEmpty: true }
});
//# sourceMappingURL=validationSchemas.js.map