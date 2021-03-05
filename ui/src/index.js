import { version } from '../package.json'

import OTable from './components/OTable'
import ApiInteraction from './directives/ApiInteraction'

export {
  version,
  OTable,
  ApiInteraction
}

export default {
  version,
  OTable,
  ApiInteraction,
  install (Vue) {
    Vue.component(OTable.name, OTable)
    Vue.directive(ApiInteraction.name, ApiInteraction)
  }
}
