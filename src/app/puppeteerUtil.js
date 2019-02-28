// app/puppeteerUtil.js

import puppeteer from 'puppeteer'
import devices from 'puppeteer/DeviceDescriptors'
import cheerio from 'cheerio'

export default class PuppeteerUtil {
  constructor(page) {
    this.page = page
  }
  /**
   * github登录
   * @param {String} account   账号
   * @param {String} password  密码
   */
  async loginGithub(account, password) {
    try {

      await this.page.goto('https://github.com/login')

      await this.page.type('#login_field', account, { delay: 100 })
      await this.page.type('#password', password, { delay: 100 })

      let loginBtn = await this.page.$('[name=commit]')
      await loginBtn.click({ delay: 300 })

      await this.page.waitFor(600)

      return Promise.resolve(1)
    } catch (error) {
      return Promise.resolve(0)
    }
  }
  /**
   * 微博登录
   * @param {String} account   账号
   * @param {String} password  密码
   */
  async loginWeibo(account, password) {
    try {
      await this.page.emulate(devices['iPhone 6'])
      await this.page.goto('https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=https%3A%2F%2Fm.weibo.cn%2F')

      await this.page.type('#loginName', account, { delay: 100 })
      await this.page.type('#loginPassword', password, { delay: 100 })

      let loginBtn = await this.page.$('#loginAction')
      await loginBtn.click({ delay: 300 })

      await this.page.waitFor(600)

      return Promise.resolve(1)
    } catch (error) {
      return Promise.resolve(0)
    }
  }
  /**
   * 页面是否加载完成
   */
  isLoadingFinished() {
    return this.page.evaluate(() => {
      // document.readyState: loading / 加载；interactive / 互动；complete / 完成
      return document.readyState === 'complete'
    })
  }
  /**
   * 页面源码
   * @param {String} url 网址
   */
  async html(url) {
    await this.page.goto(url)
    const aHandle = await this.page.evaluateHandle(() => document.body)
    const html = await this.page.evaluateHandle(body => body.innerHTML, aHandle)
    await aHandle.dispose()
    return await html.jsonValue()
  }
}