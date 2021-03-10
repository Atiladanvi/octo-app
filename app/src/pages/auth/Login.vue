<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
  <q-page-container>
    <q-page class="flex flex-center">
      <q-card
        square
        style="width: 350px; padding:40px; padding-bottom: 60px"
      >
        <q-card-section>
          <div class="text-h4">
            Login
          </div>
        </q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="onLogin()"
        >
          <q-card-section>
            <q-input
              id="email"
              v-model.trim="data.body.email"
              type="email"
              label="E-mail"
              :error="validCredentials"
              :rules="[val => !!val || 'O campo email é obrigatório']"
              lazy-rules
              autofocus
              value=""/>
            <q-input
              id="password"
              v-model="data.body.password"
              type="password"
              :rules="[val => !!val || 'O campo senha é obrigatório']"
              :error="validCredentials"
              label="Senha"
              lazy-rules
              value="">
              <template v-slot:error>
                Email ou senha incorretos !
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions>
            <q-btn
              label="Login"
              class="full-width"
              color="primary"
              :loading="loading"
              type="submit"
            />
          </q-card-actions>
        </q-form>
        <div class="row content-around q-pa-sm">
          <div class="col">
            <router-link to="/recuperar-senha">
              <a>Esqueceu a senha ?</a>
            </router-link>
          </div>
          <div class="col text-right">
            <router-link to="/register">
              <a>Cadastre-se</a>
            </router-link>
          </div>
        </div>
      </q-card>
    </q-page>
  </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      validCredentials: false,
      lang: {
        auth: {}
      },
      data: {
        body: {
          email: '',
          password: ''
        },
        rememberMe: false
      },
      loading: false
    }
  },
  methods: {
    onLogin () {
      this.loading = true
      this.$store.dispatch('auth/login', this.data.body)
        .then(() => {
          this.loading = false
          window.location.replace('/')
        }).catch(error => {
          this.loading = false
          if (error.response.status === 401) {
            this.validCredentials = true
          }
        })
    }
  }
}
</script>
