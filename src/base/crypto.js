// base/crypto.js

import crypto from 'crypto'
import fs from 'fs'

export default {
  run() {
    let secret = crypto.randomBytes(8).toString('hex')
    let iv = crypto.randomBytes(8).toString('hex')
    let str = fs.readFileSync('./src/sources/crypto.txt', 'utf-8')

    console.log(`secret:${secret}`)
    console.log(`iv:${iv}`)

    let encrypted = this.cipher(str, secret)
    fs.writeFileSync('./src/sources/crypto-cipher.txt', encrypted)


    let decrypted = this.decipher(encrypted, secret)
    fs.writeFileSync('./src/sources/crypto-decipher.txt', decrypted)
    encrypted = null
    decrypted = null

    encrypted = this.cipheriv(str, secret, iv)
    fs.writeFileSync('./src/sources/crypto-cipheriv.txt', encrypted)

    decrypted = this.decipheriv(encrypted, secret.iv)
    fs.writeFileSync('./src/sources/crypto-decipheriv.txt', decrypted)
    encrypted = null
    decrypted = null

    console.log('hash:' + this.hash(str))
    console.log('hmac:' + this.hmac(str, secret))
  },
  /**
   * 加密数据
   * @param {String} decrypted  明文
   * @param {String} secret     密钥
   */
  cipher(decrypted, secret) {
    const cipher = crypto.createCipher('aes192', secret)
    let encrypted = []
    encrypted.push(cipher.update(decrypted, 'utf8', 'hex'))
    encrypted.push(cipher.final('hex'))
    return encrypted.join('')
  },
  /**
   * 解密数据
   * @param {String} encrypted  密文
   * @param {String} secret     密钥
   */
  decipher(encrypted, secret) {
    const decipher = crypto.createDecipher('aes192', secret)
    let decrypted = []
    decrypted.push(decipher.update(encrypted, 'hex', 'utf8'))
    decrypted.push(decipher.final('utf8'))
    return decrypted.join('')
  },
  /**
   * 哈希
   * @param {String} decrypted  明文
   */
  hash(decrypted) {
    const hash = crypto.createHash('sha256')
    hash.update(decrypted)
    return hash.digest('hex')
  },
  /**
   * 加密Hmac
   * @param {String} decrypted  明文
   * @param {String} secret     密钥
   */
  hmac(decrypted, secret) {
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(decrypted)
    return hmac.digest('hex')
  },
  /**
   * 签名
   * @param {String} decrypted           明文
   * @param {String| Object} privateKey  私钥
   */
  sign(decrypted, privateKey) {
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(decrypted)
    return sign.sign(privateKey, 'hex')
  },

  /**
   * 公钥加密
   * @param {String} data   明文
   * @param {Buffer} key
   */
  encrypt(data, key) {
    return crypto.publicEncrypt(key, Buffer.from(data))
  },

  /**
   * 私钥解密
   * @param {String} data   密文
   * @param {Buffer} key
   */
  decrypt(encrypted, key) {
    return crypto.privateDecrypt(key, encrypted)
  },

  /**
   * AES_128_CBC加密数据
   * @param {String} decrypted  明文
   * @param {String} key        密钥
   * @param {String} iv         密钥
   */
  cipheriv(decrypted, key, iv) {
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    cipher.setAutoPadding(true)
    let encrypted = []
    encrypted.push(cipher.update(decrypted, 'utf8', 'base64'))
    encrypted.push(cipher.final('base64'))
    return encrypted.join('')
  },
  /**
   * AES_128_CBC解密数据
   * @param {String} encrypted  密文
   * @param {String} key        密钥
   * @param {String} iv         密钥
   */
  decipheriv(encrypted, key, iv) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
    decipher.setAutoPadding(true)
    let decrypted = []
    decrypted.push(decipher.update(encrypted, 'base64', 'utf8'))
    decrypted.push(decipher.final('utf8'))
    return decrypted.join('')
  }
}