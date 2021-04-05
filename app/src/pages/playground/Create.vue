<template>
  <q-page>
    <div class="container q-pa-md">
      <q-card>
        <q-card-section class="q-pa-md justify-between" horizontal>
          <h4 class="text-weight-thin text-h4 q-mt-xs q-mb-none">{{ $route.meta.title }}</h4>
          <q-card-actions>
            <q-btn-group>
              <q-btn
                @click="$router.push({ name: 'route.index' })"
                flat
                color="grey-7"
                icon="remove_red_eye"
                dense
                round
              />
              <q-btn
                @click="$router.push({ name: 'route.index' })"
                flat
                color="grey-7"
                icon="list"
                dense
                round
              />
              <q-btn
                @click="$router.push({ name: 'route.index' })"
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
        <o-form v-bind="$props"></o-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import OForm from './Form'

export default {
  name: 'CreateContato',
  components: { OForm },
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
