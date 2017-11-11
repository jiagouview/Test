// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: "/static/loading-svg/loading-bars.svg"
})

const store = new Vuex.Store({
  state: {
    userName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo(state, userName) {
      state.userName = userName
    },
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount
    },
    initCartCount(state, cartCount) {
      state.cartCount = cartCount
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
