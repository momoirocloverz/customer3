<template>
  <div class="accountMaPhoneCon">
      <div class="setWidth">
            <div v-if="initDisplay">
                <el-form :model="currentForm" status-icon :rules="currentRules" ref="currentForm" label-width="100px" label-position="left" >
                    <el-form-item label="手机号码">
                        <div class="mobile">{{ mobile }}</div>
                    </el-form-item>
                    <el-form-item prop="sms" label="验证码">
                        <el-input v-model.trim="currentForm.sms" placeholder="请输入验证码" autocomplete	="new-password" class="limitWidth" maxlength="6"></el-input >
                        <el-button type="button" size="small" class="sent-btn" @click="sendCode" :disabled="isSendSms">{{buttonText}}</el-button>
                        <span class="countIng" v-if="provideCDShow">{{provideCountTime}}s后重新获取</span>
                    </el-form-item>
                    <div class="padLeft">
                        <el-button type="primary" size="mini" @click="submit('currentForm')" :disabled="disabled3">下一步</el-button>
                    </div>
                </el-form>
            </div>
            <div v-else>
                <el-form :model="anotherForm" status-icon :rules="anotherRules" ref="anotherForm" label-width="100px" label-position="left" >
                    <el-form-item label="新手机号码" prop="mobile">
                        <el-input v-model.trim="anotherForm.mobile" placeholder="请输入新手机号码" autocomplete="new-password" class="limitWidth" maxlength="11"></el-input >
                    </el-form-item>
                    <el-form-item prop="sms" label="验证码">
                        <el-input v-model.trim="anotherForm.sms" placeholder="请输入验证码" autocomplete="new-password" class="limitWidth" maxlength="6"></el-input >
                        <el-button type="button" size="small" class="sent-btn" @click="sendAnoCode" :disabled="sendSms">{{anotherButtonText}}</el-button>
                        <span class="countIng" v-if="cdShow">{{countTime}}s后重新获取</span>
                    </el-form-item>
                    <div class="padLeft">
                        <el-button type="primary" size="mini" @click="submitAnother('anotherForm')" :disabled="disabled4">确认提交</el-button>
                    </div>
                </el-form>
            </div>
        </div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'accountMaPhone',
  data() {
    return {
        anotherRules:{
            sms:[
                { required: true, message: '请输入短信验证码', trigger: 'blur' },
            ],
            mobile:[
                { required: true, message: '请输入新手机号码', trigger: 'blur' },
            ]
        },
        anotherForm:{
            sms:'',
            mobile:'',
        },
        sendSms:false,
        anotherButtonText:'获取验证码',
        cdShow:false,
        countTime:60,
        disabled4:false,
        initDisplay:true,
        disabled3:false,
        buttonText:'获取验证码',
        isSendSms:false,
        provideCDShow:false,
        provideCountTime:60,
        mobile:'',
        currentForm:{
            sms:"",
        },
        currentRules:{
            sms:[
                { required: true, message: '请输入短信验证码', trigger: 'blur' },
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
      sendAnoCode(){
          this.cdShow = true;                
          this.sendSms = true;
          this.countTime = 60;
          let params = {
              mobile:this.anotherForm.mobile,
          };
          this.ApiLists.getSmsCode(params).then(res => {
              let { respCode,data } = res;
              if( respCode == 0 ){
                  this.$message({
                      message: '短信发送成功',
                      type: 'success'
                  });
                  window.timer5 = setInterval(()=>{
                      this.countTime--;
                      if( this.countTime == 0 ){
                          this.cdShow = false;
                          this.sendSms = false;
                          clearInterval( window.timer5 );
                      }
                  },1000);
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      requestAction(){
          let params = {
              mobile:this.getWebInfo.mobile,
              code:this.currentForm.sms,
          };
          this.disabled3 = true;
          this.ApiLists.verifyCode(params).then(res=>{
              let { respCode } = res;
              if( respCode === 0 ){
                  this.initDisplay = false;
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
      requestAnotherAction(){
          let params = {
              customerId:this.getWebInfo.customerId,
              mobile:this.anotherForm.mobile,
              code:this.anotherForm.sms,
          };
          this.disabled4 = true;
          this.ApiLists.changeMobile(params).then(res=>{
              let { respCode } = res;
              if( respCode === 0 ){
                  this.$message({
                      message: '修改成功',
                      type: 'success'
                  });
                  this.initDisplay = true;
                  this.currentForm.sms = '';
              }else{
              }
          }).catch(err=>{
              console.log('err',err);
          }).finally(()=>{
              setTimeout(()=>{
                  this.disabled4 = false;
              },500);
          })
      },
      submitAnother(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  console.log('submit!');
                  this.requestAnotherAction();
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
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
    .accountMaPhoneCon {
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