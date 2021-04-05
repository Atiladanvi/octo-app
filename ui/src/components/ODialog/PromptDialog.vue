<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      ref="dialogPrompt"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        class="text-white"
        :class="status !== 404 ? 'bg-red' : 'bg-primary'"
      >
        <q-bar>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Feche</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <component :action="hide" :title="title" :message="message" :center-fixed="maximizedToggle ? 'fixed-center' : ''" :is="`error${status}`"></component>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import Error400 from '../../../../app/src/pages/Error400'
import Error404 from '../../../../app/src/pages/Error404'
import Error500 from '../../../../app/src/pages/Error500'
import Error406 from '../../../../app/src/pages/Error406'
import Error401 from '../../../../app/src/pages/Error401'

export default {
  components: { Error401, Error406, Error500, Error404, Error400 },
  props: {
    message: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    status: {
      default: 500,
      type: Number
    }
  },
  data () {
    return {
      dialog: true,
      maximizedToggle: true
    }
  },
  methods: {
    show () {
      this.$refs.dialogPrompt.show()
    },
    hide () {
      this.$refs.dialogPrompt.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
