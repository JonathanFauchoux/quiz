import config from './_config'

export default (service, params) => {
  return config().post(service, params).catch(error => {
    throw new Error(`Api Service POST ${service} Failed: ${error}`)
  })
}
