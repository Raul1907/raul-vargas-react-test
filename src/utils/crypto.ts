import CryptoJS from 'crypto-js';

const secretKey = 'mySecretKey123!'; // Clave secreta para el cifrado

// Función para cifrar datos
export function encryptData (data: string){
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

// Función para descifrar datos
export function decryptData (encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};