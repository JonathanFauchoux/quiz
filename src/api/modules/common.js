import { fetchGetService } from '@helpers/api'

const mode = process.env.NODE_ENV

export default {
  getCommonContent () {
    const service = (mode === 'development') ? 'common.json' : 'common'
    return new Promise((resolve, reject) => {
      fetchGetService(service).then((response) => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
