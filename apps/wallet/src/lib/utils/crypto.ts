import { AES, SHA3, enc } from 'crypto-js'

export function hashPassword(password: string) {
  return SHA3(password).toString()
}

export function encryptWithPassword(text: string, password: string) {
  return AES.encrypt(text, password).toString()
}

export function decryptWithPassword(encrypted: string, password: string) {
  return AES.decrypt(encrypted, password).toString(enc.Utf8)
}
