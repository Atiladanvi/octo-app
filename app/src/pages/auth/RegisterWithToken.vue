<script>
import Register from './Register'
export default {
  name: 'RegisterWithToken',
  extends: Register,
  data () {
    return {
      schema: {
        nome: {
          error: false,
          invalid: ''
        },
        cpf: {
          error: false,
          invalid: ''
        },
        name: {
          error: false,
          invalid: ''
        },
        email: {
          error: false,
          invalid: ''
        },
        password: {
          error: false,
          invalid: ''
        }
      },
      data: {
        body: {
          nome: '',
          cpf: '',
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          token: ''
        }
      },
      loading: false
    }
  },
  created () {
    this.data.body.token = this.$route.params.token
    this.schema.email.disabled = true
    this.$store.dispatch('auth/invite', this.data.body.token)
      .then((response) => {
        this.data.body.email = response.body.data.email
      }).catch(error => {
        this.alertModal = true
        this.messageModal = error.response.data.message
      })
  },
  methods: {
    onRegister () {
      this.loading = true
      this.$store.dispatch('auth/register', this.data.body)
        .then(() => {
          this.loading = false
          window.location.replace('/')
          this.displayNotify('Você foi registrado com sucesso !', { type: 'positive', timeout: 5000 })
        }).catch(error => {
          this.loading = false
          this.displayErrors(error)
        })
    }
  }
}
</script>
