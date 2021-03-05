import { QTable } from 'quasar'
import StaticTable from './StaticTable';

export default {
  name: 'OTable',
  render (h) {
    return h(QTable, {
      props: {
        ...StaticTable
      },
    })
  },

}
