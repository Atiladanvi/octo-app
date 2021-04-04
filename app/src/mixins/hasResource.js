import DeleteDialog from '../components/DeleteDialog'
import DeleteLoadingModal from '../components/DeleteLoadingDialog'
import requester from '../support/requester'

export default {
  methods: {
    show: function (object, action) {
      this.$router.push(action.route)
    },
    edit: function (object, action) {
      this.$router.push(action.route)
    },
    download: function (object, action) {
      requester('GET', this.$octo_route(action.route.name, action.route.params))
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', object.nome)
          document.body.appendChild(link)
          link.click()
        })
    },
    destroy: function (object, action) {
      return new Promise((resolve, reject) => {
        this.$q.dialog({
          component: DeleteDialog,
          parent: this,
          object: object
        }).onOk(() => {
          const that = this
          that.loadingTable = true
          let loading = this.$q.dialog({
            component: DeleteLoadingModal,
            parent: that,
            object: object
          })
          setTimeout(function () {
            requester('DELETE', that.$octo_route(action.route.name, action.route.params))
              .then((response) => {
                that.$q.notify({
                  color: 'green',
                  icon: 'check',
                  message: response.body.message,
                  position: 'bottom-right',
                  multiLine: 'multiLine',
                  actions: '',
                  timeout: 5000
                })
                loading.hide()
                resolve(response)
              }).catch((error) => {
                that.$q.notify({
                  color: 'red',
                  actions: [{ icon: 'close', color: 'white' }],
                  icon: 'error',
                  message: error.response.data.message,
                  position: 'bottom-right',
                  multiLine: 'multiLine',
                  timeout: 7000
                })
                loading.hide()
                reject(error)
              })
          }, 1000)
        }).onCancel(() => {

        }).onDismiss(() => {

        })
      })
    }
  }
}
