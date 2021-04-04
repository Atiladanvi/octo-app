<template>
  <div>
    <q-uploader
      style="width:auto"
      ref="uploader"
      label="Arquivos anexos (max:2mb)"
      @rejected="onRejected"
      max-file-size="2097152"
      max-total-size="2097152"
      @added="addFiles"
      @finish="finish"
      :factory="factoryFn"
      :hide-upload-btn="!apiInteraction"
      multiple
    >
      <template v-slot:list="scope">
        <q-list separator>
          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                Status: {{ file.__status }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                :disable="file.__status === 'uploaded'"
                @click="file.__status === 'uploaded' ? '' : scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>

          <q-item v-for="file in files" :key="file.id">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                Status: {{ file.__status }} | Created at {{ file.created_at }} / Updated at {{ file.updated_at }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img.src"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                color="grey-7 col"
                v-for="(action, index) in file.actions"
                :disable="action.disabled"
                :icon="action.icon"
                :key="index"
                @click.stop="tableAction(file, action)"
                size="12px"
                flat
                dense
                round
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-uploader>
  </div>
</template>

<script>

import headers from '../router/headers'
import requester from '../support/requester'
import bytesToSize from '../support/bytesToSize'
import hasResource from '../mixins/hasResource'
import hasTable from '../mixins/hasTable'

export default {
  name: 'OUploader',
  model: {
    event: 'change'
  },
  mixins: [hasResource, hasTable],
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    actions: {
      index: {},
      store: {},
      delete: {},
      download: {}
    },
    modelType: null,
    modelId: null,
    apiInteraction: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      files: []
    }
  },
  computed: {
    model: {
      get () { return this.value },
      set (value) {
        this.$emit('change', value)
      }
    }
  },
  mounted () {
    if (this.apiInteraction) {
      this.fetch()
    }
  },
  methods: {
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    removeFiles (files) {
      this.model = files
    },
    initTable () {
      this.fetch()
    },
    addFiles (files) {
      this.model = files
    },
    finish () {
      this.$refs.uploader.removeQueuedFiles()
      this.$refs.uploader.removeUploadedFiles()
      this.fetch()
    },
    async fetch () {
      await requester('GET', this.$octo_route(this.actions.index.route), {
        model_type: this.modelType,
        model_id: this.modelId
      }).then(response => {
        this.files = []
        response.body.data.forEach(file => {
          this.files.push({
            ...file,
            name: file.nome,
            __status: 'uploaded',
            __sizeLabel: bytesToSize(file.size),
            __img: {
              src: file.type === 'image' ? file.url : null
            }
          })
        })
      })
    },
    factoryFn (files) {
      return {
        url: this.$octo_route(this.actions.store.route),
        method: 'POST',
        formFields: [
          {
            name: 'model_type',
            value: this.modelType
          },
          {
            name: 'model_id',
            value: this.modelId
          }
        ],
        fieldName: 'file',
        headers: headers(this.$store)
      }
    }
  }
}
</script>
