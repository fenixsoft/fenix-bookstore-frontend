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

const success = options => {
  const repo = {code: 0}
  console.debug(`REQUEST：${options.type} ${options.url}：`, options)
  console.debug('RESPONSE：', repo)
  return repo
}

const failure = options => {
  const repo = {code: 1, message: '远程调用已正确发出，但静态Mock运行模式并没有服务端支持，此操作未产生效果'}
  console.debug(`REQUEST：${options.type} ${options.url}：`, options)
  console.debug('RESPONSE：', repo)
  return repo
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
MockJS.mock(/\/restful\/accounts\/.*/, 'get', o => loadJSON(o, 'accounts.json'))
MockJS.mock('/restful/accounts', 'post', o => success(o))
MockJS.mock('/restful/accounts', 'put', o => success(o))
MockJS.mock('/restful/settlements', 'post', o => loadJSON(o, 'settlements.json'))
MockJS.mock(/\/restful\/pay\/.*/, 'patch', o => failure(o))
MockJS.mock('/restful/products', 'post', o => failure(o))
MockJS.mock('/restful/products', 'put', o => failure(o))
MockJS.mock(/\/restful\/pay\/stockpile\/.*/, 'get', o => loadJSON(o, 'stockpile.json'))
MockJS.mock(/\/restful\/pay\/stockpile\/.*/, 'patch', o => failure(o))
MockJS.mock(/\/restful\/products\/.*/, 'delete', o => failure(o))
