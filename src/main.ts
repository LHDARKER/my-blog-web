import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs'
import './styles/global.scss'

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs

// import style
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
