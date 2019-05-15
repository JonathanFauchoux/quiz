import config from './_config'

export default (service, params) => {
  return config().get(service, params).catch(error => {
    throw new Error(`Api Service GET ${service} Failed: ${error}`)
  })
}
