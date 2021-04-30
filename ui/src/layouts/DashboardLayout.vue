<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="q-header-octo-app" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
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
        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <o-drop-down-language></o-drop-down-language>
          <q-btn
            round dense flat
            borderless
            @click="toggleDarkMode()"
          >
            <q-icon :name="$q.dark.mode ? 'brightness_low' : 'brightness_high'" />
          </q-btn>
          <q-btn dense flat>
            <div class="row items-center no-wrap">
              <q-icon name="add" size="20px" />
              <q-icon name="arrow_drop_down" size="16px" style="margin-left: -2px" />
            </div>
            <q-menu auto-close>
              <q-list dense style="min-width: 150px">
                <q-item clickable class="GL__menu-link">
                  <q-item-section>----</q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn dense flat no-wrap>
            <q-avatar text-color="black" size="24px" color="white">{{ user ? user.initials : '' }}</q-avatar>
          <q-icon name="arrow_drop_down" size="16px" />
          <q-menu auto-close>
            <q-list dense>
              <q-item class="GL__menu-link-signed-in">
                <q-item-section>
                  <strong>{{ user ? user.name : '' }}</strong>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-separator />
              <q-item disable clickable class="GL__menu-link">
                <q-item-section> {{ $t('profile') }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item disable clickable class="GL__menu-link">
                <q-item-section>{{ $t('help') }}</q-item-section>
              </q-item>
              <q-item disable clickable class="GL__menu-link">
                <q-item-section>{{ $t('settings') }}</q-item-section>
              </q-item>
              <q-item  @click="logout()" clickable class="GL__menu-link">
                <q-item-section>{{ $t('logout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      bordered
      :width="250"
      :breakpoint="600"
    >
      <o-sidebar></o-sidebar>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer class="sm-hide xs-hide q-footer-octo-app"  height-hint="61.59">
      <q-toolbar>
        <div class="absolute-center">Copyright © {{ new Date().getFullYear() }} | OctoApp v{{ version }}</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import OSidebar from 'quasar-ui-octo-app/src/components/OSidebar/OSidebar'
import { requester } from 'quasar-app-extension-octo-app/src/support'
import { version } from '../../package.json'
import ODropDownLanguage from 'quasar-ui-octo-app/src/components/DropDowns/ODropDownLanguage'

export default {
  name: 'AppDashboardLayout',
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
    user: {
      get () {
        return this.$store.state.auth.user
      }
    },
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
    },
    logout: function () {
      this.$q.loading.show()
      this.$store.dispatch('auth/logout')
        .finally(() => {
          this.timer = setTimeout(() => {
            this.$q.loading.hide()
            this.timer = void 0
            this.$router.push('/login')
          }, 1000)
        })
    }
  }
}
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
  .default-type
    visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
