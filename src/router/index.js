import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue';
import Certification from '@/views/Certification.vue';
import empty from '@/views/empty.vue';
import emptyProtecter from '@/views/emptyProtecter.vue';
import layout from '@/views/layout.vue';
import NotFoundComponent from '@/views/404.vue';
import stableHeader from '@/views/stableHeader.vue';
import store from "@/store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/certification',
        name: 'certification',
        component: Certification
    },
    {
        path: '/main',
        component: function () {
            return import(/* webpackChunkName: "main" */ '../views/main.vue')
        },
        children: [
          {
              path: '',
              name: 'empty',
              component: empty,
              redirect: '/main/index'
          },
          // 首页
          {
            path: 'index',
            name: 'welcome',
            component: () => import('@/views/welcome'),
          },
          // 任务模块 /任务列表页
          {
            path: 'taskIndex',
            component: layout,
            children: [
              {
                path:'',
                // name:'taskIndexList',
                component: () => import('@/views/task/taskindex.vue'),
                beforeEnter: (to, from, next) => {
                  store.commit('setTabnumber', '0');
                  next();
                }
              }
            ]
          },
          // 创建任务
          {
            path: 'taskCreated',
            component: empty,
            children: [
              {
                path:'',
                // name:'taskIndexList',
                component: () => import('@/views/task/taskCreated.vue'),
              }
            ]
          },
          {
            path:'taskChange',
            component: empty,
            children: [
              {
                path:'',
                // name:'taskIndexList',
                component: () => import('@/views/task/taskChange.vue'),
              }
            ]
          },
          {
            path: 'schedulingIndex',
            component: layout,
            children: [
              {
                path:'',
                // name:'taskIndexList',
                component: () => import('@/views/scheduling/list.vue'),
                beforeEnter: (to, from, next) => {
                  store.commit('setTabnumber', '1');
                  next();
                }
              }
            ]
          },
            {
              path: 'rewardAndPunishment',
              component: layout,
                children: [
                  {
                      path: '',
                      name: 'rewardPunish',
                      component: function () {
                          return import(/* webpackChunkName: "contacts" */ '../views/task/rewardAndPunishment.vue')
                      },
                      beforeEnter: (to, from, next) => {
                          store.commit('setTabnumber', '2');
                          next();
                        }
                  },
                ]
            },
            {
              path: 'contacts',
              component: empty,
                children: [
                  {
                      path: '',
                      name: 'contactsSelf',
                      component: function () {
                          return import(/* webpackChunkName: "contacts" */ '../views/contacts/index.vue')
                      },
                  },
                    {
                        path: 'block',
                        name: 'contactsBlockDetail',
                        component: function () {
                            return import(/* webpackChunkName: "contacts" */ '../views/contacts/subs/blockDetail.vue')
                        },
                    },
                    {
                        path: 'blankDetail',
                        name: 'contactsBlankDetail',
                        component: function () {
                            return import(/* webpackChunkName: "contacts" */ '../views/contacts/subs/blankDetail.vue')
                        },
                    },
                ]
            },   
             {
              path: 'account',
              component: empty,
                children: [
                  {
                      path: '',
                      component: function () {
                          return import(/* webpackChunkName: "account" */ '../views/account/container.vue')
                      },
                      children: [
                          {
                              path: '',
                              name: 'accountCon',
                              component: function () {
                                  return import(/* webpackChunkName: "account" */ '../views/account/subs/index.vue')
                              },
                          },
                          {
                              path: 'login',
                              name: 'accountLogin',
                              component: function () {
                                  return import(/* webpackChunkName: "account" */ '../views/account/subs/login.vue')
                              },
                          },
                          {
                              path: 'payment',
                              name: 'accountPayment',
                              component: function () {
                                  return import(/* webpackChunkName: "account" */ '../views/account/subs/payment.vue')
                              },
                          },
                          {
                              path: 'phone',
                              name: 'accountPhone',
                              component: function () {
                                  return import(/* webpackChunkName: "account" */ '../views/account/subs/phone.vue')
                              },
                          },
                          {
                              path: 'picture',
                              name: 'accountPicture',
                              component: function () {
                                  return import(/* webpackChunkName: "account" */ '../views/account/subs/picture.vue')
                              },
                          },
                      ]
                  },
                ]
            },  
            {
              path: 'help',
              component: empty,
                children: [
                  {
                      path: '',
                      name: 'helpCon',
                      component: function () {
                          return import(/* webpackChunkName: "help" */ '../views/helpCenter/container.vue')
                      },
                  },
                    {
                      path: 'allLists',
                      name: 'helpConAllLists',
                      component: function () {
                          return import(/* webpackChunkName: "help" */ '../views/helpCenter/subs/allLists.vue')
                      },
                  },
                    {
                        path: 'targetLists',
                        name: 'helpConTargetLists',
                        component: function () {
                            return import(/* webpackChunkName: "help" */ '../views/helpCenter/subs/itemLists.vue')
                        },
                    },
                    {
                        path: 'targetDetail',
                        name: 'helpConTargetDetail',
                        component: function () {
                            return import(/* webpackChunkName: "help" */ '../views/helpCenter/subs/itemDetail.vue')
                        },
                    },
                ]
            },
            
          {
              path: 'incomeManagement',
              component: emptyProtecter,
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
              component: emptyProtecter,
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
    // 任务详情页面
    {
      path:'/main/taskIndex/',
      component: function () {
        return import(/* webpackChunkName: "stableHeader" */ '../views/stableHeader.vue')
      },
      // name:'taskDetails',
      children:[
        {
          path: 'details',
          name: 'details',
          component: () => import('@/views/task/taskDetails.vue'),
        }
      ]
    },
    // 排班详情页面
    {
      path:'/main/scheduling/',
      component: function () {
        return import(/* webpackChunkName: "stableHeader" */ '../views/stableHeader.vue')
      },
      children:[
        {
          path: 'details',
          name: 'schDetails',
           component: () => import('@/views/contacts/tempContainer.vue'),
        }
      ]
    },
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
