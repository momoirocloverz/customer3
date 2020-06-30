import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    key:'webVuex',
    storage: window.localStorage
})
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        menuActiveIndex:'1',
        webInfo:{},
        pathSize:[],
        accountActiveIndex:'1',
        tabNumber:'0'
    },
    getters: {
        getAccountActiveIndex: state => {
            return state.accountActiveIndex
        },
        getMenuActiveIndex: state => {
            return state.menuActiveIndex
        },
        getPathSize: state => {
            return state.pathSize
        },
        getCurrentPageSize: state =>(name)=> {
            return state.pathSize.find( ele=>ele.name == name ) ? state.pathSize.find( ele=>ele.name == name ).pageSize : '';
        },
        getWebInfo:state => {
            return state.webInfo
        },
    },
    mutations: {
        //重置初始化属性，都在这里添加，然后调用
        reInitVuexData(state){
            state.menuActiveIndex = '1';
            state.webInfo = {};
        },
        changeAccountActiveIndex(state,payload){
            state.accountActiveIndex = payload;
        },
        changeMenuActiveIndex(state,payload){
            state.menuActiveIndex = payload;
        },
        setPathSize(state,payload){
            if(state.pathSize.length === 0){
                state.pathSize.push(payload);
            }else{
                let list = state.pathSize;
                let names = list.map(i => i.name);
                let index = names.indexOf(payload.name);
                if(index > -1){
                    if(list[index].pageSize != payload.pageSize){
                        list[index].pageSize = payload.pageSize;
                        state.pathSize = list;
                    }
                }else{
                    state.pathSize.push(payload);
                }
            }
        },
        setTabnumber(state,payload){
          state.tabNumber = payload
        },
        setWebInfo(state,payload){
            state.webInfo = payload;
        },
    },
    actions: {
    },
    modules: {
    },
    plugins: [vuexLocal.plugin],
})