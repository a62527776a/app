import axios from 'axios'

export let jsonCore = (url, method = 'GET', body = {}) => {
  return new Promise((resolve, reject) => {
    axios.request({
      baseURL: 'http://192.168.10.57:7001',
      url: url,
      method: method,
      data: body
    }).then((res) => {
      resolve(res.data)
    }).catch((e, config) => {
      reject(e)
    })
  })
}
