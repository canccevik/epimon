import { ec as EC } from 'elliptic'

const ec = new EC('secp256k1')

export function isPublicKeyValid(publicKey: string): boolean {
  try {
    ec.keyFromPublic(publicKey, 'hex').getPublic('hex')
  } catch (error) {
    return false
  }
  return true
}
