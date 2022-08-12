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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const Email_1 = __importDefault(require("../Helpers/Email"));
const config_js_1 = __importDefault(require("../Config/config.js"));
require("dotenv").config();
const SendEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield config_js_1.default.query(`SELECT * FROM users WHERE issent='0'`);
    users = users.rows;
    for (let user of users) {
        ejs_1.default.renderFile(__dirname + "/../../templates/registration.ejs", { username: user.username }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error);
                return;
            }
            let messageoption = {
                from: process.env.EMAIL_SENDER,
                to: user.email,
                subject: "Registration Successfull",
                html: data,
            };
            try {
                yield (0, Email_1.default)(messageoption);
                yield config_js_1.default.query(`UPDATE users SET issent='1' WHERE email = '${user.email}'`);
                console.log("Email is Sent");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = SendEmails;