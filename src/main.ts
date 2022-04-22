import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import VanUI from './component'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

// 注册 svg 图标
for (const i in Icons)
  app.component(i, (Icons as any)[i])

app.use(router).use(ElementPlus).use(VanUI)
app.mount('#app')
