const getAllCookies = () => {
  const cookies = {}
  const pairs = document.cookie.split(';')

  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].split('=')
    cookies[pair[0].replace(/ /g, '')] = decodeURI(pair[1])
  }
  return cookies
}

export default getAllCookies
