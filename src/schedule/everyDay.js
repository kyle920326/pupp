/*
 * @Author: Kyle-peng
 * @Date: 2018-08-20 13:57:14
 * @Last Modified by: Kyle-peng
 * @Last Modified time: 2018-11-28 19:14:05
 */
const schedule = require('node-schedule')
const URL = require('../../config/j')
const run = require('./../service/m')
const Rule = new schedule.RecurrenceRule()
Rule.second = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55]


schedule.scheduleJob(Rule, async function () {
  site({
    pageArr: URL(),
    isMobile: 1
  })
})

async function site(...params) {
  await run(params[0].pageArr, params[0].isMobile).catch(e => {
    console.log(e)
  })
  console.log('end')
}