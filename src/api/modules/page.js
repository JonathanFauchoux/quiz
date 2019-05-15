import { fetchGetService } from '@helpers/api'

const mode = process.env.NODE_ENV

export default {
  getPageContent (name) {
    const service = (mode === 'development') ? `${name}.json` : `${name}`
    return new Promise((resolve, reject) => {
      fetchGetService(service).then((response) => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
