import Vue from 'vue'
import Vuex from 'vuex'
import hot from './hotMovie'
import come from './comeMovie'
import cityIdName from './cityIdName'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        hot,
        come,
        cityIdName
    }
})

export default store;