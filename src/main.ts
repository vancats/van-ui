import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router/index'
import 'element-plus/dist/index.css'
import './styles/main.css'
// import { hyphen } from './utils'

const app = createApp(App)

// 注册 svg 图标
for (const i in Icons)
  app.component(i, (Icons as any)[i])

app.use(router).use(ElementPlus)
app.mount('#app')
