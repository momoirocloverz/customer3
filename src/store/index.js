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
        menuActiveIndex:'0',
        webInfo:{},
        pathSize:[],//存储分页设置
        breadcrumbList:[  { title:'首页' } ],
    },
    getters: {
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
        getBreadcrumbList:state=>{
            return state.breadcrumbList
        }
    },
    mutations: {
        //重置初始化属性，都在这里添加，然后调用
        reInitVuexData(state){
            state.menuActiveIndex = '0';
            state.webInfo = {};
            state.breadcrumbList = [ { title:'首页' } ];
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
        setWebInfo(state,payload){
            state.webInfo = payload;
        },
        setBreadcrumbList(state,payload){
            state.breadcrumbList = payload;
        },
    },
    actions: {
    },
    modules: {
    },
    plugins: [vuexLocal.plugin],
})