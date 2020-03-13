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
MockJS.mock(/\/restful\/products\/.*/, 'get', o => {
  let json = loadJSON(o, 'products.json')
  let id = /\/restful\/products\/(.*)/.exec(o.url)[1]
  return json.find(book => id === book.id.toString())
})
MockJS.mock(/\/oauth\/token.*/, 'get', o => loadJSON(o, 'authorization.json'))
MockJS.mock(/\/restful\/account\/.*/, 'get', o => loadJSON(o, 'account.json'))
MockJS.mock('/restful/account', 'post', {code: 0})
MockJS.mock('/restful/account', 'put', {code: 0})
MockJS.mock('/restful/settlement', 'post', o => loadJSON(o, 'settlement.json'))
MockJS.mock(/\/restful\/pay\/.*/, 'patch', {code: 0})
