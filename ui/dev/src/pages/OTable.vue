<template>
  <q-page padding>
    <OTable
      v-bind="components.OTableAppDevExampleTable"
    />
  </q-page>
</template>

<script>
  export default {
    name: 'OTableAppDevExampleTable',
    props: {
      components: {
        default: function () {
          return {
            OTableAppDevExampleTable: {}
          }
        }
      }
    }
  }
</script>
