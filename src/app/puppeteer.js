// app/puppeteer.js

import puppeteer from 'puppeteer'

export default {
  async run() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('http://nodejs.cn/api/')

    await page.screenshot({ path: 'screenshot.png' })

    // await page.pdf({ path: 'nodejs.pdf', format: 'A4' })

    const data = await page.$$eval('#apicontent ul li', $li => {
      return $li.map(v => {
        return v.innerText.replace(/\s/g, '')
      })
    })
    console.log(data)
    await browser.close()
  }
}