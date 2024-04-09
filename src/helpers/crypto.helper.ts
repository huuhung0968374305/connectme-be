import CryptoJS from "crypto-js";

export class CryptoHelper {
  private static secretKey = "crypto-secret";

  static encryptMsg(data: any) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey,
    ).toString();
  }

  static decryptMsg(data: any) {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
