<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="q-header-octo-app" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>
        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn
            round dense flat
            borderless
            @click="toggleDarkMode()"
          >
            <q-icon :name="$q.dark.mode ? 'brightness_low' : 'brightness_high'" />
          </q-btn>
          <q-btn round dense flat icon="notifications">
            <q-badge v-if="noReads.length > 0" color="red" floating>{{ noReads.length }}</q-badge>
            <q-menu>
              <q-list style="min-width: 150px">
                <span v-if="notifications.length > 0" class="text-h6 q-ml-md">{{ $t('notifications') }}</span>
                <h6 v-else class="text-center q-ml-sm q-mr-sm q-mt-sm q-mb-sm">{{ $t('empty') }}</h6>
                <div
                  v-for="(notification, index) in notifications"
                  v-bind:key="index"
                >
                  <q-item
                    style="min-width: 250px"
                    :active="notification.read_at === null"
                    :active-class="bgNotification"
                    @click="notificationAction(notification)"
                    clickable>
                    <q-item-section>
                      <q-item-label>{{notification.data.title}}</q-item-label>
                      <q-item-label caption lines="2">{{notification.data.description}}</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>há {{ notification.created_at }}</q-item-label>
                      <q-icon v-if="notification.read_at === null" name="album" color="blue" />
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset />
                </div>
              </q-list>
            </q-menu>
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
        <div class="absolute-center">Copyright © {{ new Date().getFullYear() }} | {{ version }}</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import OSidebar from 'quasar-ui-octo-app/src/components/OSidebar/OSidebar'
import { requester } from 'quasar-app-extension-octo-app/src/support'
import { version } from '../../package.json'

export default {
  name: 'AppDashboardLayout',
  components: {
    OSidebar
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
    notifications: {
      get () {
        return this.$store.state.notifications.notifications
      },
      set (val) {
        this.$store.commit('notifications/setNotifications', val)
      }
    },
    noReads: {
      get () {
        return this.notifications.filter(function (not) {
          return not.read_at === null
        })
      }
    },
    bgNotification: {
      get () {
        return !this.$q.dark.mode ? 'bg-teal-1' : 'bg-teal-10'
      }
    },
    darkMode: {
      get () {
        return this.$store.state.settings.darkMode
      },
      set (val) {
        return this.$store.commit('settings/setDarkMode', val)
      }
    }
  },
  mounted () {
    this.$q.dark.set(this.darkMode)
    const self = this
    this.$store.dispatch('notifications/get')
    const channel = this.$pusher.subscribe(`private-user-notification.${this.user.id}`)
    channel.bind(`user.notification`, ({ notifications }) => {
      self.notifications = notifications
    })
    setInterval(() => {
      self.notifications = self.notifications.map((not) => {
        return not
      })
    }, 60000)
  },
  methods: {
    toggleDarkMode: function () {
      this.darkMode = !this.darkMode
      this.$q.dark.set(this.darkMode)
    },
    logout: function () {
      this.$q.loading.show()
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.timer = setTimeout(() => {
            this.$router.push('/login')
            this.$q.loading.hide()
            this.timer = void 0
          }, 1000)
        }).catch(() => {
          this.$q.loading.hide()
          this.$router.push('/login')
          this.timer = void 0
        })
    },
    notificationAction: function (notification) {
      if (this.$router.currentRoute.path !== notification.data.action) {
        this.$router.push(notification.data.action)
      }
      if (!notification.read_at) {
        requester('delete', `notifications/${notification.id}`)
          .then(() => {
            this.$store.dispatch('notifications/get')
          })
      }
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
