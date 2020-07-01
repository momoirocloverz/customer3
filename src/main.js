import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/resetGlobalStyle.scss';
import dayjs from '@/utils/day.js';
import qrcode from '@/utils/qrcode.js';
import CONST from '@/utils/CONST.js';
import ApiLists from '@/apis/apiLists.js';
import CusTable from '@/components/cusTable.vue';
import companyLogo from '@/components/companyLogo.vue';
import personalLogo from '@/components/personalLogo.vue';
import multipleRoles from '@/components/multipleRoles.vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import * as filters from './utils/filters';
import {priceFor} from './utils/piece';
import BaiduMap from 'vue-baidu-map';

Vue.use(BaiduMap, {
 ak: 'xtnQvrLuY6RFL5A0HAGaRGZysSa7Ntht'  //这个地方是官方提供的ak密钥
})
Vue.use(ApiLists);
Vue.use(dayjs);
Vue.use(qrcode);
Vue.use(ElementUI);
Vue.use(CONST);

Vue.component('VueCropper',VueCropper);
Vue.component('CusTable', CusTable);
Vue.component('CompanyLogo', companyLogo);
Vue.component('PersonalLogo', personalLogo);
Vue.component('MultipleRoles', multipleRoles);

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.filter('priceFor', priceFor)
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
