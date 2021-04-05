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
              v-model.trim="model.email"
              type="email"
              label="E-mail"
              :error="schema.email.error"
              autofocus
              value=""/>
            <q-input
              id="password"
              v-model="model.password"
              type="password"
              autocomplete="on"
              :error="schema.password.error"
              label="Senha"
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
              :disable="loading"
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
import { Platform } from 'quasar'

export default {
  name: 'Login',
  data () {
    return {
      model: {
        email: '',
        password: '',
        device_name: Platform.userAgent
      },
      schema: {
        email: {
          disabled: false,
          error: false
        },
        password: {
          disabled: false,
          error: false
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
          this.$router.push('/painel')
        }).finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
