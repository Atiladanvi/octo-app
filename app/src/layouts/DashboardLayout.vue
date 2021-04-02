<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="q-header-ju" height-hint="61.59">
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
          Octo App
        </q-toolbar-title>
        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn
            round dense flat
            borderless
          >
            <q-icon name="brightness_high" />
          </q-btn>
          <q-btn round dense flat icon="notifications">
            <q-badge color="red" floating></q-badge>
            <q-menu>
              <q-list style="min-width: 150px">
                <span class="text-h6 q-ml-md">Notificações</span>
                <q-separator/>
                <h6 class="q-ml-sm q-mr-sm q-mt-sm q-mb-sm">Sem notificações</h6>
                <div>
                  <q-item
                    style="min-width: 250px"
                    clickable>
                    <q-item-section>
                      <q-item-label></q-item-label>
                      <q-item-label caption lines="2"></q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>há</q-item-label>
                      <q-icon name="album" color="blue" />
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
                  <q-item-section>New Object</q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn dense flat no-wrap>
            <q-avatar text-color="black" size="24px" color="white"></q-avatar>
          <q-icon name="arrow_drop_down" size="16px" />
          <q-menu auto-close>
            <q-list dense>
              <q-item disable clickable class="GL__menu-link">
                <q-item-section>Ajuda</q-item-section>
              </q-item>
              <q-item disable clickable class="GL__menu-link">
                <q-item-section>Configurações</q-item-section>
              </q-item>
              <q-item clickable to="/login" class="GL__menu-link">
                <q-item-section>Sair</q-item-section>
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
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      bordered
      :width="250"
      :breakpoint="600"
    >
      <app-menu></app-menu>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="sm-hide xs-hide q-footer-ju"  height-hint="61.59">
      <q-toolbar>
        <div class="absolute-center">Copyright © {{ new Date().getFullYear() }}</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>

import AppMenu from 'components/AppMenu'

export default {
  name: 'MyLayout',
  components: {
    AppMenu
  },
  data () {
    return {
      leftDrawerOpen: false,
      miniState: true,
      appName: process.env.VUE_APP_NAME
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
    &__menu-link-signed-in
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
