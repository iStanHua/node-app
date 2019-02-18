// base/url.js  URL

import { URL, urlSearchParams } from 'url'

export default {
  run() {
    let myURL = new URL('/url.html', 'http://nodejs.cn')
    console.log(`URL:${myURL}`)

    myURL.hash = 'url_url_hash'
    console.log(`hash:${myURL.hash}`)
    console.log(`host:${myURL.host}`)
    console.log(`hostname:${myURL.hostname}`)
    console.log(`href:${myURL.href}`)
    console.log(`origin:${myURL.origin}`)
    console.log(`pathname:${myURL.pathname}`)
    console.log(`port:${myURL.port}`)
    console.log(`protocol:${myURL.protocol}`)

    myURL.search = 'abc=xyz'
    console.log(`search:${myURL.href}`)
    console.log(`searchParams:${myURL.searchParams.get('abc')}`)

    myURL.searchParams.append('d', '123')
    console.log(`searchParams.append:${myURL.href}`)

    myURL.searchParams.delete('abc')
    myURL.searchParams.set('a', 'b')
    console.log(`searchParams.set:${myURL.href}`)

    myURL.username = 'abc'
    myURL.password = '123'
    console.log(`password:${myURL.href}`)

    let params = new URLSearchParams('user=abc&query=xyz')
    console.log(`URLSearchParams:${params.get('user')}`)
    params.append('a', 'c')
    console.log(`URLSearchParams.append:${params.get('a')}`)
  }
}