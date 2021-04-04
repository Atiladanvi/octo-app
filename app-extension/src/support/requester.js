import Vue from 'vue'
import { Dialog } from 'quasar'
import objectToFormData from './formData'

const requester = function (method, route, dataQuery) {
  method = method.toLowerCase()

  if (method !== 'get' && method !== 'delete' && method !== 'put') {
    dataQuery = objectToFormData(dataQuery)
  }

  if (method === 'get') {
    dataQuery = { params: dataQuery }
  }

  return new Promise((resolve, reject) => {
    Vue.prototype.$http[method](route, dataQuery)
      .then(
        response => {
          response.body = response.data
          delete response.data
          resolve(response)
        }
      )
      .catch(
        error => {
          if (error.response.status !== 422) {
            Dialog.create({
              title: error.message,
              status: error.response.status,
              message: error.response.message || error.response.data.message
            })
          }
          reject(error)
        }
      )
  })
}

export default requester