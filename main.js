import App from './App'
import {showLoading, hideLoading} from './utils/common'

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false

// 全局注册加载与隐藏效果
Vue.prototype.showLoading = showLoading
Vue.prototype.hideLoading = hideLoading

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	
	// 全局注册加载与隐藏效果
	app.config.globalProperties.showLoading = showLoading
	app.config.globalProperties.hideLoading = hideLoading
	
  return {
    app
  }
}
// #endif