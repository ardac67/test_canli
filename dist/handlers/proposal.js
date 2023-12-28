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
exports.changeStatusOfProposal = exports.getIndividualProposal = exports.getProposal = exports.postProposal = void 0;
var db_1 = __importDefault(require("../db"));
var postProposal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var proposal_find, proposal, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1.default.proposal.count({
                        where: {
                            user_id: req.body.user_id,
                            belongsToCampaign: {
                                campaign_id: req.body.campaign_id
                            }
                        }
                    })];
            case 1:
                proposal_find = _a.sent();
                if (proposal_find > 0) {
                    res.status(500);
                    res.json({ error: 'Proposal already sent' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.default.proposal.create({
                        data: {
                            user_id: req.body.user_id,
                            proposal_body: req.body.proposal_body,
                            campaign_id: req.body.campaign_id,
                            proposal_status: req.body.proposal_status,
                            createdAt: new Date()
                        }
                    })];
            case 2:
                proposal = _a.sent();
                res.json({ proposal: proposal });
                res.status(200);
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
exports.postProposal = postProposal;
var getProposal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var proposal, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.proposal.findMany({
                        include: {
                            belongsToUser: true
                        },
                        where: {
                            campaign_id: req.params.id,
                            proposal_status: 'pending'
                        }
                    })];
            case 1:
                proposal = _a.sent();
                res.json({ proposal: proposal });
                res.status(200);
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
exports.getProposal = getProposal;
var getIndividualProposal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var proposal, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.proposal.findMany({
                        where: {
                            user_id: req.params.id
                        },
                        include: {
                            belongsToCampaign: {
                                include: {
                                    user: true
                                }
                            },
                            belongsToUser: true
                        }
                    })];
            case 1:
                proposal = _a.sent();
                res.json({ proposal: proposal });
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
exports.getIndividualProposal = getIndividualProposal;
var changeStatusOfProposal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var proposal, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(req.body.status === 'Approved')) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1.default.proposal.update({
                        data: {
                            proposal_status: req.body.status
                        },
                        where: {
                            proposal_id: req.params.id
                        }
                    })];
            case 1:
                proposal = _a.sent();
                return [4 /*yield*/, db_1.default.collaboration.create({
                        data: {
                            campaign_id: req.body.campaign_id,
                            user_id: req.body.user_id,
                            proposed_user_id: req.body.proposed_user_id,
                            createdAt: new Date()
                        }
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, db_1.default.proposal.update({
                    data: {
                        proposal_status: req.body.status
                    },
                    where: {
                        proposal_id: req.params.id
                    }
                })];
            case 4:
                proposal = _a.sent();
                _a.label = 5;
            case 5:
                res.json({ proposal: proposal });
                res.status(200);
                return [3 /*break*/, 7];
            case 6:
                e_4 = _a.sent();
                console.log(e_4);
                res.status(500);
                res.json({ error: e_4 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.changeStatusOfProposal = changeStatusOfProposal;
//# sourceMappingURL=proposal.js.map