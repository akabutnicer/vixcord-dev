"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
exports.addMessageToConversation = exports.getConversationMessages = exports.createConversation = exports.getAllConversations = void 0;
var supabase_1 = require("../utils/supabase");
var socket_1 = require("../utils/socket");
var getAllConversations = function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var paticipatingConversationIds, conversations;
        return __generator(this, function (_b) {
            
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase_1["default"]
                        .from('user_conversation')
                        .select('conversation_id')
                        .eq('user_id', req.query.user_id)];
                case 1:
                    paticipatingConversationIds = _b.sent();
                    if (!((_a = paticipatingConversationIds.data) === null || _a === void 0 ? void 0 : _a.length)) {
                        return [2 /*return*/, res.send([])];
                    }
                    return [4 /*yield*/, supabase_1["default"]
                            .from('conversations')
                            .select("\n            *, \n            messages (\n                id,\n                conversation_id,\n                message,\n                created_at,\n                users (\n                    id,\n                    username\n                )\n            )\n        ")
                            .or("owner_user_id.eq.".concat(req.query.user_id, ",or(id.in.(").concat(paticipatingConversationIds.data.map(function (item) { return item.conversation_id; }), "))"))];
                case 2:
                    conversations = _b.sent();
                    return [2 /*return*/, res.send(conversations.data)];
            }
        });
    });
};
exports.getAllConversations = getAllConversations;
var createConversation = function (req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var _d, owner_id, participant_ids, group_name, conversation, participants, pivotData, actualParticipantUsers, conv;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log(req.body);
                    _d = req.body, owner_id = _d.owner_id, participant_ids = _d.participant_ids, group_name = _d.group_name;
                    return [4 /*yield*/, supabase_1["default"]
                            .from('conversations')
                            .upsert({
                            name: group_name,
                            owner_user_id: owner_id,
                            created_at: ((new Date()).toISOString()).toLocaleString()
                        })
                            .select()];
                case 1:
                    conversation = _e.sent();
                    if (conversation.error) {
                        return [2 /*return*/, res.send(conversation.error)];
                    }
                    participants = [];
                    if (!(participant_ids.length > 1 && ((_a = conversation.data) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 4];
                    return [4 /*yield*/, supabase_1["default"]
                            .from('user_conversation')
                            .upsert(participant_ids.map(function (participant_id) {
                            return {
                                user_id: participant_id,
                                conversation_id: conversation.data[0].id
                            };
                        }))
                            .select()];
                case 2:
                    pivotData = _e.sent();
                    if (!((_b = pivotData.data) === null || _b === void 0 ? void 0 : _b.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, supabase_1["default"]
                            .from('users')
                            .select()["in"]('id', participant_ids)];
                case 3:
                    actualParticipantUsers = _e.sent();
                    if ((_c = actualParticipantUsers.data) === null || _c === void 0 ? void 0 : _c.length)
                        participants = actualParticipantUsers.data;
                    _e.label = 4;
                case 4:
                    if (conversation.error) {
                        return [2 /*return*/, res.sendStatus(500)];
                    }
                    else {
                        conv = __assign(__assign({}, conversation.data[0]), { participants: participants });
                        return [2 /*return*/, res.send(conv)];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.createConversation = createConversation;
// src/controllers/conversation.controller.ts
var getConversationMessages = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conversation_id, last_message_date, query, messages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conversation_id = req.params.conversation_id;
                    last_message_date = req.query.last_message_date;
                    query = supabase_1["default"]
                        .from('messages')
                        .select("\n            id,\n            conversation_id,\n            message,\n            created_at,\n\n            users (\n                id,\n                username\n            )\n        ")
                        .order('created_at', { ascending: true })
                        .eq('conversation_id', conversation_id);
                    if (last_message_date) {
                        query = query.gt('created_at', last_message_date);
                    }
                    return [4 /*yield*/, query];
                case 1:
                    messages = _a.sent();
                    res.send(messages.data);
                    return [2 /*return*/];
            }
        });
    });
};
exports.getConversationMessages = getConversationMessages;
// src/controllers/conversation.controller.ts
var addMessageToConversation = function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, user_id, message, conversationid, data, userConversationIds, userIdsForMessages;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, user_id = _b.user_id, message = _b.message, conversationid = _b.conversationid;
                    return [4 /*yield*/, supabase_1["default"]
                            .from('messages')
                            .upsert({
                            conversation_id: conversationid,
                            user_id: user_id,
                            message: message,
                            created_at: ((new Date()).toISOString()).toLocaleString()
                        })
                            .select("\n        *,\n        users (\n            id,\n            username\n        ),\n        conversations (*)\n      ")
                        // get the users in this chat, except for the current one
                    ];
                case 1:
                    data = _c.sent();
                    return [4 /*yield*/, supabase_1["default"]
                            .from('user_conversation')
                            .select('user_id')
                            .eq('conversation_id', conversationid)];
                case 2:
                    userConversationIds = _c.sent();
                    if (data.error) {
                        res.send(500);
                    }
                    else {
                        if (userConversationIds.data && ((_a = userConversationIds.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            userIdsForMessages = userConversationIds.data.map(function (item) { return item.user_id; }).filter(function (item) { return item !== user_id; });
                            socket_1["default"].sendMessageToUsers(userIdsForMessages, data.data[0]);
                        }
                        res.send(data.data[0]);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.addMessageToConversation = addMessageToConversation;
