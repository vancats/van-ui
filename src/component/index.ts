import type { App } from 'vue'
import Icon from './icon'
import Area from './area'
import Trend from './trend'
import Table from './table'

const components = [
  Icon,
  Area,
  Trend,
  Table,
]

export default {
  install(app: App) {
    components.forEach(item => {
      app.use(item)
    })
  },
}
