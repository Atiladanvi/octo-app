<template>
  <div>
    <q-dialog
      ref="dialogDelete"
      @hide="onDialogHide"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card :dark="darkMode" :class="darkMode ? '' : 'bg-red-10'" class="text-white">
        <q-card-section class="text-center">
          <div class="text-h6 q-mt-md"> Excluir: {{ object.nome }} ?</div>
        </q-card-section>

        <q-card-actions align="right" :class="darkMode ? '' : 'bg-red-10'" class="text-teal">
          <q-btn flat label="CANCELAR"  @click="onCancelClick"  color="white"/>
          <q-btn flat  @click="onOKClick" label="CONFIRMAR" color="white" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import hasDarkMode from '../mixins/hasDarkMode'

export default {
  mixins: [ hasDarkMode ],
  props: {
    object: {
      default: function () {
        return {

        }
      }
    }
  },
  methods: {
    show () {
      this.$refs.dialogDelete.show()
    },
    hide () {
      this.$refs.dialogDelete.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
