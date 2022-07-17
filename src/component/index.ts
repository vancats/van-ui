import type { App } from 'vue'
import Icon from './icon'
import Area from './area'
import Trend from './trend'
import Table from './table'
import Form from './form'
import ModalForm from './modalForm'

const components = [
  Icon,
  Area,
  Trend,
  Table,
  Form,
  ModalForm,
]

export default {
  install(app: App) {
    components.forEach(item => {
      app.use(item)
    })
  },
}
