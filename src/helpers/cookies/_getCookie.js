import getAllCookies from './_getAllCookies'

const getCookie = name => {
  const cookies = getAllCookies()
  const cookie = (Object.prototype.hasOwnProperty.call(cookies, name)) ? cookies[name] : null
  return cookie
}

export default getCookie
