<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
  >
    <template v-slot:prepend>
      <q-avatar>
        <q-icon name="translate" size="24px" />
      </q-avatar>
    </template>
  </q-select>
</template>

<script>
import languages from 'quasar/lang/index.json'
const appLanguages = languages.filter(lang =>
  [ 'de', 'en-us' ].includes(lang.isoName)
)

export default {
  name: "DropDownLanguage",
  data () {
    return {
      lang: this.$q.lang.isoName
    }
  },

  watch: {
    lang (lang) {
      // dynamic import, so loading on demand only
      import(
        /* webpackInclude: /(de|en-us)\.js$/ */
      'quasar/lang/' + lang
        ).then(lang => {
        this.$q.lang.set(lang.default)
      })
    }
  },

  created () {
    this.langOptions = appLanguages.map(lang => ({
      label: lang.nativeName, value: lang.isoName
    }))
  }
}
</script>
