'use strict'
module.exports = {
  NODE_ENV: '"production"',
  // 传入了参数--mock的话，生产模式中也仍然采用Mock.JS
  MOCK: process.argv[2] === '--mock'
}
