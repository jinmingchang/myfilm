import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { List,Cell,Toast,Button,IndexBar, IndexAnchor,DropdownMenu, DropdownItem } from 'vant';
import "@/until/filter.js"
import "@/until/directive.js"

Vue.use(List).use(Cell).use(Toast).use(Button).use(IndexBar).use(IndexAnchor).use(DropdownMenu).use(DropdownItem);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
