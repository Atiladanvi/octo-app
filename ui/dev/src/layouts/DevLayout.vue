<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          to="/"
          icon="home"
        />
        <q-toolbar-title>
          quasar-ui-octo-app v{{ version }}
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="600"
      :width="180"
    >
      <o-sidebar></o-sidebar>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from 'ui' // "ui" is aliased in quasar.conf.js
import OSidebar from 'quasar-ui-octo-app/src/components/OSidebar/OSidebar'

export default {
  name: 'DevLayout',
  components: {
    OSidebar
  },
  data () {
    return {
      leftDrawerOpen: false,
      miniState: true,
      version
    }
  }
}
</script>
