<template>
  <div>
    <q-dialog
      ref="dialogDelete"
      @hide="onDialogHide"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-red-10 text-white">
        <q-card-section class="text-center">
          <div class="text-h6 q-mt-md"> Excluir: {{ object.nome }} ?</div>
        </q-card-section>

        <q-card-actions align="right" class="'bg-red-10 text-teal">
          <q-btn flat label="CANCELAR"  @click="onCancelClick"  color="white"/>
          <q-btn flat @click="onOKClick" label="CONFIRMAR" color="white" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { QBtn, QCard, QCardSection, QDialog, QCardActions } from 'quasar'

export default {
  name: 'DeleteDialog',
  components: { QBtn, QCard, QCardSection, QDialog, QCardActions },
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
