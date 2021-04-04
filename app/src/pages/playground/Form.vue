<template>
  <div>
    <div class="row">
      <q-input
        class="col-lg-5 col-md-5 col-sm-12 col-xs-12 q-pa-md"
        v-model="auth.user.name"
        :error="fields.nome.error"
        label="Nome"
        type="name"
      >
        <template v-slot:error>
          {{ fields.nome.invalid }}
        </template>
      </q-input>
    </div>
    <q-card-actions align="right" class="text-teal q-pa-md">
      <q-btn :disable="loading" outline color="red" to="/organizacoes" label="CANCELAR"/>
      <q-btn :loading="loading" outline color="green" label="SALVAR" type="submit"/>
    </q-card-actions>
  </div>
</template>

<script>
export default {
  name: 'ContatoForm',
  props: {
    auth: {
      type: Object,
      default () {
        return {
          user: null
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      model: {},
      fields: {
        nome: {
          name: 'q-input',
          class: 'col-lg-6 col-sm-12 col-xs-12',
          disabled: false,
          error: null,
          invalid: null
        }
      }
    }
  }
}
</script>
