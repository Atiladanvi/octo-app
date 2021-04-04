export default {
  computed: {
    darkMode: {
      get () {
        return this.$store.state.settings.darkMode
      },
      set (val) {
        return this.$store.commit('settings/setDarkMode', val)
      }
    }
  }
}
