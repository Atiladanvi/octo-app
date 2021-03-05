import { QTable } from 'quasar'
import StaticTable from './StaticTable'

export default {
  name: 'OTable',
  data(){
    return {
      data: []
    }
  },
  render (h) {
    return h(QTable, {
      props: {
        ...StaticTable
      },
    })
  },

}
