// app/favicon.js

import fetchFavicon, { fetchFavicons } from '@meltwater/fetch-favicon'

export default {
  run() {
    fetchFavicon('https://baidu.com').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    fetchFavicons('https://baidu.com').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
};
