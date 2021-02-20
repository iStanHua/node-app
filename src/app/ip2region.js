// app/ip2region.js

const searcher = require('node-ip2region').create()

export default {
  run() {
    let result = searcher.btreeSearchSync('113.90.237.217')
    console.log(result)
  }
}
