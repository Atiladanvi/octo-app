<template>
  <q-page>
    <div class="container q-pa-md">
      <q-card>
        <q-card-section class="q-pa-md justify-between" horizontal>
          <h4 class="text-weight-thin text-h4 q-mt-xs q-mb-none">{{ $route.meta.title }}</h4>
          <q-card-actions>
            <q-btn-group>
              <q-btn
                @click="$router.push({ name: 'parceiros.index' })"
                flat
                color="grey-7"
                icon="remove_red_eye"
                dense
                round
              />
              <q-btn
                @click="$router.push({ name: 'parceiros.index' })"
                flat
                color="grey-7"
                icon="list"
                dense
                round
              />
              <q-btn
                @click="$router.push({ name: 'parceiros.index' })"
                flat
                color="grey-7"
                icon="add"
                dense
                round
              />
            </q-btn-group>
          </q-card-actions>
        </q-card-section>
        <pre>{{ $props }}</pre>
        <contato-form v-bind="$props"></contato-form>
      </q-card>
    </div>
  </q-page>

</template>

<script>

import ContatoForm from './Form'

export default {
  name: 'CreateContato',
  components: { ContatoForm },
  props: {
    auth: {
      type: Object,
      default () {
        return {
          user: {
            name: '',
            email: ''
          }
        }
      }
    }
  }
}
</script>
