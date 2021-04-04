<template>
  <div
    :class="centerFixed"
    class="text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <h4 class="text-h4 q-pa-none q-ma-none"><strong>(404)</strong></h4>
    <h6 class="text-h6 q-ma-none">{{ title ? title : 'Servidor respondeu mal a solicitação!' }}</h6>
    <p class="text-faded">{{ message ? message : 'Página ou recurso não encontrado !!' }}</p>
    <q-btn
      color="secondary"
      style="width:200px;"
      class="vertical-middle"
      @click="action()"
      label="Fechar"
    />
  </div>
</template>

<script>
import Router from '../router'
export default {
  name: 'Error404',
  props: {
    centerFixed: {
      type: String,
      default: 'fixed-center'
    },
    message: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    action: {
      type: Function,
      default: function () {
        Router().go(-1)
      }
    }
  }
}
</script>
