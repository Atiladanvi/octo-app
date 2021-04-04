export default {
  data () {
    return {
      filterTable: '',
      modalData: {},
      selectedRows: [],
      loadingTable: false,
      paramsTable: {},
      pagination: {
        sortBy: null,
        descending: null,
        page: 1,
        pages: 0,
        rowsPerPage: 10,
        rowsNumber: null
      }
    }
  },
  methods: {
    getPaginationLabel (last) {
      return `total: ${this.pagination.rowsNumber} | página ${this.pagination.page} de ${this.pagination.pages}`
    },
    getObjectByProps (props, colName) {
      return props.cols.filter(col => col.name === colName)[0]
    },
    fetchPagination (props) {
      this.paramsTable = Object.assign(this.paramsTable, this.serializeParams(props))
      this.initTable()
    },
    serializeParams (props) {
      return {
        sortBy: props.pagination.sortBy,
        descending: props.pagination.descending,
        page: props.pagination.page,
        rowsPerPage: props.pagination.rowsPerPage,
        rowsNumber: props.pagination.rowsNumber,
        filter: props.filter
      }
    },
    tableAction (object, action) {
      this.modalData = {
        object: object,
        action: action
      }
      switch (action.route.name.split('.')[1]) {
        case 'destroy':
          this.destroy(object, action)
            .then(() => {
              this.loadingTable = false
              this.initTable()
            }).catch(() => {
              this.initTable()
              this.loadingTable = true
            })
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
    }
  },
  watch: {
    organizacao: function (newOrg, oldOrg) {
      if (newOrg && newOrg.nome !== oldOrg.nome) {
        this.initTable()
      }
    },
    filterTable: function () {

    }
  }
}
