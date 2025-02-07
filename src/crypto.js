import CryptoJS from "crypto-js";
import { createTransform } from "redux-persist";

// Secret key for encryption
const passphrase = import.meta.env.VITE_APP_PASSPHRASE;
const secretKey = CryptoJS.PBKDF2(
  passphrase,
  CryptoJS.lib.WordArray.random(16),
  {
    keySize: 256 / 32,
    iterations: 1000,
  }
).toString();

// Transform to encrypt state
const encryptTransform = createTransform(
  (inboundState) => {
    // Encrypt the state before persisting
    return CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      secretKey
    ).toString();
  },
  (outboundState) => {
    // Decrypt the state when rehydrating
    try {
      const bytes = CryptoJS.AES.decrypt(outboundState, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error("Decryption failed", e);
      return outboundState;
    }
  }
);

export default encryptTransform;
