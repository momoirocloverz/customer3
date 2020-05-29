<template>
    <div class="statusMasterCon" v-loading="loading">
        <div class="topPart">
            <div class="orderNo">
                <span>订单</span><span>{{ orderNo }}</span>
            </div>
            <div class="orderStatusBlock">
                <div>
                    <div class="flexStart blackText sixteenFont mb20">
                        <div>订单状态：</div>
                        <div class="statusText" :class="{yellowText:orderStatus == '1',redText:orderStatus == '2' || '6' ,greenText:orderStatus == '5',greyText:orderStatus == '7'}">{{ statusMap[orderStatus] }}<span v-if="orderStatus == '2'">（{{ countDownText }}后自动取消订单）</span></div>
                    </div>
                    <div v-if="orderStatus == '2'">
                        <div class="flexStart greyText fourteenFont" >
                            <div class="flexStart mr20" >
                                <div>发放方式：</div>
                                <div>{{ payTypeMap[payType] }}</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>发放人数：</div>
                                <div>{{status2orderPop}}人</div>
                            </div>
                            <div class="flexStart" v-show="payType == 1">
                                <div>无需账户支出</div>
                            </div>
                        </div>
                        <div class="flexStart greyText fourteenFont mt10" v-show="payType == 2">
                            <div class="flexStart mr20" >
                                <div>管理费账户支付：</div>
                                <div>{{status2SpObj.managerFee }}元</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>平台信息费合计：</div>
                                <div>{{status2SpObj.cusServiceFee}}元</div>
                            </div>
                            <div class="flexStart">
                                <div>付款手续费合计：</div>
                                <div>{{status2SpObj.payMoney}}元</div>
                            </div>
                        </div>
                        <div class="flexStart greyText fourteenFont mt10" v-show="payType == 2">
                            <div class="flexStart mr20" >
                                <div>薪企云服账户支付：</div>
                                <div>{{status2SpObj.htAccountFee }}元</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>信息服务费合计：</div>
                                <div>{{status2SpObj.serviceFee}}元</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>个人所得税合计：</div>
                                <div>{{status2SpObj.tax}}元</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>实发收入合计：</div>
                                <div>{{status2SpObj.salaryTotal}}元</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="orderStatus == '6'">
                        <div class="flexStart greyText fourteenFont">
                            <div class="flexStart mr20" >
                                <div>发放方式：</div>
                                <div>{{ payTypeMap[payType] }}</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>发放人数：</div>
                                <div>{{status6orderPop}}人</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="orderStatus == '7'">
                        <div class="flexStart greyText fourteenFont">
                            <div class="flexStart mr20" v-show="show7Text">
                                <div>发放方式：</div>
                                <div>{{ payTypeMap[payType] }}</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>发放人数：</div>
                                <div>{{status7orderPop}}人</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="orderStatus == '5'">
                        <div class="flexStart greyText fourteenFont">
                            <div class="flexStart mr20" >
                                <div>发放方式：</div>
                                <div>{{ payTypeMap[payType] }}</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>发放人数：</div>
                                <div>{{status5orderPop}}人</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>发放成功人数：</div>
                                <div>{{status5successPop}}人</div>
                            </div>
                            <div class="flexStart" v-show="payType == 1">
                                <div>无账户支出</div>
                            </div>
                        </div>
                        <div class="flexStart greyText fourteenFont mt10" v-show="payType == 2">
                            <div class="flexStart mr20" >
                                <div>管理费账户支付：</div>
                                <div>{{status5SpObj.managerFee }}元</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>平台信息费合计：</div>
                                <div>{{status5SpObj.cusServiceFee}}元</div>
                            </div>
                            <div class="flexStart">
                                <div>付款手续费合计：</div>
                                <div>{{status5SpObj.payMoney}}元</div>
                            </div>
                        </div>
                        <div class="flexStart greyText fourteenFont mt10" v-show="payType == 2">
                            
                            <div class="flexStart mr20" >
                                <div>薪企云服账户支付：</div>
                                <div>{{status5SpObj.htAccountFee }}元</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>信息服务费合计：</div>
                                <div>{{status5SpObj.serviceFee}}元</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>个人所得税合计：</div>
                                <div>{{status5SpObj.tax}}元</div>
                            </div>
                            <div class="flexStart mr20">
                                <div>实发收入合计：</div>
                                <div>{{status5SpObj.salaryTotal}}元</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="orderStatus == '1'">
                        <div class="flexStart greyText fourteenFont" >
                            <div class="flexStart mr20">
                                <div>发放人数：</div>
                                <div>{{status1orderPop}}人</div>
                            </div>    
                        </div>
                    </div> 
                    <div v-if="orderStatus == '3'">
                        <div class="flexStart greyText fourteenFont" >
                            <div class="flexStart mr20">
                                <div>发放方式：</div>
                                <div>{{ payTypeMap[payType] }}</div>
                            </div>  
                            <div class="flexStart mr20">
                                <div>发放人数：</div>
                                <div>{{status3orderPop}}人</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="blockBtnCon" v-if="orderStatus == '2'  || orderStatus == '1' ">
                        <el-button size="small" @click="popCancel">取消订单</el-button>
                        <el-button type="primary" size="small" @click="toIssue">{{ orderStatus == '2' ?'去付款':'去发放' }}</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomPart">
            <ToBeIssued v-if="orderStatus == '1'" />
            <PendingPayment v-if="orderStatus == '2'" />
            <Wip v-if="orderStatus == '3'"/>
            <IssueComplete v-if="orderStatus == '5'"/>
            <Cancelled v-if="orderStatus == '7'"/>
            <Failed v-if="orderStatus == '6'"/>
        </div>
        <el-dialog title="选择发放方式" class="setRootScoped setMiddleDialog" :class="{resetDialogHeight:!payTypeInfoArray.length}" :visible.sync="issueVisible" width="500px" :close-on-click-modal="false" border>
            <div>
                <el-form :model="issueForm" ref="issueForm" label-width="120px" class="demo-ruleForm">
                    <div class="stableHeight" :class="{reBootHeight:!payTypeInfoArray.length}">
                        <div class="mb20">
                            <div class="inputOuter notActive" :class="{activePaytype:selectNow == 1}" @click="selectNow = 1">
                                <img class="setImg" v-if="selectNow == 1" :src="pic1Src">
                                <img class="setImg" v-else :src="pic1SrcNot">
                                <div class="ml20">
                                    <div class="unableText">线下发放</div>
                                    <div>无需其他费用，可导出待付订单后自行线下发放</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="thirtyMargin" v-if="payTypeInfoArray.length">
                            <div class="inputOuter notActive" :class="{activePaytype:selectNow == 2}" @click="selectNow = 2">
                                <img class="setImg" v-if="selectNow == 2" :src="pic2SrcIs">
                                <img class="setImg" v-else :src="pic2Src">
                                <div class="ml20">
                                    <div class="unableText">线上发放</div>
                                    <div>通过薪企云服发放</div>
                                    <div>需收取<br/>
                                        付款手续费：{{payTypeInfoArray[0].payMoney}}元/人，<span v-if="payTypeInfoArray[0].ifTalentPay">从人员收入中扣款</span><span v-else>不从人员收入中扣款</span><br/>
                                        平台信息费：应发收入的{{payTypeInfoArray[0].cusRate}}%<br/>
                                        信息服务费：应发发收入{{payTypeInfoArray[0].rate}}%<br/>
                                        个税：超出30000元/月/人会产生个人所得税<br/>
                                        支付成功后冻结金额，按实际发放情况收费，发放失败将解冻相应费用</div>
                                </div>
                            </div>
                        </div>
                        <div class="thirtyMargin" v-else>
                            <div class="inputOuter notActive unableClick">
                                <img class="setImg" :src="pic2Src">
                                <div class="ml20">
                                    <div class="unableText">线上发放</div>
                                    <div>您暂未开通线上发放功能，如需开通，请联系市场人员。</div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div class="flexHere">
                        <el-button type="info" size="small" class="sameWidthBtn"  @click="cancelForm('issueForm')">取 消</el-button>
                        <el-button type="primary" size="small" class="sameWidthBtn" @click="submitForm('issueForm')" :disabled="disabled1">确认，生成待付款订单</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="确认支付" class="setRoot2Scoped setMiddleDialog"  :visible.sync="provideVisible" :class="{payActionResetHeight:payType == 2}" width="480px" :close-on-click-modal="false" border>
            <div>
                <el-form :model="provideForm" label-position="left" ref="provideForm" label-width="120px" class="demo-ruleForm" :rules="provideRules" key="4">
                    <div>
                        <div class="bottomLine mb20 boomBlock">
                            <div v-if="payType == 1">
                                <el-form-item label="订单号" class="resetMargin">
                                    <div class="resetHeight">{{orderNo}}</div>
                                </el-form-item>
                                <el-form-item label="发放方式" class="resetMargin">
                                    <div class="resetHeight">线下发放</div>
                                </el-form-item>
                                <el-form-item label="发放人数" class="resetMargin">
                                    <div class="resetHeight">{{status2orderPop}}人</div>
                                </el-form-item>
                            </div>
                            <div v-else>
                                <el-form-item label="订单号" class="resetMargin">
                                    <div class="resetHeight">{{orderNo}}</div>
                                </el-form-item>
                                <el-form-item label="发放方式" class="resetMargin">
                                    <div class="resetHeight">{{ payTypeMap[payType] }}</div>
                                </el-form-item>
                                <div class="resetMargin fakeMargin">
                                    <div class="">
                                        <div class="flexSub mb10">
                                            <div>
                                                管理费账户支付
                                            </div>
                                            <div>{{statusBridgeObj.managerFee}}元</div>
                                        </div>
                                        <div class="mb10">
                                             平台信息费合计{{statusBridgeObj.cusServiceFee}}元
                                        </div>
                                        <div class="mb10">
                                             付款手续费合计{{statusBridgeObj.payMoney}}元 
                                        </div>
                                    </div>
                                </div>
                                <div class="resetMargin fakeMargin">
                                    <div class="">
                                        <div class="flexSub mb10">
                                            <div>
                                                薪企云服账户支付
                                            </div>
                                            <div>{{statusBridgeObj.htAccountFee }}元</div>
                                        </div>
                                        <div class="mb10">
                                              信息服务费合计{{statusBridgeObj.serviceFee}}元
                                        </div>
                                        <div class="mb10">
                                              个人所得税合计{{statusBridgeObj.tax}}元 
                                        </div>
                                        <div class="mb10">  
                                            实发收入合计{{statusBridgeObj.salaryTotal}}元
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="flexInner" v-if="payType == 2">
                                <div>薪企云服账户余额</div>
                                <div>{{balanceBridge}}元</div>
                            </div>
                            <div class="flexInner" v-if="payType == 2">
                                <div>管理费账户可用余额</div>
                                <div>{{anotherBalanceBridge}}元</div>
                            </div>
                            <el-form-item label="支付密码" prop="pass">
                                <div class="resetHeight">
                                    <el-input v-model.trim="provideForm.pass" size="small" class="lockItemInput" placeholder="请输入6位支付密码" maxLength="6" show-password></el-input>
                                    <el-button class="ml20" type="text" size="small" @click="popReset">重置</el-button>
                                </div>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <div class="resetHeight">
                                    <span>{{phoneNumber}}</span>
                                    <el-button class="ml20" type="text" size="small":disabled="provideDisabled" @click="sendSms1">获取短信验证码</el-button>
                                    <span class="ml20" v-if="provideCDShow">{{provideCountTime}}s</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="短信验证码" prop="sms">
                                <el-input v-model.trim="provideForm.sms" size="small" class="lockItemInput " placeholder="请输入短信验证码" maxLength="6"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flexHere">
                        <el-button type="info" size="small" class="sameWidthBtn"  @click="cancelProvideForm('provideForm')">取 消</el-button>
                        <el-button type="primary" size="small" class="sameWidthBtn"  :disabled="disabled2" @click="submitProvideForm('provideForm')">确认支付</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog :title=" hasPassword ?  '重置支付密码' :'设置支付密码' " class="setRoot3Scoped setMiddleDialog"  :visible.sync="resetVisible" width="480px" :close-on-click-modal="false" border>
            <div>
                <el-form :model="resetForm" label-position="left" ref="resetForm" label-width="120px" class="demo-ruleForm" :rules="resetRules" key="5">
                    <div>
                            <el-form-item label="手机号码">
                                <div class="resetHeight">
                                    <span>{{phoneNumber}}</span>
                                    <el-button class="ml20" type="text" size="small" :disabled="resetDisabled" @click="sendSms2">获取短信验证码</el-button>
                                    <span class="ml20" v-if="resetCDShow">{{resetCountTime}}s</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="短信验证码" prop="sms">
                                <el-input v-model="resetForm.sms" size="small" class="lockItemInput2 resetHeight" placeholder="请输入短信验证码" maxLength="6"></el-input>
                        </el-form-item>
                        <el-form-item label="支付密码" prop="pass">
                                <el-input v-model="resetForm.pass" size="small" class="lockItemInput2 resetHeight" placeholder="请输入6位支付密码" maxLength="6" show-password></el-input>
                            </el-form-item>
                        <el-form-item label="重复支付密码" prop="repeatPass">
                                <el-input v-model="resetForm.repeatPass" size="small" class="lockItemInput2 resetHeight" placeholder="请重复输入6位支付密码" maxLength="6" show-password></el-input>
                            </el-form-item>
                    </div>
                    <div class="flexHere">
                        <el-button type="info" size="small" class="sameWidthBtn"  @click="cancelResetForm('resetForm')">取 消</el-button>
                        <el-button type="primary" size="small" class="sameWidthBtn"  :disabled="disabled3"  @click="submitResetForm('resetForm')">确认修改</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="确认取消订单" class="setRoot4Scoped setMiddleDialog"  :visible.sync="cancelVisible" width="420px" :close-on-click-modal="false" border> 
            <div style="margin-bottom:10px;">
                <div style="margin-bottom:5px;">确定取消订单<span style="color:#F56C6C">{{orderNo}}</span></div>
                <div>取消后，该订单中的收入明细将解冻，可重新选择生成新待发放订单。</div>
            </div>
            <div class="flexHere">
                <el-button type="info" size="small" class="sameWidthBtn"  @click="cancelCurrentOrder">取 消</el-button>
                <el-button type="primary" size="small" class="sameWidthBtn" @click="submitCurrentOrder"  :disabled="disabled4" >确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="支付成功，系统发放中" class="setRoot5Scoped setMiddleDialog"  :visible.sync="wipVisible" width="420px" :close-on-click-modal="false" border center> 
            <div style="margin-bottom:10px;">
                <div>管理费账户支付金额已冻结，如发放失败将自动解冻。<br/>订单状态已处于支付中，系统将自动进行发放，请耐心等待发放完成。<br/>订单发放进度可查看订单详情（请手动刷新）。</div>
            </div>
            <div class="flexHere">
                <el-button type="info" size="small" class="sameWidthBtn"  @click="checkWipDetail">查看订单详情</el-button>
                <el-button type="primary" size="small" class="sameWidthBtn" @click="checkAllWip">查看所有订单</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ToBeIssued from './toBeIssued/toBeIssuedMaster.vue';
    import PendingPayment from './pendingPayment/pendingPaymentMaster.vue';
    import IssueComplete from './success/completeMaster.vue';   
    import Failed from './fail/failed.vue';
    import Cancelled from './cancelled.vue';
    import Wip from './wip.vue';
    export default {
        name: 'statusMaster',
        components:{
            ToBeIssued,
            PendingPayment,
            IssueComplete,
            Failed,
            Cancelled,
            Wip
        },
        data() {
            var validateRepeatPass = (rule, value, callback) => {
                if( value == this.resetForm.pass ){
                    callback();
                }else{
                    callback(new Error('重复密码与密码不一致'));
                }
            };
            var validateSms = (rule, value, callback) => {
                let reg = /[0-9]{6}/g;
                if( reg.test(value) ){
                    callback();
                }else{
                    callback(new Error('请输入6位数字'));
                }
            };
            return {
                balanceBridge:0,
                anotherBalanceBridge:0,
                payTypeInfoArray:[],
                payTypeMap:{
                    1:'线下发放',
                    2:'线上发放-薪企云服',
                },
                payType:1,
                selectNow:1,
                disabled4:false,
                disabled3:false,
                disabled2:false,
                disabled1:false,
                loading: false,
                cancelVisible:false,
                pic1Src:require('@/assets/offline_active.svg'),
                pic2Src:require('@/assets/online_normal.png'),
                pic1SrcNot:require('@/assets/offline_normal.svg'),
                pic2SrcIs:require('@/assets/online_active.png'),
                radio:'1',
                orderId:'',
                orderNo:'',
                orderStatus:'',
                statusMap:{
                    1:'待发放',
                    2:'待付款',
                    3:'发放中',
                    5:'发放完成',
                    6:'发放失败',
                    7:'已取消'
                },
                status3orderPop:0,
                status1orderPop:0,
                status2orderPop:0,
                statusBridgeObj:{
                    managerFee:0,
                    payMoney:0,
                    cusServiceFee:0,
                    htAccountFee:0,
                    serviceFee:0,
                    tax:0,
                    salaryTotal:0,
                },
                status2SpObj:{
                    managerFee:0,
                    payMoney:0,
                    cusServiceFee:0,
                    htAccountFee:0,
                    serviceFee:0,
                    tax:0,
                    salaryTotal:0,
                },
                countDownTime:123123,
                countDownText:'00:00',
                status7orderPop:0,
                status7orderSalary:0,
                status6orderPop:0,
                status6successPop:0,
                status6orderSalary:0,
                status6successSalary:0,
                status5orderPop:0,
                status5successPop:0,
                status5SpObj:{
                    managerFee:0,
                    payMoney:0,
                    cusServiceFee:0,
                    htAccountFee:0,
                    serviceFee:0,
                    tax:0,
                    salaryTotal:0,
                },
                show7Text:false,
                issueVisible:false,
                issueForm:{
                },
                provideVisible:false,
                wipVisible:false,
                provideForm:{
                    pass:"",
                    sms:'',
                },
                provideRules:{
                    pass:[
                        { required: true, message: '支付密码不能为空', trigger: 'blur' },
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    sms:[
                        { required: true, message: '短信验证码不能为空', trigger: 'blur' },
                        { validator: validateSms, trigger: 'blur' }
                    ],
                },
                resetVisible:false,
                resetForm:{
                    sms:'',
                    pass:'',
                    repeatPass:'',
                },
                resetRules:{
                    sms:[
                        { required: true, message: '短信验证码不能为空', trigger: 'blur' },
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    pass:[
                        { required: true, message: '支付密码不能为空', trigger: 'blur' },
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    repeatPass:[
                        { required: true, message: '重复支付密码不能为空', trigger: 'blur' },
                        { validator: validateRepeatPass, trigger: 'blur' }
                    ],
                },
                resetCDShow:false,
                resetDisabled:false,
                resetCountTime:60,
                phoneNumber:'',
                provideDisabled:false,
                provideCDShow:false,
                provideCountTime:60,
                hasPassword:false,
            }
        },
        mounted(){
            this.analyseQuery();
            this.getMasterInfo(); 
        },
        beforeDestroy(){
            clearInterval( window.timerHead );
            this.cancelVisible = false;
        },
        methods: {
            getHanTangInfo(){
                this.ApiLists.hantangAccount().then(res => {
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        if( data&& ('id' in data) ){
                            this.payTypeInfoArray = [ data ];
                        }else{
                            this.payTypeInfoArray = [];
                        }
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            checkWipDetail(){
                this.wipVisible = false;
            },
            checkAllWip(){
                this.wipVisible = false;
                sessionStorage.removeItem('firstItem1');
                sessionStorage.removeItem('firstItem2');
                sessionStorage.removeItem('secondItem1');
                sessionStorage.removeItem('secondItem2'); 
                sessionStorage.removeItem('secondItem3'); 
                sessionStorage.removeItem('secondItem4');
                sessionStorage.removeItem('tabSwitch');
                sessionStorage.removeItem('tabSwitch2'); 
                this.$router.push({
                    path:'/main/provideMaster'
                });
                this.$store.commit('changeMenuActiveIndex', '2');
            },
            cancelCurrentOrder(){
                this.cancelVisible = false;
            },
            submitCurrentOrder(){
                this.disabled4 = true;
                let data = {
                        orderId:this.orderId,
                        oldStatus:this.orderStatus,
                    };
                    this.ApiLists.orderCancelOrder(data).then(res => {
                        let { respCode,data } = res;
                        if( respCode == 0 ){
                            this.$message({
                                type: 'success',
                                message: '该订单已取消成功!'
                            });
                            sessionStorage.removeItem('firstItem1');
                            sessionStorage.removeItem('firstItem2');
                            sessionStorage.removeItem('secondItem1');
                            sessionStorage.removeItem('secondItem2'); 
                            sessionStorage.removeItem('secondItem3'); 
                            sessionStorage.removeItem('secondItem4');
                            sessionStorage.removeItem('tabSwitch');
                            sessionStorage.removeItem('tabSwitch2'); 
                            this.$router.push({
                                path:'/main/provideMaster'
                            });
                            this.$store.commit('changeMenuActiveIndex', '2');
                        }
                    }).catch(err=>{
                        console.log('err',err);
                    }).finally(()=>{
                        setTimeout(()=>{
                            this.disabled4 = false;
                        },500);
                    })
            },
            popCancel(){
                this.cancelVisible = true;
            },
            sendSms1(){
                this.provideCDShow = true;                
                this.provideDisabled = true;
                this.provideCountTime = 60;
                let params = {
                    mobile:this.phoneNumber,
                };
                this.ApiLists.getSmsCode(params).then(res => {
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.$message({
                            message: '短信发送成功',
                            type: 'success'
                        });
                        window.timer4 = setInterval(()=>{
                            this.provideCountTime--;
                            if( this.provideCountTime == 0 ){
                                this.provideCDShow = false;
                                this.provideDisabled = false;
                                clearInterval( window.timer4 );
                            }
                        },1000);
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            sendSms2(){
                this.resetCDShow = true;                
                this.resetDisabled = true;
                this.resetCountTime = 60;
                let params = {
                    mobile:this.phoneNumber,
                };
                this.ApiLists.getSmsCode(params).then(res => {
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.$message({
                            message: '短信发送成功',
                            type: 'success'
                        });
                        window.timer5 = setInterval(()=>{
                            this.resetCountTime--;
                            if( this.resetCountTime == 0 ){
                                this.resetCDShow = false;
                                this.resetDisabled = false;
                                clearInterval( window.timer5 );
                            }
                        },1000);
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            popReset(){
                clearInterval( window.timer5 );    
                this.resetDisabled = false;
                this.resetCDShow = false;
                this.resetCountTime = 60;                
                this.resetVisible = true;
                this.$nextTick(()=>{
                    this.$refs.resetForm.resetFields();
                }) 
            },
            cancelResetForm(formName){
                this.$refs[formName].resetFields();
                this.resetVisible = false;
            },
            submitResetForm(formName){
                 this.disabled3 = true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            cusId:this.$store.getters.getWebInfo.customerId,
                            code:this.resetForm.sms,
                            password:this.resetForm.pass,
                            confirmPassword:this.resetForm.repeatPass,
                        };
                        this.ApiLists.setPasswordCus(data).then(res => {
                            let { respCode } = res;
                            if( respCode == 0 ){
                                this.$message({
                                    message: '设置密码成功',
                                    type: 'success'
                                });
                                this.analyseQuery();
                                this.resetVisible = false;
                            }
                        }).catch(err=>{
                            console.log('err',err);
                        }).finally(()=>{
                            setTimeout(()=>{
                                this.disabled3 = false;
                            },500);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancelProvideForm(formName){
                this.$refs[formName].resetFields();
                this.provideVisible = false;
            },
            payOfflineAction(data){
                this.disabled2 = true;
                this.ApiLists.orderPayAction(data).then(res=>{
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.$message({
                            message: '订单付款成功',
                            type: 'success'
                        });
                        sessionStorage.removeItem('firstItem1');
                        sessionStorage.removeItem('firstItem2');
                        sessionStorage.removeItem('secondItem1');
                        sessionStorage.removeItem('secondItem2'); 
                        sessionStorage.removeItem('secondItem3'); 
                        sessionStorage.removeItem('secondItem4');
                        sessionStorage.removeItem('tabSwitch');
                        sessionStorage.removeItem('tabSwitch2'); 
                        this.provideVisible = false;
                        this.$router.push({
                            path:'/main/provideMaster'
                        });
                        this.$store.commit('changeMenuActiveIndex', '2')
                    }
                }).catch(err=>{
                    console.log('err',err);
                }).finally(()=>{
                    setTimeout(()=>{
                        this.disabled2 = false;
                    },500);
                })
            },
            payOnlineAction(data){
                this.disabled2 = true;
                this.ApiLists.salaryOrderHtPay(data).then(res=>{
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.$message({
                            message: '订单付款成功',
                            type: 'success'
                        });        
                        this.provideVisible = false;
                        this.wipVisible = true;
                    }
                }).catch(err=>{
                    console.log('err',err);
                }).finally(()=>{
                    setTimeout(()=>{
                        this.disabled2 = false;
                    },500);
                })
            },
            submitProvideForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            orderId:this.orderId,
                            payPasswd:this.provideForm.pass,
                            vildCode:this.provideForm.sms,
                        };
                        if(this.payType == 1){
                            this.payOfflineAction(data);
                        }
                        if(this.payType == 2){
                            this.payOnlineAction(data);
                        }
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            generateOfflineOrder(){
                let data = {
                    orderId:this.orderId,
                    payWay:this.selectNow
                };
                this.ApiLists.payUnderLine(data).then(res => {
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.$message({
                            message: '生成待付款订单成功',
                            type: 'success'
                        });
                        this.issueVisible = false;
                        this.getMasterInfo();
                    }
                }).catch(err=>{
                    console.log('err',err);
                }).finally(()=>{
                    setTimeout(()=>{
                        this.disabled1 = false;
                    },500);
                })
            },
            generateOnlineOrder(){
                let data = {
                    orderId:this.orderId,
                    payWay:this.selectNow
                };
                this.ApiLists.PayHanTang(data).then(res => {
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.$message({
                            message: '生成待付款订单成功',
                            type: 'success'
                        });
                        this.issueVisible = false;
                        this.getMasterInfo();
                    }
                }).catch(err=>{
                    console.log('err',err);
                }).finally(()=>{
                    setTimeout(()=>{
                        this.disabled1 = false;
                    },500);
                })
            },
            submitForm(){
                this.disabled1 = true;
                if(this.selectNow == 1){
                    this.generateOfflineOrder();
                }
                if(this.selectNow == 2){
                    this.generateOnlineOrder();
                }
            },
            cancelForm(){
                this.issueVisible = false;
            },
            getMasterInfo(){
                /*this.orderStatus = 3;
                this.payType = 2;*/
                this.loading = true;
                this.getHanTangInfo();
                let params = {
                    orderId:this.orderId
                };
                this.ApiLists.payOrderTitle(params).then(res => {
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.orderNo = data.orderNo;
                        this.orderStatus = data.status;
                        this.payType = data.payWay;
                        switch( this.orderStatus ){
                            case 1:
                                this.status1orderPop = data.orderPop || 0;
                                break;
                            case 2:
                                this.status2orderPop = data.orderPop|| 0;
                                if( data.salaryOrderTypeTotalVO ){
                                    let simple = data.salaryOrderTypeTotalVO;
                                    this.status2SpObj = {
                                        managerFee: simple.managerFee || 0,
                                        payMoney:simple.payMoney || 0,
                                        cusServiceFee:simple.cusServiceFee || 0,
                                        htAccountFee:simple.htAccountFee || 0,
                                        serviceFee:simple.serviceFee || 0,
                                        tax:simple.tax || 0,
                                        salaryTotal:simple.salaryTotal || 0,
                                    };
                                    this.statusBridgeObj = {
                                        managerFee: simple.managerFee || 0,
                                        payMoney:simple.payMoney || 0,
                                        cusServiceFee:simple.cusServiceFee || 0,
                                        htAccountFee:simple.htAccountFee || 0,
                                        serviceFee:simple.serviceFee || 0,
                                        tax:simple.tax || 0,
                                        salaryTotal:simple.salaryTotal || 0,
                                    };
                                }
                                this.countDownTime = data.updatedAt;
                                let formatDate = new Date(this.countDownTime).getTime();
//                                let formatDate = new Date('2020-04-17 15:13:00').getTime();
                                let current = Date.now();
                                this.ApiLists.getCurrentTime().then(res=>{
                                    let { data,respCode } = res;
                                    if( respCode == 0 ){
                                        current = data;
                                    }
                                }).catch(err=>{
                                    console.log('err',err);
                                })
                                 window.timerHead = setInterval(()=>{
                                     current = current+1000;
                                     this.countDownText = this.Dayjs(  30*60*1000+formatDate -current   ).format('mm:ss');
                                    if( (30*60*1000+formatDate -current  == 0)||( 30*60*1000+formatDate -current  < 0 ) ){
                                        clearInterval( window.timerHead );
                                        this.countDownText = '00:00';
                                        let data = {
                                            orderId:this.orderId,
                                            oldStatus:this.orderStatus,
                                        };
                                        this.ApiLists.orderCancelOrder(data).then(res => {
                                            let { respCode,data } = res;
                                            if( respCode == 0 ){
                                                this.$message({
                                                    type: 'success',
                                                    message: '该订单已取消成功!'
                                                });
                                                sessionStorage.removeItem('firstItem1');
                                                sessionStorage.removeItem('firstItem2');
                                                sessionStorage.removeItem('secondItem1');  
                                                sessionStorage.removeItem('secondItem2'); 
                                                sessionStorage.removeItem('secondItem3'); 
                                                sessionStorage.removeItem('secondItem4');   
                                                sessionStorage.removeItem('tabSwitch');
                                                sessionStorage.removeItem('tabSwitch2'); 
                                                this.$router.push({
                                                    path:'/main/provideMaster'
                                                });
                                                 this.$store.commit('changeMenuActiveIndex', '2')
                                            }
                                        }).catch(err=>{
                                            console.log('err',err);
                                        })
                                        
                                        
                                    }
                                },1000);
                                break;  
                            case 3:
                                this.status3orderPop = data.orderPop || 0;
                                break;
                            case 5:
                                this.status5orderPop = data.orderPop || 0;
                                this.status5successPop = data.successPop || 0;
                                
                                if( data.salaryOrderTypeTotalVO ){
                                    let simple = data.salaryOrderTypeTotalVO;
                                    this.status5SpObj = {
                                        managerFee: simple.managerFee || 0,
                                        payMoney:simple.payMoney || 0,
                                        cusServiceFee:simple.cusServiceFee || 0,
                                        htAccountFee:simple.htAccountFee || 0,
                                        serviceFee:simple.serviceFee || 0,
                                        tax:simple.tax || 0,
                                        salaryTotal:simple.salaryTotal || 0,
                                    };
                                    this.statusBridgeObj = {
                                        managerFee: simple.managerFee || 0,
                                        payMoney:simple.payMoney || 0,
                                        cusServiceFee:simple.cusServiceFee || 0,
                                        htAccountFee:simple.htAccountFee || 0,
                                        serviceFee:simple.serviceFee || 0,
                                        tax:simple.tax || 0,
                                        salaryTotal:simple.salaryTotal || 0,
                                    };
                                }
                                break;    
                            case 6:
                                this.status6orderPop = data.orderPop || 0;
                                this.status6successPop = data.successPop || 0;
                                this.status6orderSalary = data.orderSalary || 0;
                                this.status6successSalary = data.successSalary || 0;
                                break;
                            case 7:
                                this.show7Text = !!data.payWay;
                                this.status7orderPop = data.orderPop|| 0;
                                this.status7orderSalary = data.orderSalary|| 0;
                                break;    
                        }
                    }
                }).catch(err=>{
                    console.log('err',err);
                }).finally(()=>{
                    this.loading = false;
                })
            },
            analyseQuery(){
                let { id } = this.$route.query;  
                this.orderId = String(id);
                this.phoneNumber = this.$store.getters.getWebInfo.mobile;
                let cusId = this.$store.getters.getWebInfo.customerId;
                let params = {
                    cusId
                };
                this.ApiLists.getCusAccountDetail(params).then(res=>{
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.hasPassword = data.hasSetPassword;
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            toIssue(){
                if( this.orderStatus == '2' ){
                    if(this.hasPassword){
                        clearInterval( window.timer4 );    
                        this.provideCDShow = false;                
                        this.provideDisabled = false;
                        this.provideCountTime = 60;
                        this.provideVisible = true;
                        this.balanceBridge = this.payTypeInfoArray[0].balance;
                        this.anotherBalanceBridge = this.payTypeInfoArray[0].managerBalance;
                        this.$nextTick(()=>{
                            this.$refs.provideForm.resetFields();
                        }) 
                    }else{
                        this.popReset();
                    }
                }else{
                    this.issueVisible = true;
                }
            },
        },
    }
</script>
<style scoped lang="scss">
    .statusMasterCon {
        .boomBlock {
            height: 120px;
            overflow-y: scroll;
        }
        .flexSub {
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
        }
        .flexInner {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            margin-bottom: 10px;
        }
        .fakeMargin {
            margin-left: 120px;
        }
        .topPart {
            margin-bottom: 30px;
        }
        .stableHeight {
            height:350px;
        }
        .reBootHeight {
            height:220px !important;
        }
        .orderNo {
            height:20px;
            font-size:20px;
            font-weight:500;
            color:#303133;
            line-height:20px;
            margin-bottom: 30px;
        }
        .lockItemInput {
            width: 160px;
        }
        .lockItemInput2 {
            width: 200px;
        }
        .bottomLine {
            border-bottom: 1px solid #DCDFE6;
            padding-bottom: 10px;
        }
        .resetMargin {
            margin-bottom: 4px;
        }
        .resetHeight {
            height: 32px;
            line-height: 32px;
        }
        .orderStatusBlock {
            box-sizing: border-box;
            padding: 30px 40px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            background-color: #fff;
            box-shadow:0px 2px 8px 0px rgba(0,0,0,0.05);
            border-radius:10px;            
        }
        .flexStart {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
        }
        .bottomPart {
            background-color: #fff;
            box-shadow:0px 2px 8px 0px rgba(0,0,0,0.05);
            border-radius:10px;
            padding: 30px 40px;
            box-sizing: border-box;
        }
        .blackText {
            color:#303133;
        }
        .yellowText {
            color: #E6A23C;
            font-weight: 400;
        }
        .redText {
            color: #F56C6C;
            font-weight: 400;
        }
        .greyText {
            color:#909399;
            font-weight: 400;
        }
        .greenText {
            color: #67C23A;
            font-weight: 400;
        }
        .sixteenFont {
            font-size: 16px;
            line-height: 16px;
        }
        .fourteenFont {
            font-size: 14px;
            line-height: 14px;
        }
        .inputOuter {
            min-height: 80px;
            display: flex;
            justify-content:flex-start;
            align-content: center;
            align-items: center;
            cursor: pointer;
        }
        .flexHere {
            display: flex;
            justify-content:flex-end;
        }
        .activePaytype {
            background:rgba(64,158,255,0.1) !important;
            border:1px solid #409EFF !important;
            color: #409eff !important;
        }
        .notActive {
            border:1px solid #DCDFE6;
            border-radius: 4px;
            padding: 20px;
            box-sizing: border-box;
            color: #C0C4CC;
        }
        .unableClick {
            cursor: not-allowed;
        }
        .setImg {
            width: 48px;
        }
        .unableText {
            font-size: 20px;
        }
        .thirtyMargin {
            margin-bottom: 30px;
        }
    }
</style>
<style lang="scss">
    .statusMasterCon {
        .setRootScoped {
            .el-dialog__body {
                padding: 20px;
            }
            .el-dialog {
                height: 480px;
                border-radius: 10px;
            }
        }
        .resetDialogHeight {
            .el-dialog {
                height: 350px !important;
            }
        }
        .setRoot5Scoped {
            .el-dialog {
                height: 200px;
                border-radius: 5px;
            }
            .el-dialog__body {
                padding: 10px 15px;
            }
        }
        .setRoot4Scoped {
            .el-dialog {
                height: 184px;
                border-radius: 5px;
            }
            .el-dialog__body {
                padding: 10px 15px;
            }
        }
        .setRoot3Scoped {
            .el-dialog__body {
                padding: 20px;
            }
            .el-dialog {
                height: 360px;
                border-radius: 10px;
            }
            .el-form-item__content {
                height: 32px;
                line-height: 32px;
            }
            .el-form-item__label {
                height: 32px;
                line-height: 32px;
            }
        }
        .payActionResetHeight {
            .el-dialog {
                height: 540px!important;
            }
        }
        .setRoot2Scoped {
            .el-form-item__content {
                height: 32px;
                line-height: 32px;
            }
            .el-form-item__label {
                height: 32px;
                line-height: 32px;
            }
            .el-dialog__body {
                padding: 20px;
            }
            .el-dialog {
                height: 440px;
                border-radius: 10px;
            }
        }
    }
</style>