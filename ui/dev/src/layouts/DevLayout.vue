<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="q-header-octo-app" height-hint="61.59">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          color="white"
          :icon="leftDrawerOpen ? 'close' : 'menu'"
        />
        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>
        <o-drop-down-language></o-drop-down-language>
        <q-btn
          round
          dense
          flat
          :icon="$q.dark.mode ? 'brightness_low' : 'brightness_high'"
          borderless
          @click="toggleDarkMode()"
        />
        <q-btn
          round
          dense
          flat
          icon="home"
          to="/"
        />
        <q-btn
          round
          dense
          flat
          icon="fab fa-github"
          type="a"
          href="https://github.com/a2insights/octo-app"
          target="_blank"
        />
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
import OSidebar from 'quasar-ui-octo-app/src/components/OSidebar/OSidebar'
import { version } from '../../package.json'
import ODropDownLanguage from 'quasar-ui-octo-app/src/components/DropDowns/ODropDownLanguage'

export default {
  name: 'DevLayout',
  components: {
    OSidebar,
    ODropDownLanguage
  },
  data () {
    return {
      version: version,
      leftDrawerOpen: false,
      miniState: true,
      appName: process.env.VUE_APP_NAME
    }
  },
  computed: {
    darkMode: {
      get () {
        return this.$store.state.settings.darkMode
      },
      set (val) {
        this.$store.commit('settings/setDarkMode', val)
      }
    }
  },
  methods: {
    toggleDarkMode: function () {
      this.darkMode = !this.darkMode
      this.$q.dark.set(this.darkMode)
    }
  }
}
</script>
