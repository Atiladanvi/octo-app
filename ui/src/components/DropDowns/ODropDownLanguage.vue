<template>
  <q-select
    class="p-dropdown-language"
    v-model="lang"
    :options="langOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
  >
    <template v-slot:prepend>
      <q-icon name="translate" size="24px" />
    </template>
  </q-select>
</template>

<script>
import languages from 'quasar/lang/index.json'

export default {
  name: 'DropDownLanguage',
  computed: {
    lang: {
      get() {
        return this.$i18n.locale
      },
      set(lang) {
        this.setLangPackDefault(lang)
        this.$i18n.locale = lang
      }
    }
  },
  created () {
    this.langOptions = languages
        .filter(lang => this.$i18n.availableLocales.includes(lang.isoName))
        .map(lang => ({ label: lang.nativeName, value: lang.isoName }))
    this.setLangPackDefault(this.$i18n.locale)
  },
  methods: {
    setLangPackDefault (lang) {
      import('quasar/lang/' + lang)
          .then(lang => {
            this.$q.lang.set(lang.default)
          })
    }
  }
}
</script>

<style>
.p-dropdown-language .q-field__native,
.p-dropdown-language .q-field__marginal {
  color: white;
}
</style>
