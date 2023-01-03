import { Buffer } from "@craftzdog/react-native-buffer";
import { pbkdf2Async } from "@noble/hashes/pbkdf2";
import { sha256 } from "@noble/hashes/sha256";
import CryptoJs from "crypto-js";
import { getRandomBytes } from "expo-random";
import type { EncryptedData } from "react-native-aes-gcm-crypto";
import AesGcmCrypto from "react-native-aes-gcm-crypto";
import Crypto from "react-native-quick-crypto";

// Computation using @nobles/hashes lib
const generateKey = async (password: string, salt: string): Promise<string> => {
  const inputBuffer = Buffer.from(password, "utf-8");
  const saltBuffer = Buffer.from(salt, "base64");
  const result = await pbkdf2Async(sha256, inputBuffer, saltBuffer, { c: 10000, dkLen: 32 });
  return Buffer.from(result).toString("base64");
};

// Computation using crypto-js lib
export const generateKeyV2 = (password: string) => {
  const inputBuffer = Buffer.from(password, "utf-8");
  const random = getRandomBytes(32);
  const pa = CryptoJs.lib.WordArray.create([...inputBuffer]);
  const sa = CryptoJs.lib.WordArray.create([...random]);
  const data = CryptoJs.PBKDF2(pa, sa, { hasher: CryptoJs.algo.SHA256, iterations: 10000, keySize: 32 });
  const result = Buffer.from(data.words).toString("base64");
  return { cryptoKey: result, salt: Buffer.from(sa.words).toString("base64") };
};

// Computation using native lib
export const generateKeyV3 = (password: string) => {
  const inputBuffer = Buffer.from(password, "utf-8");
  const random = getRandomBytes(32);
  const data = Crypto.pbkdf2Sync(inputBuffer, random, 10000, 32);
  const result = Buffer.from(data).toString("base64");
  return { cryptoKey: result, salt: Buffer.from(random).toString("base64") };
};

// Not fully implemented
// Todo: generate random salt
export const encrypt = async (data: string, password: string): Promise<EncryptedData> => {
  const cryptoKey = await generateKey(password, "123");
  return await AesGcmCrypto.encrypt(data, false, cryptoKey);
};

// Not fully implemented
export const decrypt = async (data: EncryptedData, password: string): Promise<string> => {
  const cryptoKey = await generateKey(password, "123");
  return await AesGcmCrypto.decrypt(data.content, Buffer.from(cryptoKey).toString("base64"), data.iv, data.tag, false);
};
