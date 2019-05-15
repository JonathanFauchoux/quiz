import getCookie from './_getCookie'
import createCookie from './_createCookie'

const deleteCookie = name => {
  if (getCookie(name)) {
    createCookie(name, '', -1)
  }
}

export default deleteCookie
