import Vue from 'vue'

const requester = function (method, route, dataQuery) {
    method = method.toLowerCase()
    if (method !== 'post' && method !== 'put') {
        dataQuery = { params: dataQuery }
    }

    return new Promise((resolve, reject) => {
        return Vue.prototype.$http[method](route, dataQuery)
            .then( response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default requester
