<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column">
          <h4 class="text-h4 text-center text-primary q-my-md">{{ appName }}</h4>
          <q-card
            class="q-pa-sm q-ma-sm"
            style="min-width: 320px"
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
                  required
                  :label="$t('e_mail')"
                  :error="errors.email.length > 0"
                  autofocus
                >
                  <template v-slot:error>
                    {{ errors.email.toString() }}
                  </template>
                </q-input>
                <q-input
                  id="password"
                  v-model="model.password"
                  required
                  type="password"
                  :label="$t('password')"
                  autocomplete="on"
                  :error="errors.password.length > 0"
                >
                  <template v-slot:error>
                    {{ errors.password.toString() }}
                  </template>
                </q-input>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  :label="$t('login')"
                  color="primary"
                  class="full-width"
                  type="submit"
                  :disable="loading"
                />
              </q-card-actions>
            </q-form>
            <div class="row content-around q-pa-sm">
              <div class="col">
                <a target="_blank" href="https://octo.a2insights.com.br/forgot-password">
                  <a>{{ $t('forgot_password') }}</a>
                </a>
              </div>
              <div class="col text-right">
                <a target="_blank" href="https://octo.a2insights.com.br/register">
                  <a>{{ $t('create_account') }}</a>
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
      loading: false,
      appName: process.env.VUE_APP_NAME,
      model: {
        email: '',
        password: '',
        device_name: Platform.userAgent
      },
      errors: {
        email: [],
        password: []
      }
    }
  },
  computed: {
    darkMode: {
      get () {
        return this.$store.state.settings.darkMode
      },
      set (val) {
        return this.$store.commit('settings/setDarkMode', val)
      }
    }
  },
  mounted () {
    this.$q.dark.set(this.darkMode)
  },
  methods: {
    onLogin () {
      this.loading = true
      this.$store.dispatch('auth/login', this.model)
        .then(() => {
          this.$router.push('/')
        })
        .catch((response) => {
          this.errors = response.body.errors
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
