// app/puppeteer.js

import puppeteer from 'puppeteer'
import devices from 'puppeteer/DeviceDescriptors'
import cheerio from 'cheerio'

import PuppeteerUtil from './puppeteerUtil'

export default {
  async run() {
    // await this.nodeJS()
    // await this.dingTalk()
    // await this.request()
    // await this.meituan()
    await this.liren()
  },
  async nodeJS() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    let puppeteerUtil = new PuppeteerUtil(page)
    console.log(await puppeteerUtil.loginWeibo('xxxx', 'xxxxx'))

    // await page.pdf({ path: 'dingtalk.pdf', format: 'letter' })

    await page.tracing.start({ path: './src/images/trace.json' })
    await page.goto('http://nodejs.cn/api/')
    await page.tracing.stop()

    const data = await page.$$eval('#apicontent ul li', $li => {
      return $li.map(v => {
        return v.innerText.replace(/\s/g, '')
      })
    })

    console.log(data)
    await browser.close()
  },
  async dingTalk() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.emulate(devices['iPhone 6'])

    await page.goto('https://h5.dingtalk.com/orgsquare/index.html#/industryTop/1?code=0')

    await page.screenshot({ path: './src/images/dingtalk.png', fullPage: true })

    const aHandle = await page.evaluateHandle(() => document.body)
    const html = await page.evaluateHandle(body => body.innerHTML, aHandle)
    await aHandle.dispose()

    const $ = cheerio.load(await html.jsonValue())
    let data = {
      browseValues: [],
      starValues: [],
      subscribeValues: []
    }

    let $tabpane = $('.am-tabs-content .am-tabs-tabpane')
    for (let i = 0; i < $tabpane.length; i++) {
      for (let j = 0; j < $tabpane.eq(i).find('.section-list-item').length; j++) {
        let $item = $tabpane.eq(i).find('.section-list-item').eq(j)
        let _obj = {
          orgName: $item.find('.head-name').text().replace(/\s/g, ''),
          logoUrl: $item.find('img.dd-avatar-square').attr('src'),
          sesameCredit: $item.find('.medal').eq(2).text().replace(/\s/g, '').replace(/[^0-9]/ig, '')
        }
        $item = null
        let name = ''
        if (i == 0) {
          name = 'browseValues'
        }
        else if (i == 1) {
          name = 'starValues'
        }
        else if (i == 2) {
          name = 'subscribeValues'
        }
        data[name].push(_obj)
      }
    }
    $tabpane = null

    console.log(data)

    // const data = await page.$$eval('.am-tabs-tabpane-active .section-list-item', $li => {
    //   return $li.map(v => {
    //     return {
    //       name: v.querySelector('.head-name').innerText.replace(/\s/g, ''),
    //       logo: v.querySelector('.dd-avatar-square').getAttribute('src'),
    //       // value: v.querySelectorAll('.medal')[2].innerText.replace(/\s/g, '')
    //     }
    //   })
    // })
    // await page.pdf({ path: 'dingtalk.pdf', format: 'letter' })


    await browser.close()
  },
  async request() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    let images = []
    page.on('request', request => {
      if (request.resourceType() === 'image') {
        images.push(request.url())
        request.abort()
      }
      else
        request.continue()
    })

    await page.goto('http://news.baidu.com/')
    await page.screenshot({ path: './src/images/news.png', fullPage: true })
    // console.log(images)
    await browser.close()
  },
  async company() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.emulate(devices['iPhone 6'])

    await page.goto('https://m.1688.com/winport/company/b2b-2157572595.html')

    const aHandle = await page.evaluateHandle(() => document.body)
    const html = await page.evaluateHandle(body => body.innerHTML, aHandle)
    await aHandle.dispose()

    const $ = cheerio.load(await html.jsonValue())
    let data = []

    let $list = $('.tab-content .tab-pane').eq(1).find('.archive-authinfo-mod li')
    for (let i = 0; i < $list.length; i++) {
      let $item = $list.eq(i)
      data.push($item.find('span').text().replace(/\s/g, ''))
      $item = null
    }
    $list = $('.archive-sheet .phone')
    for (let i = 0; i < $list.length; i++) {
      let $item = $list.eq(i)
      data.push($item.text().replace(/\s/g, ''))
      $item = null
    }
    $list = null
    console.log(data)
    // await browser.close()
  },
  async meituan() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('https://sz.meituan.com/jiankangliren/c75/pn1/')

    const aHandle = await page.evaluateHandle(() => document.body)
    const html = await page.evaluateHandle(body => body.innerHTML, aHandle)
    await aHandle.dispose()

    const $ = cheerio.load(await html.jsonValue())
    let txt = $('#react').next('script').html().replace('window.AppData = ', '').trim()
    txt = txt.substr(0, txt.length - 1)
    console.log(JSON.parse(txt))
    // console.log(eval(`(${txt})`))
    await browser.close()
  },
  async liren() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('https://apimobile.meituan.com/group/v4/poi/pcsearch/30?uuid=ef24c24a8ce0466dab62.1551765741.1.0.0&userid=-1&limit=1000&offset=0&cateId=22&areaId=-1')

    let aHandle = await page.evaluateHandle(() => document.body)
    let html = await page.evaluateHandle(body => body.innerHTML, aHandle)
    await aHandle.dispose()

    let $ = cheerio.load(await html.jsonValue())
    html = null
    let res = JSON.parse($('body pre').text())
    let ids = res.data.searchResult.map(s => s.id)
    let list = []
    do {
      await page.waitFor(1000)
      await page.goto(`https://www.meituan.com/jiankangliren/${ids.splice(1, 0)}/`)

      aHandle = await page.evaluateHandle(() => document.body)
      html = await page.evaluateHandle(body => body.innerHTML, aHandle)
      aHandle.dispose()

      $ = cheerio.load(await html.jsonValue())
      html = null

      let txt = $('#react').next('script').html().replace('window.AppData = ', '').trim()
      txt = txt.substr(0, txt.length - 1)
      let data = JSON.parse(txt)
      txt = null

      let landline = []
      let phone_number = []
      let phone = data.poiInfo.phone
      phone = phone.split('\u002F')
      phone.forEach(p => {
        if (/^1[3|4|5|6|7|8|9]\d{9}$/.test(p)) {
          phone_number.push(p)
        }
        else {
          landline.push(p)
        }
      })

      list.push({
        name: data.poiInfo.name,
        address: data.poiInfo.address,
        landline: landline.join(','),
        phone_number: phone_number.join(','),
        source: '美团'
      })

      for (let i = 0; i < data.nearPoiList.length; i++) {
        const nearPoiList = data.nearPoiList[i]
        landline = []
        phone_number = []
        phone = nearPoiList.phone
        phone = phone.split('\u002F')
        phone.forEach(p => {
          if (/^1[3|4|5|6|7|8|9]\d{9}$/.test(p)) {
            phone_number.push(p)
          }
          else {
            landline.push(p)
          }
        })
        list.push({
          name: nearPoiList.name,
          address: nearPoiList.address,
          landline: landline.join(','),
          phone_number: phone_number.join(','),
          source: '美团'
        })

      }
      ids = []
    } while (ids.length)

    console.log(list)
    await browser.close()
  }
}