"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfluencer = exports.updateUser = exports.getUser = exports.signin = exports.createNewUser = void 0;
var db_1 = __importDefault(require("../db"));
var aut_1 = require("../modules/aut");
var createNewUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hash_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, aut_1.hashPassword)(req.body.password)];
            case 1:
                hash_1 = _a.sent();
                return [4 /*yield*/, db_1.default.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                        var user, token;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tx.user.create({
                                        data: {
                                            user_name: req.body.user_name,
                                            email: req.body.email,
                                            password: hash_1,
                                            Type: req.body.type,
                                            name: req.body.name,
                                            description: req.body.description
                                        }
                                    })];
                                case 1:
                                    user = _a.sent();
                                    return [4 /*yield*/, tx.contact.create({
                                            data: {
                                                phone: req.body.contact.phone,
                                                user_id: user.user_id,
                                                address: req.body.contact.address
                                            }
                                        })];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, tx.media_links.create({
                                            data: {
                                                youtube: req.body.media_links.youtube,
                                                instagram: req.body.media_links.instagram,
                                                twitter: req.body.media_links.twitter,
                                                tiktok: req.body.media_links.tiktok,
                                                user_id: user.user_id
                                            }
                                        })];
                                case 3:
                                    _a.sent();
                                    token = (0, aut_1.createJWT)(user);
                                    res.json({
                                        data: {
                                            user_id: user.user_id,
                                            type: user.Type,
                                            token: token
                                        }
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500);
                res.json({ error: e_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createNewUser = createNewUser;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isValid, token, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1.default.user.findUnique({
                        where: {
                            user_name: req.body.user_name
                        }
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, aut_1.comparePasswords)(req.body.password, user.password)];
            case 2:
                isValid = _a.sent();
                if (!isValid) {
                    res.status(401);
                    res.json({ message: 'Invalid credidentials' });
                    return [2 /*return*/];
                }
                token = (0, aut_1.createJWT)(user);
                res.status(200);
                res.json({
                    token: token,
                    user_id: user.user_id,
                    type: user.Type,
                    user_name: user.user_name,
                    full_name: user.name
                });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                res.status(500);
                res.json({ error: e_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.user.findUnique({
                        where: {
                            user_id: req.params.id
                        }
                    })];
            case 1:
                user = _a.sent();
                res.json({ user: user });
                res.status(200);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                console.log(e_3);
                res.status(500);
                res.json({ error: e_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.user.update({
                        where: {
                            user_id: req.params.id
                        },
                        data: {
                            user_name: req.body.user_name,
                            email: req.body.email,
                            name: req.body.full_name,
                            description: req.body.description,
                            updatedAt: new Date()
                        }
                    })];
            case 1:
                user = _a.sent();
                res.json({ user: user });
                res.status(200);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                res.status(500);
                res.json({ error: e_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var getInfluencer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var influencer, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.user.findMany({
                        where: {
                            Type: 'Influencer'
                        }
                    })];
            case 1:
                influencer = _a.sent();
                res.json({ influencer: influencer });
                res.status(200);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                console.log(e_5);
                res.status(500);
                res.json({ error: e_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getInfluencer = getInfluencer;
//# sourceMappingURL=user.js.map