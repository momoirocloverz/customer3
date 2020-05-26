import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/resetGlobalStyle.scss';
import dayjs from '@/utils/day.js';
import ApiLists from '@/apis/apiLists.js';
import CusTable from '@/components/cusTable.vue';
import * as filters from './utils/filters'
Vue.use(ApiLists);
Vue.use(dayjs);
Vue.use(ElementUI);
Vue.component('CusTable', CusTable);
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.prototype.bucketHost = 'img.10000rc.com';
if (process.env.NODE_ENV == 'production') {
} else {
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
