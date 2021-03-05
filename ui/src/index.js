import { version } from '../package.json'

import Table from './components/Table'
import ApiInteraction from './directives/ApiInteraction'

export {
  version,
  Table,
  ApiInteraction
}

export default {
  version,
  Table,
  ApiInteraction,
  install (Vue) {
    Vue.component(Table.name, Table)
    Vue.directive(ApiInteraction.name, ApiInteraction)
  }
}
