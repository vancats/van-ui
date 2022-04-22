import type { App } from 'vue'
import chooseIcon from './icon'
import chooseArea from './area'

const components = [
  chooseIcon,
  chooseArea,
]

export default {
  install(app: App) {
    components.forEach(item => {
      app.use(item)
    })
  },
}
