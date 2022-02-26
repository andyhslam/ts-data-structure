import Vue from 'vue'
import App from './App.vue'
// require('./structure/linked_list')
// import './structure/hash_table'
require('./structure/tree')

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')