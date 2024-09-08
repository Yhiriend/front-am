import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

export const encryptData = (data: any, password: string) => {
  try {
    const objectString = JSON.stringify(data);
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: 1000 });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encryptedObject = CryptoJS.AES.encrypt(objectString, key, { iv: iv }).toString();
    return { ciphertext: encryptedObject, salt: salt.toString(), iv: iv.toString() };
  } catch (error) {
    console.error('Error al cifrar los datos:', error);
    throw error;
  }
};

export const decryptData = (data: any, password: string) => {
  try {
    const salt = CryptoJS.enc.Hex.parse(data.salt);
    const iv = CryptoJS.enc.Hex.parse(data.iv);
    const key = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: 1000 });

    const decryptedObject = CryptoJS.AES.decrypt(data.ciphertext, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    const dataAsJSON = JSON.parse(decryptedObject);
    return dataAsJSON;
  } catch (error) {
    console.error('Error al descifrar los datos:', error);
    throw error;
  }
};
