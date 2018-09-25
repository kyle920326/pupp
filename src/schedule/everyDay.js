/*
 * @Author: Kyle-peng
 * @Date: 2018-08-20 13:57:14
 * @Last Modified by: Kyle-peng
 * @Last Modified time: 2018-09-25 14:05:28
 */
const schedule = require('node-schedule')
const URL = require('../../config/j')
const run = require('./../service/p')
const Rule = new schedule.RecurrenceRule()
Rule.second = [10, 20, 30, 40, 50, 55]


schedule.scheduleJob(Rule, async function () {
  site({
    pageArr: URL(),
    isMobile: 1
  })
})

async function site (...params) {
  await run(params[0].pageArr, params[0].isMobile).catch(e => {
    console.log(e)
  })
  console.log('end')
}
