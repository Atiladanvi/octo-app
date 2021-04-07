import Vue from 'vue'
import { Dialog } from 'quasar'
import objectToFormData from './formData'

const requester = function (method, route, formData = {}) {
  method = method.toLowerCase()

  if (method === 'put') {
    formData._method = 'put'
    method = 'post'
  }

  if (method !== 'get' && method !== 'delete') {
    formData = objectToFormData(formData)
  }

  if (method === 'get') {
    formData = { params: formData }
  }

  return new Promise((resolve, reject) => {
    Vue.prototype.$http[method](route, formData)
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
