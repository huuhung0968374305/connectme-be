"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHelper = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
class CryptoHelper {
    static encryptMsg(data) {
        return crypto_js_1.default.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    }
    static decryptMsg(data) {
        const bytes = crypto_js_1.default.AES.decrypt(data, this.secretKey);
        return JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8));
    }
}
exports.CryptoHelper = CryptoHelper;
CryptoHelper.secretKey = "crypto-secret";
