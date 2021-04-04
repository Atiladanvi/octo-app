<template>
  <q-page>
    <div class="container q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <h4 class="text-weight-thin text-h4 q-mt-xs q-mb-none">Playground</h4>
          <h6 class="text-weight-thin text-h6 q-mt-xs q-mb-none">API REQUESTER</h6>
        </q-card-section>
        <div class="row q-py-lg q-px-lg">
          <div class="col">
            <div class="row">
              <div class="col">
                <h5 class="q-my-sm">Request</h5>
                <q-form>
                  <div class="row">
                    <q-select
                      class="col-md-2"
                      v-model="method"
                      :options="methods"
                      label="method"
                      standout="bg-blue-7 text-black"
                    />
                    <q-input
                      class="col-md-7 q-mx-lg"
                      label="end point"
                      v-model="endPoint"
                      standout="bg-blue-7 text-black"
                    />
                    <q-btn
                      class="col-md-2"
                      dark-percentage
                      @click="request"
                      unelevated
                      color="primary"
                      text-color="white"
                      icon="send"
                    />
                  </div>
                </q-form>
              </div>
            </div>
            <div class="row q-mt-lg">
              <div class="col">
              </div>
            </div>
          </div>
          <div class="col">
            <h5 class="q-my-sm">Params</h5>
            <json-editor class="q-px-xs" v-if="true" :json="params" />
          </div>
        </div>
        <div class="row q-py-lg q-px-lg">
          <div class="col">
            <h5 class="q-my-sm">Response</h5>
            <json-pretty-print :data="props"/>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>

</template>

<script>

import JsonPrettyPrint from '../../components/JsonPrettyPrint'
import requester from '../../support/requester'
import JsonEditor from 'vue2-jsoneditor'

export default {
  name: 'PanelFormParceiro',
  components: { JsonPrettyPrint, JsonEditor },
  data () {
    return {
      method: 'GET',
      props: {},
      endPoint: '/playground',
      params: {},
      response: { body: {} },
      methods: [
        'GET',
        'POST'
      ]
    }
  },
  methods: {
    request () {
      requester(this.method, this.endPoint)
        .then(response => {
          this.props = response.body.components
          this.params = response.body.components['playground.index'].pagination
        })
    }
  }
}
</script>

<style>
 .jsoneditor {
   height: 370px !important;
 }
</style>
