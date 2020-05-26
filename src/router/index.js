import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue';
import empty from '@/views/empty.vue';
import NotFoundComponent from '@/views/404.vue';
import stableHeader from '@/views/stableHeader.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/main',
        component: function () {
            return import(/* webpackChunkName: "main" */ '../views/main.vue')
        },
        children: [
            {
                path: '',
                name: 'welcome',
                component: function () {
                    return import(/* webpackChunkName: "main" */ '../views/welcome.vue')
                },
            },
            {
                path: 'incomeManagement',
                component: empty,
                children: [
                    {
                        path: '',
                        name: 'incomeManaClassList',
                        component: function () {
                            return import(/* webpackChunkName: "incomeManagement" */ '../views/incomeManagement/classList.vue')
                        },
                    },
                    {
                        path: 'sendClasslist',
                        name: 'incomeManaSendClasslist',
                        component: function () {
                            return import(/* webpackChunkName: "incomeManagement" */ '../views/incomeManagement/sendClassList.vue')
                        }
                    },
                    {
                        path: 'pendingGeneration',
                        name: 'pendingGeneration',
                        component: function () {
                            return import(/* webpackChunkName: "incomeManagement" */ '../views/incomeManagement/pendingGeneration.vue')
                        }
                    },
                ]
            },
            {
                path: 'provideMaster',
                component: empty,
                children: [
                    {
                        path: '',
                        name: 'provideMasterList',
                        component: function () {
                            return import(/* webpackChunkName: "provideMaster" */ '../views/provideMaster/commonList.vue')
                        },
                    },
                ]
            },
        ]
    },
    //详情页面剥离出来，避免错误嵌套
    {
        path: '/main/incomeManagement/',
        component: function () {
            return import(/* webpackChunkName: "stableHeader" */ '../views/stableHeader.vue')
        },
        children: [
            {
                path: 'classDetail',
                name: 'incomeManagementClassDetail',
                component: function () {
                    return import(/* webpackChunkName: "businessList" */ '../views/incomeManagement/classDetail.vue')
                },
            }
        ]
    },
    {
        path: '/main/provideMaster/',
        component: function () {
            return import(/* webpackChunkName: "stableHeader" */ '../views/stableHeader.vue')
        },
        children: [
            {
                path: 'orderDetail',
                name: 'provideOrderDetail',
                component: function () {
                    return import(/* webpackChunkName: "provideMaster" */ '../views/provideMaster/status/statusMasterCon.vue')
                },
            },
            {
                path: 'commonInnerDetail',
                name: 'commonInnerDetail',
                component: function () {
                    return import(/* webpackChunkName: "provideMaster" */ '../views/provideMaster/commonInnerDetail.vue')
                },
            },
        ]
    },
    {
        path: '/blank',
        name: 'blank',
        component: empty,
    },
    {
        path: '*',
        component: NotFoundComponent
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next)=>{
    let webToken = localStorage.getItem('webToken');
    if(webToken){
        next()
    }else{
        if (to.name === 'login') { //这就是跳出循环的关键
            next()
        } else {
            router.push({
                path: '/'
            })
        }
    }
})
export default router
