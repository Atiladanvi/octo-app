export default {
  computed: {
    organizacao: {
      get: function () {
        return this.$store.getters['auth/organization']
      },
      set: function (organizacao) {
        return this.$store.dispatch('auth/switchOrganizacao', organizacao.id)
      }
    },
    organizacoes: {
      get: function () {
        return this.$store.getters['auth/organizations']
      },
      set: function (organizacoes) {
        return this.$store.commit('auth/organizations', organizacoes)
      }
    }
  }
}
