/*
 * @Author: Kyle-peng
 * @Date: 2018-08-20 13:57:14
 * @Last Modified by: Kyle-peng
 * @Last Modified time: 2018-09-04 19:49:23
 */
const schedule = require('node-schedule')
const URL = require('../../config/j')
const run = require('./../service/p')
const Rule = new schedule.RecurrenceRule()
Rule.hour = [8, 12, 19]
Rule.minute = 49


// schedule.scheduleJob(Rule, async function () {
  site({
    pageArr: URL(),
    isMobile: 1
  })
// })

async function site (...params) {
  let _str = ''
  let _catch = null
  let msg = await run(params[0].pageArr, params[0].isMobile).catch(e => {
    console.log(e)
    _catch = e
  })
}
