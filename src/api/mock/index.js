const MockJS = require('mockjs')

/**
 * Mock的请求不会真正发送，在Network面板看不到，输出日志以便调试使用
 */
const loadJSON = (options, file) => {
  const json = require('./json/' + file)
  console.debug(`REQUEST：${options.type} ${options.url}：`, options)
  console.debug('RESPONSE：', json)
  return json
}

/**
 * 被Mock的各个请求
 */
MockJS.mock('/restful/products', 'get', o => loadJSON(o, 'products.json'))
MockJS.mock('/restful/advertisements', 'get', o => loadJSON(o, 'advertisements.json'))
MockJS.mock(/\/restful\/product\/.*/, 'get', o => {
  let json = loadJSON(o, 'products.json')
  let id = /\/restful\/product\/(.*)/.exec(o.url)[1]
  return json.find(book => id === book.id.toString())
})
MockJS.mock('/restful/auth', 'post', o => loadJSON(o, 'authorization.json'))
MockJS.mock(/\/restful\/account\/.*/, 'get', o => loadJSON(o, 'account.json'))
MockJS.mock('/restful/account', 'post', {code: 0})
MockJS.mock('/restful/account', 'put', {code: 0})
MockJS.mock('/restful/settlement', 'post', o => {
  let json = loadJSON(o, 'settlement.json')
  json.expires = new Date().getTime() + (1000 * 60 * 3)
  return json
})
