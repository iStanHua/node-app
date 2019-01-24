// base/dns.js 域名服务器

import dns from 'dns'

export default {
  run() {
    const options = {
      family: 6,
      hints: dns.ADDRCONFIG | dns.V4MAPPED,
    }
    dns.lookup('baidu.com', options, (err, address, family) => {
      if (err) throw err
      console.log('IP 地址: %j 地址族: IPv%s', address, family)
    })


    dns.resolve4('archive.org', (err, addresses) => {
      if (err) throw err

      console.log(`IP 地址: ${JSON.stringify(addresses)}`)

      // addresses.forEach((a) => {
      //   dns.reverse(a, (err, hostnames) => {
      //     if (err) throw err
      //     console.log(`IP 地址 ${a} 逆向解析到域名: ${JSON.stringify(hostnames)}`)
      //   })
      // })
    })
  }
}