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
    <h4 class="text-h4 q-pa-none q-ma-none"><strong>(400)</strong></h4>
    <h6 class="text-h6 q-ma-none">{{ title ? title : 'Ocorreu um erro durante a solicitação!' }}</h6>
    <p class="text-faded">{{ message ? message : 'Tente novamente !!' }}</p>
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
  name: 'Error400',
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
