<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column">
          <h3 class="text-h3 text-center text-blue-6 q-my-lg text-weight-thin">{{ appName }}</h3>
          <q-card
            class="q-pa-sm q-ma-sm"
            style="max-width: 520px"
          >
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
                >
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
                  label="Password"
                >
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
                <a target="_blank" href="https://octo.a2insights.com.br/forgot-password">
                  <a>Forgot your password?</a>
                </a>
              </div>
              <div class="col text-right">
                <a target="_blank" href="https://octo.a2insights.com.br/register">
                  <a>No have registered account?</a>
                </a>
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
          error: false,
          invalid: null
        },
        password: {
          error: false,
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
          this.errors = errors.response.data.errors
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
