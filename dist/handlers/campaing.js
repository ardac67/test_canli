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
exports.getAll = exports.getAllCampaignInfluencer = exports.getAllCampaign_byCampaign_id = exports.getAllCampaign = exports.createCampagin = void 0;
var db_1 = __importDefault(require("../db"));
var createCampagin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                        var campaign, collaboration, tags, preffered_platforms;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tx.campaign.create({
                                        data: {
                                            campaign_image: req.body.campaign_image,
                                            user_id: req.body.user_id,
                                            campaign_header: req.body.campaign_header,
                                            campaign_description: req.body.campaign_description,
                                            status: req.body.status,
                                            startedAt: parseAndFormatDate(req.body.campaignStartDate),
                                            endedAt: parseAndFormatDate(req.body.campaignEndDate),
                                        },
                                    })];
                                case 1:
                                    campaign = _a.sent();
                                    return [4 /*yield*/, tx.collaboration_preferences.create({
                                            data: {
                                                target_audience: req.body.target_audience,
                                                age_interval: req.body.age_interval,
                                                gender_information: req.body.gender_information,
                                                statistical_interval: req.body.statistical_interval,
                                                campaign_id: campaign.campaign_id,
                                            },
                                        })];
                                case 2:
                                    collaboration = _a.sent();
                                    return [4 /*yield*/, tx.campaing_tags.create({
                                            data: {
                                                tag1: req.body.tag1,
                                                tag2: req.body.tag2,
                                                tag3: req.body.tag3,
                                                tag4: req.body.tag4,
                                                tag5: req.body.tag5,
                                                campaign_id: campaign.campaign_id,
                                            },
                                        })];
                                case 3:
                                    tags = _a.sent();
                                    return [4 /*yield*/, tx.preffered_platforms.create({
                                            data: {
                                                platform: req.body.platform,
                                                preference_id: collaboration.preference_id,
                                            },
                                        })];
                                case 4:
                                    preffered_platforms = _a.sent();
                                    res.json({
                                        data: {
                                            campaign: campaign,
                                            collaboration: collaboration,
                                            tags: tags,
                                            preffered_platforms: preffered_platforms,
                                        },
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500);
                res.json({ error: e_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCampagin = createCampagin;
var getAllCampaign = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var campaign, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.campaign.findMany({
                        where: {
                            user_id: req.params.id,
                        },
                    })];
            case 1:
                campaign = _a.sent();
                res.json({
                    campaign: campaign,
                });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                res.status(500);
                res.json({ error: e_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCampaign = getAllCampaign;
var getAllCampaign_byCampaign_id = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var campaign, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.campaign.findMany({
                        where: {
                            campaign_id: req.params.id,
                        },
                        include: {
                            user: {
                                include: {
                                    media_links: true,
                                    contact: true,
                                },
                            },
                            collaboration_preferences: {
                                include: {
                                    preffered_platforms: true,
                                },
                            },
                            campaing_tags: true,
                        },
                    })];
            case 1:
                campaign = _a.sent();
                res.json({
                    campaign: campaign,
                });
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
exports.getAllCampaign_byCampaign_id = getAllCampaign_byCampaign_id;
var getAllCampaignInfluencer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var campaign, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.campaign.findMany({
                        where: {},
                        include: {
                            campaing_tags: true,
                        },
                    })];
            case 1:
                campaign = _a.sent();
                res.json({
                    campaign: campaign,
                });
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
exports.getAllCampaignInfluencer = getAllCampaignInfluencer;
function parseAndFormatDate(dateString) {
    // Parse the date string to a JavaScript Date object
    var jsDate = new Date(dateString);
    return jsDate;
}
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var campaign, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.campaign.findMany({})];
            case 1:
                campaign = _a.sent();
                res.json({
                    campaign: campaign,
                });
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
exports.getAll = getAll;
//# sourceMappingURL=campaing.js.map