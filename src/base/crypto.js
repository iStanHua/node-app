// base/crypto.js

import crypto from 'crypto'

export default {
  run() {
    let secret = 'crypto_aes192'
    this.cipher('hello node.js', secret)
    this.decipher('773767e0c53c6dd0c811b52ce7209e3c', secret)
    console.log('hash:' + this.hash('hello node.js'))
    console.log('hmac:' + this.hmac('hello node.js', secret))
  },
  /**
   * 加密数据
   * @param {String} decrypted  明文
   * @param {String} secret     密钥
   */
  cipher(decrypted, secret) {
    const cipher = crypto.createCipher('aes192', secret)
    let encrypted = cipher.update(decrypted, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    console.log('cipher加密:' + encrypted)
  },
  /**
   * 解密数据
   * @param {String} encrypted  密文
   * @param {String} secret     密钥
   */
  decipher(encrypted, secret) {
    const decipher = crypto.createDecipher('aes192', secret)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    console.log('decipher解密:' + decrypted)
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
  }
}