"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePasswords = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt = __importStar(require("bcrypt"));
var comparePasswords = function (password, hash) {
    return bcrypt.compare(password, hash);
};
exports.comparePasswords = comparePasswords;
var hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    var token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        res.send("Not authorized");
        return;
    }
    var _a = bearer.split(" "), token = _a[1];
    if (!token) {
        res.status(401);
        res.send("Not authorized");
        return;
    }
    try {
        var payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log(payload);
        next();
        return;
    }
    catch (e) {
        console.error(e);
        res.status(401);
        res.send("Not authorized");
        return;
    }
};
exports.protect = protect;
//# sourceMappingURL=aut.js.map