<template>
  <div class="accountMaLoginCon">
        <div class="setWidth">
            <el-form :model="currentForm" status-icon :rules="currentRules" ref="currentForm" label-width="100px" label-position="left" >
                <el-form-item label="手机号码">
                    <div class="mobile">{{ mobile }}</div>
                </el-form-item>
                <el-form-item prop="sms" label="验证码">
                    <el-input v-model.trim="currentForm.sms" placeholder="请输入验证码" autocomplete	="new-password" class="limitWidth" maxlength="6"></el-input >
                    <el-button type="button" size="small" class="sent-btn" @click="sendCode" :disabled="isSendSms">{{buttonText}}</el-button>
                    <span class="countIng" v-if="provideCDShow">{{provideCountTime}}s后重新获取</span>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input  type="password" v-model.trim="currentForm.password" size="small" show-password placeholder="请输入登录密码" maxlength="20" autocomplete	="new-password" class="limitWidth"></el-input>
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
  name: 'accountMaLogin',
  data() {
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
        },
        currentRules:{
            sms:[
                { required: true, message: '请输入短信验证码', trigger: 'blur' },
            ],
            password:[
                { required: true, message: '请输入登录密码', trigger: 'blur' },
            ],
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
          let params = {
              mobile:this.getWebInfo.mobile,
              code:this.currentForm.sms,
              password:this.currentForm.password,
          };
          this.disabled3 = true;
          this.ApiLists.userSetPassWord(params).then(res=>{
              let { respCode } = res;
              if( respCode === 0 ){
                  this.$message({
                      message: '登录密码修改成功',
                      type: 'success'
                  });
                  this.$refs['currentForm'].resetFields();
              }else{
              }
          }).catch(err=>{
              console.log('err',err);
          }).finally(()=>{
              setTimeout(()=>{
                  this.disabled3 = false;
              },500);
          })
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
      initAction(){
          let first = this.getWebInfo.mobile.slice(0,3);
          let second = this.getWebInfo.mobile.slice(3,7);
          let third = this.getWebInfo.mobile.slice(7,11);          
          this.mobile = `${first} ${second} ${third}`;
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
    .accountMaLoginCon {
        height:500px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
        border-radius:8px;
        padding: 40px;
        box-sizing: border-box;
        .padLeft {
            padding-left: 100px;
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