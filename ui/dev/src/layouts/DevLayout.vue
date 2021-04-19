<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          color="white"
          :icon="leftDrawerOpen ? 'close' : 'menu'"
        >
        </q-btn>
        <q-toolbar-title>
          OctoApp
        </q-toolbar-title>
        <q-btn
          round
          dense
          flat
          color="white"
          icon="home"
          to="/"
          target="_blank"
        >
          <q-tooltip>
            Home
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      show-if-above
      bordered
      :breakpoint="600"
      :width="230"
    >
      <o-sidebar></o-sidebar>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="sm-hide xs-hide q-footer-octo-app"  height-hint="61.59">
      <q-toolbar>
        <div class="absolute-center">Copyright © {{ new Date().getFullYear() }} | Octo v{{ version }} | Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-footer>
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
