const Mock = require('mockjs')

/**
 * Mock的请求不会真正发送，在Network面板看不到，输出日志以便调试使用
 */
const loadJSON = (options, file) => {
  const json = require('./json/' + file)
  console.debug(`请求：${options.type} ${options.url}：`, options)
  console.debug('结果：', json)
  return json
}

Mock.mock('/products', 'get', o => loadJSON(o, 'products.json'))
Mock.mock('/advertisements', 'get', o => loadJSON(o, 'advertisements.json'))
Mock.mock(/\/product\/.*/, 'get', o => {
  let json = loadJSON(o, 'products.json')
  let id = /\/product\/(.*)/.exec(o.url)[1]
  return json.find(book => id === book.id.toString())
})
