// app/puppeteer.js

import puppeteer from 'puppeteer'
import devices from 'puppeteer/DeviceDescriptors'
import cheerio from 'cheerio'

export default {
  async run() {
    await this.nodeJS()
    await this.dingTalk()
    await this.request()
  },
  async nodeJS() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.tracing.start({ path: 'trace.json' })
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

    await page.screenshot({ path: 'dingtalk.png', fullPage: true })

    // await page.exposeFunction('$', (html) => cheerio.load(html))

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
      for (let j = 0; j < $tabpane.find('.section-list-item').length; j++) {
        let $item = $tabpane.find('.section-list-item').eq(j)
        let _obj = {
          orgName: $item.find('.head-name').text().replace(/\s/g, ''),
          logoUrl: $item.find('img.dd-avatar-square').attr('src'),
          sesameCredit: $item.find('.medal').eq(2).text().replace(/\s/g, '').replace(/[^0-9]/ig,'')
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

    // console.log(data)

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
    await page.screenshot({ path: 'news.png', fullPage: true })
    console.log(images)
    await browser.close()
  }
}