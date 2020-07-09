import instance from './axios';
import axios from 'axios';
import qs from 'qs';
const _apiLists = {
    //密码登录
    login:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/login/pwd',
            params
        })
    },
    multiLogin:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/login/multiLogin',
            params
        })
    },    
    fetchMobileAccount:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/login/mobileAccount',
            params
        })
    },   
    loginNintendoSwitch:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/login/switch',
            params
        })
    },   
    personalCustomerConfirm:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/customer/personalCustomerConfirm',
            params
        })
    },   
    enterpriseCustomerCheck:(data)=>{
        return instance({
            method: 'post',
            url: '/user-center/customer/enterpriseCustomerCheck',
            data,
        })
    },
    enterpriseCustomerConfirm:(data)=>{
        return instance({
            method: 'post',
            url: '/user-center/customer/enterpriseCustomerConfirm',
            data,
        })
    },  
    talentUpdateAttr:(data)=>{
        return instance({
            method: 'post',
            url: '/user-center/talent/updateAttr',
            data,
        })
    },  
    helpRangeList:(params)=>{
        return instance({
            method: 'get',
            url: '/orgrimar/help/range/list',
            params
        })
    },
    helpQuestionList:(data)=>{
        return instance({
            method: 'post',
            url: '/orgrimar/help/question/list',
            data,
        })
    },  
    helpQuestionDetail:(params)=>{
        return instance({
            method: 'get',
            url: '/orgrimar/help/question/detail',
            params
        })
    },
    userSetPassWord:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/user/setPassWord',
            params
        })
    },
    verifyCode:(params)=>{
        return instance({
            method: 'get',
            url: '/orgrimar/sms/verifyCode',
            params
        })
    },
    changeMobile:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/customer/changeMobile',
            params
        })
    },
    setLogoAndBg:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/customer/setLogoAndBg',
            params
        })
    },
    businessCustomerDetail:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/customer/detail',
            params
        })
    }, 
    uploadQiniu:(data)=>{
        return axios({
            method: 'post',
            url: 'http://upload.qiniu.com/',
            data
        })
    },
    switchEmpStatus:(data)=>{
        return instance({
            method: 'post',
            url: '/user-center/talent/switchEmpStatus',
            data,
        })
    },  
    talentMailList:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/mailList',
            params
        })
    }, 
    talentQueryMailList:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/mailList/talents',
            params
        })
    }, 
    waitReceiveEmpNum:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/waitReceiveEmpNum',
            params
        })
    }, 
    waitReceiveEmp:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/waitReceiveEmp',
            params
        })
    }, 
    fetchContactsTalents:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/talents',
            params
        })
    }, 
    fetchTalentSkills:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/skills',
            params
        })
    }, 
    talentsCus:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/talents/cus',
            params
        })
    },     
    talentSmallCus:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/talents/smallCus',
            params
        })
    },   
    getBindingCode:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/partner/getBindingCode',
            params
        })
    },  
    rewardAndPunishDetails:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/rewardAndPunish/detail',
            params
        })
    },  
    rewardAndPunishLists:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/rewardAndPunish/list',
            params
        })
    },  
    rewardAndPunishGetUser:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/rewardAndPunish/getUser',
            params
        })
    },  
    getLinkAgeTask:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/rewardAndPunish/getLinkAgeTask',
            params
        })
    },  
    getLinkAgeBatch:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/rewardAndPunish/getLinkAgeBatch',
            params
        })
    },  
    getLinkAgeIndustry:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/rewardAndPunish/getLinkAgeIndustry',
            params
        })
    },      
    addRewardAndPunish:(data)=>{
        return instance({
            method: 'post',
            url: '/trade/rewardAndPunish/add',
            data,
        })
    },
    operateRewardAndPunish:(data)=>{
        return instance({
            method: 'post',
            url: '/trade/rewardAndPunish/opers',
            data,
        })
    },
    schedulingDetail:(params)=>{
        return instance({
            method: 'get',
            url: '/biz-center/scheduling/detail',
            params
        })
    }, 
    getSchedulingCode:(params)=>{
        return instance({
            method: 'get',
            url: '/biz-center/schedulingCodeApply/getCode',
            params
        })
    }, 
    applyListCustomer:(params)=>{
        return instance({
            method: 'get',
            url: '/biz-center/schedulingCodeApply/applyListCustomer',
            params
        })
    }, 
    confirmApplySchCode:(data)=>{
        return instance({
            method: 'post',
            url: '/biz-center/schedulingCodeApply/confirmApply',
            data,
        })
    },
    fetchTalentByIdCard:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/getByIdCard',
            params
        })
    },
    schedulFastAddEmp:(data)=>{
        return instance({
            method: 'post',
            url: '/biz-center/schedulingEmployee/fastAddEmp',
            data,
        })
    },
    talentRecommend:(data)=>{
        return instance({
            method: 'post',
            url: '/user-center/talent/recommend',
            data,
        })
    },
    codeBindingCustomer:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/partner/bindingCustomer',
            params
        })
    },
    talentUpdateSkill:(data)=>{
        return instance({
            method: 'post',
            url: '/user-center/talent/updateSkill',
            data,
        })
    },
    
    
    
    
    
    
    
    
    
    
    orgrimarAttributeList:(params)=>{
        return instance({
            method: 'get',
            url: '/orgrimar/attribute/list',
            params
        })
    }, 
    talentUnbind:(params)=>{
        return instance({
            method: 'delete',
            url: '/user-center/talent/unbind',
            params
        })
    }, 
    getPartnerList:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/partner/getPartnerList',
            params
        })
    }, 
    getTalentDetails:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/talent/details',
            params
        })
    }, 
    removePartner:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/partner/removePartner',
            params
        })
    }, 
    waterMark:(params)=>{
        return instance({
            method: 'get',
            url: '/orgrimar/sysparam/n/value',
            params
        })
    }, 
    getDicList:(params)=>{
        return instance({
            method: 'get',
            url: '/orgrimar/dictionary/getSonNodeByCodeAndValue',
            params,
        })
    },
    getSonNodeByParentId:(params)=>{
        return instance({
            method: 'get',
            url: '/orgrimar/dictionary/getSonNodeByParentId',
            params,
        })
    },
    cowToken:()=>{
        return instance({
            method: 'get',
            url: '/orgrimar/qiniu/token',
        })
    },
    cowSpToken:(params)=>{
        return instance({
            method: 'get',
            url: '/orgrimar/qiniu/token2',
            params
        })
    },
    //验证码登录
    loginCode:(params)=>{
        return instance({
            method: 'get',
            url: '/user-center/login/code',
            params
        })
    },
    //获取手机验证码
    getSmsCode(params){
        return instance({
            method: 'get',
            url: '/orgrimar/sms/getCode',
            params
        })
    },
    orderFrameDetail(params){
        //奖惩，收入，扣款 详情（弹框）
        return instance({
            method: 'get',
            url: '/trade/salary/order/sub/frame/detail',
            params
        })
    },
    payUnderLine:(data)=>{
        //生成线下订单
        return instance({
            method: 'post',
            url: '/trade/salary/order/pay/underLine',
            data,
        })
    },
    PayHanTang:(data)=>{
        //生成线上薪企云订单
        return instance({
            method: 'post',
            url: '/trade/salary/order/pay/PayHanTang',
            data,
        })
    },
    salaryOrderHtPay:(data)=>{
        //支付线上薪企云订单
        return instance({
            method: 'post',
            url: '/trade/salary/order/htPay',
            data,
        })
    },
    setPasswordCus:(data)=>{
        //设置管理费账户支付密码(企业账号)
        return instance({
            method: 'post',
            url: '/trade/cusAccount/setPassword/cus',
            data,
        })
    },
    orderCancelOrder:(data)=>{
        //取消订单
        return instance({
            method: 'post',
            url: '/trade/salary/order/cancelOrder',
            data,
        })
    },
    payOrderTitle(params){
        //订单公用头
        return instance({
            method: 'get',
            url: '/trade/salary/order/payOrder/title',
            params
        })
    },
    // 人员收入列表总和
    getSalaryLists:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/list',
            params,
        })
    },
    // 按人汇总
    getListByPop:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/listByPop',
            params,
        })
    },
    // 获取用户信息
    getBaseInfo:(data)=>{
        return instance({
            method: 'post',
            url: '/user-center/user/baseInfo',
            data,
        })
    },
    // 人员收入列表总和已发
    getAlready:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/list/already',
            params,
        })
    },
    // 人员收入列表总和已发按人汇总
    getByPopAlready:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/listByPop/already',
            params,
        })
    },
    // 人员收入列表总和 查看详情
    getListByTalentId:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/listByTalentId',
            params,
        })
    },
    // 人员收入列表总和已发 查看详情
    getAlreadyTalentId:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/list/already/talent',
            params,
        })
    },
    // 奖惩,扣款，收入详情
    getComDetail:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/frame/detail',
            params,
        })
    },
    // 获取人员列表
    getBtalents:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/salary/order/talents',
            params,
        })
    },
    //获取任务列表
    getBtaskList:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/salary/order/tasks',
            params,
        })
    },
    //结算周期列表
    getSettleList:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/salary/order/settle',
            params,
        })
    },
    waitToPayOrderDetail:(params)=>{
        //待发放订单详情查询
        return instance({
            method: 'get',
            url: '/trade/salary/order/waitToPayOrder',
            params,
        })
    },
    orderPayOrderDetail:(params)=>{
        //订单明细
        return instance({
            method: 'get',
            url: '/trade/salary/order/payOrder/detail',
            params,
        })
    },
    waitToPayListGetter:(params)=>{
        //待发放订单列表查询
        return instance({
            method: 'get',
            url: '/trade/salary/order/payList',
            params,
        })
    },
    orderPayOrder:(params)=>{
        //发放订单详情查询 (待付款 已发放)
        return instance({
            method: 'get',
            url: '/trade/salary/order/payOrder',
            params,
        })
    },
    hantangAccount:(params)=>{
        //汉唐账户相关信息
        return instance({
            method: 'get',
            url: '/orgrimar/hantang/account',
            params,
        })
    },
    getCurrentTime(){
        return instance({
            method: 'get',
            url: '/orgrimar/sys/currentTime'
        })
    },
    getCusAccountDetail:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/cusAccount/detail',
            params
        })
    }, 
    orderDeletePayOrder:(data)=>{
        //删除待发放明细
        return instance({
            method: 'post',
            url: '/trade/salary/order/deletePayOrder',
            data,
            arrayFormat: 'brackets'
        })
    },
    orderPayAction:(data)=>{
        //线下支付执行
        return instance({
            method: 'post',
            url: '/trade/salary/order/pay',
            data,
        })
    },
    orderExport:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/salary/order/sub/export',
            params,
        })
    },
    subDeletePayOrder:(data)=>{
        //删除待发放明细（以人为纬度）
        return instance({
            method: 'post',
            url: '/trade/salary/order/sub/deletePayOrder',
            data,
            arrayFormat: 'brackets'
        })
    },
    //生成待发放订单
    sendOrderQuery:(data)=>{
        return instance({
            method: 'post',
            url: '/trade/salary/order/orderQuery',
            data,
        })
    },
    //待发订单的属性列表
    attributeList:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/salary/order/attributeList',
            params,
        })
    },
    // 首页任务列表
    taskList:(params)=>{
      return instance({
        method: 'get' ,
        url: '/biz-center/task/list',
        params
      })
    },
    // 结束任务
    endtask:(params)=>{
      return instance({
        method: 'get' ,
        url: '/biz-center/task/finishOneTask',
        params
      })
    },
    // 首页任务列表
    taskSetting:(params)=>{
      return instance({
        method: 'get' ,
        url: '/biz-center/task/setting',
        params
      })
    },
    // 任务详情
    getTaskdetails:(params) => {
      return instance({
        method: 'get',
        url: '/biz-center/task/detail',
        params
      })
    },
    // 创建任务
      // 获取合作伙伴
      getPartnerList:(params)=>{
        return instance({
          method: 'get' ,
          url: '/user-center/partner/getPartnerList',
          params
        })
      },
      //标签列表
      customerIndustry: (params) => {
        return instance({
            method: 'get',
            url: '/orgrimar/customer/industry/customerIndustry',
            params,
        })
      },
      // 计量单位
      getByCodeAndLevel: (params) => {
        return instance({
            method: 'get',
            url: 'orgrimar/dictionary/getByCodeAndLevel',
            params,
        })
        // ?code=pieceUnit&level=1
      },
      getschedulinglist: (data)=>{
        return instance({
          method:'post',
          url:'/biz-center/scheduling/b/list',
          data,
        })
      }
};
export default {
    install: function(Vue) {
        Object.defineProperty(Vue.prototype, 'ApiLists' , { value: _apiLists });
    }	
};