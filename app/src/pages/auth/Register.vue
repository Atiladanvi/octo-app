<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
  <q-page-container>
    <q-dialog v-model="alertModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="report" color="red" text-color="white" />
          <span class="q-ml-sm">{{ messageModal }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Registrar" color="primary" @click="toRegister" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page class="flex flex-center">
      <q-card
        square
        class="q-mt-lg"
        style="width: 350px; padding:40px; padding-bottom: 10px"
      >
        <q-card-section>
          <div class="text-h4">
            Cadastre-se
          </div>
        </q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="onRegister()"
        >
          <q-card-section>
            <q-input
              id="user-name"
              v-model.trim="data.body.name"
             >
              <template v-slot:error>
                {{ schema.name.invalid }}
              </template>
            </q-input>
            <q-input
              id="email"
              v-model.trim="data.body.email"
            >
              <template v-slot:error>
                {{ schema.email.invalid }}
              </template>
            </q-input>
            <q-input
              id="password"
            >
              <template v-slot:error>
                {{ schema.password.invalid }}
              </template>
            </q-input>
            <q-input
              id="confirmPassword"
              v-model="data.body.password_confirmation"
            >
              <template v-slot:error>
                {{ schema.password.invalid }}
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions>
            <q-btn
              class="full-width q-mb-sm"
              color="primary"
              :loading="loading"
              type="submit"
            />
            <q-btn
              class="full-width"
              color="red"
              :loading="loading"
              to="/login"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-page>
  </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      alertModal: false,
      messageModal: '',
      schema: {
        name: {
          error: false,
          invalid: ''
        },
        email: {
          error: false,
          disabled: false,
          invalid: ''
        },
        password: {
          error: false,
          invalid: ''
        }
      },
      data: {
        body: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      },
      loading: false
    }
  },
  methods: {
    toRegister () {
      this.$router.push('/register')
      this.alertModal = false
    },
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
