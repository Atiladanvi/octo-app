<template>
  <div
    :class="centerFixed"
    class="text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
        alt="sad"
      >
    </p>
    <h4 class="text-h4 q-pa-none q-ma-none"><strong>(401)</strong></h4>
    <h6 class="text-h6 q-ma-none">{{ title ? title : 'Vocẽ não tem permissão para acessar o recurso!' }}</h6>
    <p class="text-faded">{{ message ? message : 'Página ou recurso bloqueado !!' }}</p>
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
  name: 'Error401',
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
