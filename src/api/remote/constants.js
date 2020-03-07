export default {
  // 远程服务约定成功操作代码
  REMOTE_OPERATION_SUCCESS: 0,

  // HTTP 请求超时时间（毫秒）
  REMOTE_TIMEOUT: 10000,
  // 资源服务请求前缀
  REMOTE_BASE_URL: '/restful',

  // 认证服务请求前缀
  AUTH_BASE_URL: '/oauth',
  // 验证的Token类型，正常来说应该是取服务端返回的，不过这个不会变，就写在这里了
  AUTH_TOKEN_TYPE: 'bearer ',
  // 授权类型：OAuth2的密码模式
  AUTH_GRANT_TYPE: 'password',
  // 授权类型：OAuth2的令牌刷新
  AUTH_REFRESH_TYPE: 'refresh_token',
  // Client ID
  AUTH_CLIENT_ID: 'bookstore_frontend',
  // Client Secret
  AUTH_CLIENT_SECRET: 'bookstore_secret'
}
