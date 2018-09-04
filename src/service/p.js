const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 8']
const _platform = process.platform
const _conf = _platform === 'darwin' ? {
  headless: false
} : {
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}

module.exports = async function run (url, isMobile) {
  return new Promise(async (resolve, reject) => {
    const _arr = []
    for (let i = 0; i < url.length; i++) {
      await puppeteer.launch(_conf).then(async browser => {
        const promises = []
        const page = await browser.newPage()
        promises.push(page)
        const _url = url[i]
        const _list = new Map()
        let _pagesInfo = {}
        let _resNum = 0
        if (isMobile) {
          await page.emulate(iPhone)
        } else {
          await page.setViewport({
            width: 1920,
            height: 1080
          })
          await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36')
        }

        let pageRes = await page.goto(_url).catch(async error => {
          await page.close()
          reject(error)
        })
        await page.waitFor(1500)

        await page.close()
        await Promise.all(promises).catch(e => {
          console.log('---catch start---')
          reject(e)
          console.log('---catch start---')
        })
        await browser.close()
      })
    }
    resolve(_arr)
  })
}
