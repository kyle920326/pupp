const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 8']
const _platform = process.platform
const _conf = _platform === 'darwin1' ? {
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

        const _url = url[i]
        promises.push(browser.newPage().then(async page => {
          if (isMobile) {
            await page.emulate(iPhone)
          } else {
            await page.setViewport({
              width: 1920,
              height: 1080
            })
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36')
          }

          await page.goto(_url).catch(async error => {
            // await page.close()
            console.log(error)
          })
          await page.waitFor(2000)
          const _click = await page.evaluate(() => {
              if(document.querySelector('.vote-btn[data-id="34"]')){
                document.querySelector('.vote-btn[data-id="34"]').click();
                return 1
              }
              return 0
          })
          console.log(_click)
          await page.close()
        }))

        await Promise.all(promises).catch(e => {
          console.log('---catch start---')
          console.log(e)
          console.log('---catch start---')
        })
        await browser.close()
      })
    }
    resolve(_arr)
  })
}
