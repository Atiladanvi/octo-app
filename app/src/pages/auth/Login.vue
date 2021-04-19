<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column">
          <h3 class="text-h3 text-center text-blue-6 q-my-lg text-weight-thin">{{ appName }}</h3>
          <q-card
            class="q-pa-md"
            style="width: 400px"
          >
            <q-card-section class="q-py-none">
              <div class="text-h5  text-weight-thin text-blue-5">
                Acesse a sua conta
              </div>
            </q-card-section>
            <q-form
              :disabled="loading"
              @submit="onLogin()"
            >
              <q-inner-loading :showing="loading">
                <q-spinner size="50px" color="primary" />
              </q-inner-loading>
              <q-card-section>
                <q-input
                  id="email"
                  v-model.trim="model.email"
                  type="email"
                  label="E-mail"
                  :error="errors.email.error"
                  autofocus
                  value="">
                  <template v-slot:error>
                    {{ errors.email.invalid }}
                  </template>
                </q-input>
                <q-input
                  id="password"
                  v-model="model.password"
                  type="password"
                  autocomplete="on"
                  :error="errors.password.error"
                  label="Senha"
                  value="">
                  <template v-slot:error>
                    {{ errors.password.invalid }}
                  </template>
                </q-input>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn :disable="loading" class="full-width bg-blue-6" color="primary" label="ENTRAR" type="submit"/>
              </q-card-actions>
            </q-form>
            <div class="row content-around q-pa-sm">
              <div class="col">
                <router-link to="/recuperar-senha">
                  <a>Esqueceu a senha?</a>
                </router-link>
              </div>
              <div class="col text-right">
                <router-link to="/registro">
                  <a>Não tem uma conta?</a>
                </router-link>
              </div>
            </div>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Platform } from 'quasar'

export default {
  name: 'Login',
  data () {
    return {
      appName: process.env.VUE_APP_NAME,
      model: {
        email: '',
        password: '',
        device_name: Platform.userAgent
      },
      errors: {
        email: {
          error: true,
          invalid: null
        },
        password: {
          error: true,
          invalid: null
        }
      },
      schema: {
        email: {
          disabled: false
        },
        password: {
          disabled: false
        }
      },
      loading: false
    }
  },
  methods: {
    onLogin () {
      this.loading = true
      this.$store.dispatch('auth/login', this.model)
        .then(() => {
          this.loading = false
          this.$router.push('/')
        })
        .catch((errors) => {
          console.log(errors.response.data.errors)
          this.errors = errors.response.data.errors
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
