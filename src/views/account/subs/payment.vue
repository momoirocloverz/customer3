<template>
  <div class="accountMaPaymentCon">
      <div class="setWidth">
            <el-form :model="currentForm" status-icon :rules="currentRules" ref="currentForm" label-width="140px" label-position="left" >
                <el-form-item label="手机号码">
                    <div class="mobile">{{ mobile }}</div>
                </el-form-item>
                <el-form-item prop="sms" label="验证码">
                    <el-input v-model.trim="currentForm.sms" placeholder="请输入验证码" autocomplete	="new-password" class="limitWidth" maxlength="6"></el-input >
                    <el-button type="button" size="small" class="sent-btn" @click="sendCode" :disabled="isSendSms">{{buttonText}}</el-button>
                    <span class="countIng" v-if="provideCDShow">{{provideCountTime}}s后重新获取</span>
                </el-form-item>
                <el-form-item label="支付密码" prop="password">
                    <el-input  type="password" v-model.trim="currentForm.password" size="small" show-password placeholder="请输入登录密码" maxlength="20" autocomplete	="new-password" class="limitWidth"></el-input>
                </el-form-item>
                <el-form-item label="重复支付密码" prop="repeatPassword">
                    <el-input  type="password" v-model.trim="currentForm.repeatPassword" size="small" show-password placeholder="请输入登录密码" maxlength="20" autocomplete="new-password" class="limitWidth"></el-input>
                </el-form-item>
                <div class="padLeft">
                    <el-button type="primary" size="mini" @click="submit('currentForm')" :disabled="disabled3">确认提交</el-button>
                </div>
            </el-form>
        </div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'accountMaPayment',
  data() {
      var validateRepeat = (rule, value, callback) => {
          if (value !== this.currentForm.password) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      };
    return {
        disabled3:false,
        buttonText:'获取验证码',
        isSendSms:false,
        provideCDShow:false,
        provideCountTime:60,
        mobile:'',
        currentForm:{
            sms:"",
            password:"",
            repeatPassword:'',
        },
        currentRules:{
            sms:[
                { required: true, message: '请输入短信验证码', trigger: 'blur' },
            ],
            password:[
                { required: true, message: '请输入支付密码', trigger: 'blur' },
            ],
            repeatPassword:[
                { required: true, message: '请重复输入支付密码', trigger: 'blur' },
                { validator: validateRepeat, trigger: 'blur' }
            ]
        },
    }
  },
    computed:{
        ...mapGetters([
            'getWebInfo',
        ]),
    },
  mounted(){
      this.initAction();
  },
  methods: {
      requestAction(){
          let data = {
              cusId:this.getWebInfo.customerId,
              code:this.currentForm.sms,
              password:this.currentForm.password,
              confirmPassword:this.currentForm.repeatPassword,
          };
          this.disabled3 = true;
          this.ApiLists.setPasswordCus(data).then(res => {
              let { respCode } = res;
              if( respCode == 0 ){
                  this.$message({
                      message: '设置密码成功',
                      type: 'success'
                  });
                  this.$refs['currentForm'].resetFields();
              }
          }).catch(err=>{
                console.log('err',err);
          }).finally(()=>{
              setTimeout(()=>{
                  this.disabled3 = false;
              },500);
          })
      },
      initAction(){
          let first = this.getWebInfo.mobile.slice(0,3);
          let second = this.getWebInfo.mobile.slice(3,7);
          let third = this.getWebInfo.mobile.slice(7,11);          
          this.mobile = `${first} ${second} ${third}`;
      },
      submit(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  console.log('submit!');
                  this.requestAction();
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      sendCode(){
          this.provideCDShow = true;                
          this.isSendSms = true;
          this.provideCountTime = 60;
          let params = {
              mobile:this.getWebInfo.mobile,
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
                          this.isSendSms = false;
                          clearInterval( window.timer4 );
                      }
                  },1000);
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
  }
}
</script>
<style lang="scss" scoped>
    .accountMaPaymentCon {
        height:500px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
        border-radius:8px;
        padding: 40px;
        box-sizing: border-box;
        .padLeft {
            padding-left: 140px;
        }
        .sent-btn{
            color: #409EFF;
            font-size: 14px;
            border: none;
            background-color: transparent;
            &.is-disabled {
                color: #909399;
            }
        }
        .countIng {
            margin-left: 10px;
            color: #909399;
        }
        .setWidth {
            width: 640px;
        }
        .limitWidth {
            width: 240px;
        }
        .mobile {
            color: #606266;
            font-size: 14px;
        }
    }
</style>