import CryptoJS from "crypto-js";
const secretKey = "yrhgbl,yjdhrtg";

const encryptData = (text) => {
  const data = CryptoJS.AES.encrypt(JSON.stringify(text), secretKey).toString();

  return data;
};

const decryptData = (text) => {
  const bytes = CryptoJS.AES.decrypt(text, secretKey);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export { encryptData, decryptData };
