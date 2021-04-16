<template>
  <QTable
    table-header-class="gt-sm"
    :grid="grid"
    v-bind:style="[ loading ? { opacity: 0.5, 'pointer-events' : 'none' } : {} ]"
    :data="Odata"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :hide-header="Odata.length === 0"
    :pagination.sync="Opagination"
    :pagination-label="paginationLabel"
    :selected.sync="selected"
    :rows-per-page-options="OrowsPerPageOptions"
    @request="fetch"
    :hide-bottom="false"
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn-group push>
          <q-btn
            color="grey-7 col"
            v-for="(action, index) in props.row.actions"
            :disable="action.disabled"
            :icon="action.icon"
            :key="index"
            @click.stop="acting(props.row, action)"
            size="12px"
            flat
            dense
            round
          />
        </q-btn-group>
      </q-td>
    </template>
    <template v-slot:no-data="{ icon, message, filter }">
      <div v-if="loading" class="q-pa-lg-lg full-width text-center text-blue-grey q-gutter-sm">
        <q-spinner
          color="primary"
          size="5em"
          :thickness="2"
        />
      </div>
      <div v-if="!loading && Odata.length === 0" class="q-pa-lg full-width text-center text-blue-grey q-gutter-sm">
        <h5 class="q-ma-sm">Empty</h5>
      </div>
    </template>
  </QTable>
</template>

<script>
import DeleteDialog from './DeleteDialog.vue'
import DeleteLoadingModal from './DeleteLoadingDialog.vue'
import { unbind, requester, deepMerge } from 'quasar-app-extension-octo-app/src/support'
import { QTable, QBtn, QSpinner, QCard, QCardSection, QTooltip, QIcon, QBtnGroup } from 'quasar'

export default {
  name: 'OTable',
  components: { QTable, QBtn, QSpinner, QCard, QCardSection, QTooltip, QIcon, QBtnGroup },
  props: {
    name: {
      type: String,
      default: null
    },
    grid: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    route: {
      type: Object,
      default: function () {
        return {}
      }
    },
    filter: {
      type: String,
      default: null
    },
    columns: {
      type: Array,
      default: function () {
        return [ ]
      }
    },
    pagination: {
      type: Object,
      default: function () {
        return {}
      }
    },
    rowsPerPageOptions: {
      type: Array,
      default: function () {
        return [5, 10, 15, 20]
      }
    }
  },
  data ()   {
    return {
      selected: [],
      loading: false,
      Odata:  this.data,
      Ogrid:  this.grid,
      OrowsPerPageOptions:  this.rowsPerPageOptions,
      Ocolumns: this.columns,
      Opagination: {
        sortBy: null,
        descending: null,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
        pages: 1
      }
    }
  },
  watch: {
    data: function (val) {
      this.Odata = val
      this.Opagination = this.pagination
      this.OrowsPerPageOptions = this.rowsPerPageOptions
    }
  },
  mounted() {
    this.Opagination = unbind(this.pagination)
  },
  methods: {
    paginationLabel () {
      return `total: ${this.Opagination.rowsNumber} | page ${this.Opagination.page} of ${this.Opagination.pages}`
    },
    fetch (props) {
      this.loading = true
      requester('GET', this.$octo_route(this.route.name, this.route.params), props.pagination)
        .then((response) => {
          const component = response.body.components[this.name]
          deepMerge(this.$props, component)
          this.Odata = component.data
          this.Opagination = component.pagination
        })
        .finally(() => {
          this.loading = false
        })
    },
    acting (object, action) {
      switch (action.route.name.split('.')[1]) {
        case 'destroy':
          this.destroy(object, action)
          break
        case 'edit':
          this.edit(object, action)
          break
        case 'show':
          this.show(object, action)
          break
        case 'download':
          this.download(object, action)
          break
      }
    },
    show: function (object, action) {
      this.$router.push(action.route)
    },
    edit: function (object, action) {
      this.$router.push(action.route)
    },
    download: function (object, action) {
      requester('GET', this.$octo_route(action.route.name, action.route.params))
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.body]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', object.nome)
          document.body.appendChild(link)
          link.click()
        })
    },
    destroy: function (object, action) {
      this.$q.dialog({
        component: DeleteDialog,
        parent: this,
        object: object
      }).onOk(() => {
        const that = this
        that.loadingTable = true
        let loading = this.$q.dialog({
          component: DeleteLoadingModal,
          parent: that,
          object: object
        })
        setTimeout(function () {
          requester('DELETE', that.$octo_route(action.route.name, action.route.params))
            .then((response) => {
              that.fetch({ pagination: this.Opagination })
              that.$q.notify({
                color: 'green',
                icon: 'check',
                message: response.body.message,
                position: 'bottom-right',
                multiLine: 'multiLine',
                actions: '',
                timeout: 5000
              })
              loading.hide()
            })
            .catch((error) => {
              that.$q.notify({
                color: 'red',
                actions: [{ icon: 'close', color: 'white' }],
                icon: 'error',
                message: error.response.data.message,
                position: 'bottom-right',
                multiLine: 'multiLine',
                timeout: 7000
              })
              loading.hide()
            })
        }, 1000)
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    },
  },
}
</script>
