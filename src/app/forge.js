// app/forge.js

import forge from 'node-forge'
import fs from 'fs'

export default {
  run() {
    const pki = forge.pki
    var keys = pki.rsa.generateKeyPair(1024)
    var cert = pki.createCertificate()
    cert.publicKey = keys.publicKey
    cert.serialNumber = (new Date()).getTime() + ''
    cert.validity.notBefore = new Date()
    cert.validity.notBefore.setFullYear(cert.validity.notBefore.getFullYear() - 5)
    cert.validity.notAfter = new Date()
    cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 20)
    var attrs = [{
      name: 'commonName',
      value: 'https-mitm-proxy-handbook'
    }, {
      name: 'countryName',
      value: 'CN'
    }, {
      shortName: 'ST',
      value: 'GuangDong'
    }, {
      name: 'localityName',
      value: 'ShenZhen'
    }, {
      name: 'organizationName',
      value: 'https-mitm-proxy-handbook'
    }, {
      shortName: 'OU',
      value: 'https://github.com/wuchangming/https-mitm-proxy-handbook'
    }];
    cert.setSubject(attrs)
    cert.setIssuer(attrs)
    cert.setExtensions([{
      name: 'basicConstraints',
      critical: true,
      cA: true
    }, {
      name: 'keyUsage',
      critical: true,
      keyCertSign: true
    }, {
      name: 'subjectKeyIdentifier'
    }])

    // self-sign certificate
    cert.sign(keys.privateKey, forge.md.sha256.create())

    var certPem = pki.certificateToPem(cert)
    var keyPem = pki.privateKeyToPem(keys.privateKey)
    var certPath = './src/sources/rootCA.crt'
    var keyPath = './src/sources/rootCA.key.pem'

    console.log('公钥内容：\n')
    console.log(certPem)
    console.log('私钥内容：\n')
    console.log(keyPem)
    console.log(`公钥存放路径：\n ${certPath}\n`)
    console.log(`私钥存放路径：\n ${keyPath}\n`)

    fs.writeFileSync(certPath, certPem)
    fs.writeFileSync(keyPath, keyPem)
  }
}