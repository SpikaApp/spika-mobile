import { Buffer } from "@craftzdog/react-native-buffer";
import AesGcmCrypto from "react-native-aes-gcm-crypto";
import Crypto from "react-native-quick-crypto";

const generateSalt = (): string => {
  const salt = Crypto.randomBytes(32);
  return Buffer.from(salt).toString("base64");
};

export const keyFromPassword = (password: string, salt: string): string => {
  const inputBuffer = Buffer.from(password, "utf-8");
  const data = Crypto.pbkdf2Sync(inputBuffer, salt, 100000, 32, "sha512");
  return Buffer.from(data).toString("base64");
};

export const encrypt = async (data: string, password: string): Promise<EncryptedObject> => {
  const salt = generateSalt();
  const cryptoKey = keyFromPassword(password, salt);
  const result = await AesGcmCrypto.encrypt(data, false, cryptoKey);
  return { content: result.content, iv: result.iv, tag: result.tag, salt: salt };
};

export const decrypt = async (data: EncryptedObject, password: string): Promise<string> => {
  const cryptoKey = keyFromPassword(password, data.salt);
  return await AesGcmCrypto.decrypt(data.content, cryptoKey, data.iv, data.tag, false);
};
