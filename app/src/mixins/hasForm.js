import moment from 'moment'
import HasDarkMode from './hasDarkMode'

export default {
  mixins: [HasDarkMode],
  methods: {
    validateEmail: function (email) {
      // eslint-disable-next-line no-useless-escape
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    unformatDate (dateString) {
      if (!dateString) { return null }
      return moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD')
    },
    formatDate (dateString) {
      return moment(dateString, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    displayNotify (msg, options = {}) {
      options = {
        type: options.hasOwnProperty('type') ? options.type : 'positive',
        icon: options.hasOwnProperty('icon') ? options.icon : '',
        timeout: options.hasOwnProperty('timeout') ? options.timeout : 3000,
        position: options.hasOwnProperty('position') ? options.position : 'bottom'
      }

      switch (options.type) {
        case 'positive':
          options.icon = 'check'
          break
        case 'negative':
          options.icon = 'warning'
          break
      }

      if (this.darkMode) {
        options.type = 'dark'
      }

      this.$q.notify({
        position: options.position,
        icon: options.icon,
        type: options.type,
        timeout: options.timeout,
        message: msg,
        color: options.type,
        textColor: 'white'
      })
    },
    displayErrors (errs) {
      const errors = errs.response.data.errors
      this.displayNotify(errs.response.data.message, {
        type: 'negative'
      })
      if (errs.response.status === 422) {
        for (const key in this.schema) {
          if (this.schema.hasOwnProperty(key) && errors[key]) {
            this.schema[key].invalid = errors[key].toString()
            this.schema[key].error = true
          } else {
            this.schema[key].invalid = ''
            this.schema[key].error = null
          }
        }
      }
    },
    cleanErros () {
      for (const key in this.schema) {
        if (this.schema.hasOwnProperty(key)) {
          this.schema[key].error = null
          this.schema[key].invalid = ''
        }
      }
    }
  }
}
