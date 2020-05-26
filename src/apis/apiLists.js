import instance from './axios';
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
    // 员工收入列表总和
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
    // 员工收入列表总和已发
    getAlready:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/list/already',
            params,
        })
    },
    // 员工收入列表总和已发按人汇总
    getByPopAlready:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/listByPop/already',
            params,
        })
    },
    // 员工收入列表总和 查看详情
    getListByTalentId:(params)=>{
        return instance({
            method: 'get',
            url: '/trade/b/salary/listByTalentId',
            params,
        })
    },
    // 员工收入列表总和已发 查看详情
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
    // 获取员工列表
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
};
export default {
    install: function(Vue) {
        Object.defineProperty(Vue.prototype, 'ApiLists' , { value: _apiLists });
    }	
};