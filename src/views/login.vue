<template>
    <div class="login" @keyup.enter="enterReaction">
        <div class="login-left">
            <img src="../assets/logo.png" alt="">
            万才企业版
        </div>
        <div class="setCenter">
            <div class="center-left">

            </div>
            <div class="center-right">
                <div class="title">万才企业版管理系统 <span class="co-blue f14 cursor" @click="isTabPhone = !isTabPhone">{{isTabPhone? '手机验证码登录' : '账号密码登录'}}</span></div>
                <el-form ref="loginForm" :label-position="labelPosition" :model="loginForm" :rules="rules">
                    <div v-if="isTabPhone">
                        <el-form-item prop="account" label="用户名">
                            <!--prefix-icon="el-icon-user"-->
                            <el-input v-model="loginForm.account" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="登录密码">
                            <!--prefix-icon="el-icon-lock"-->
                            <el-input v-model="loginForm.password" placeholder="请输入登录密码" type="password"></el-input>
                        </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item prop="phone" label="手机号">
                            <!--prefix-icon="el-icon-user"-->
                            <el-input v-model="loginForm.phone" type="text" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item prop="yzm" label="短信验证码">
                            <!--prefix-icon="el-icon-lock"-->
                            <el-input v-model="loginForm.yzm" placeholder="请输入短信验证码"></el-input>
                            <el-button type="button" class="sent-btn" @click="sendCode" :disabled="isSendYzm">{{buttonText}}
                            </el-button>
                        </el-form-item>
                    </div>
                    <el-button type="primary" size="small" :disabled="isEmptyForm" class="login-btn" @click="go">登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data(){
            return {
                loginForm:{
                    account:'',
                    phone:'',
                    password:'',
                    yzm:'',
                },
                isRequest:false,
                buttonText:'获取验证码',
                // isEmptyForm:true,
                labelPosition:'top',
                wating:60,
                isTabPhone:true,
                isSendYzm:false,
                rules: {
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
//                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
//                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
//                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    yzm: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' },
//                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        computed:{
            isEmptyForm(){
                if(this.isTabPhone){
                    if(this.loginForm.account && this.loginForm.password){
                        return false
                    }else {
                        return true
                    }
                }else{
                    if(this.loginForm.phone && this.loginForm.yzm){
                        return false
                    }else {
                        return true
                    }
                }
            }
        },
        mounted(){
            this.clearStateAction();
        },
        methods:{
            sendCode(){
                if(!this.loginForm.phone){
                    return this.$message({
                        message: '请输入手机号!',
                        type: 'error'
                    });
                }
                this.isSendYzm = true;
                const params = {
                    mobile: this.loginForm.phone,
                };
                this.wating = 60;
                this.$message({
                    message: '验证码已发送',
                    type: 'success'
                });
                this.ApiLists.getSmsCode(params).then(res => {
                    if (res.respCode === 0) {
                        let that = this;
                        let timing = setInterval(function () {
                            if (that.wating < 0) {
                                that.isSendYzm = false;
                                that.buttonText = '获取验证码';
                                window.clearInterval(timing)
                            } else {
                                that.buttonText = that.wating + '秒后重试';
                                that.wating--;
                            }
                        },1000)
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            clearStateAction(){
                localStorage.webToken = undefined;
                this.$store.commit('reInitVuexData');
            },
            go(){
                if(this.isRequest){return}
                this.isRequest = true;
                this.$refs['loginForm'].validate(async (valid) => {
                    if (valid) {
                        let data = {};
                        if(this.isTabPhone){
                            data = {
                                loginName:`${this.loginForm.account}`,
                                pwd:this.loginForm.password,
                            };
                            await this.login(data)
                        }else{
                            data = {
                                mobile:`${this.loginForm.phone}`,
                                code:this.loginForm.yzm,
                            };
                            await this.loginCode(data)
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                setTimeout(()=>{
                    this.isRequest = false
                },500)
            },
            async getUseInfo(){
                await this.ApiLists.getBaseInfo().then(res=>{
                    if(res.respCode === 0){
                        this.$store.commit('setWebInfo',res.data)
                    }
                })
            },
            //手机登录
             login(params){
                this.ApiLists.login(params).then(async res=>{
                    let { respCode,data,errorMsg } = res;
                    if( respCode === 0 ){
                        await this.getUseInfo()
                        this.$router.push({
                            path:'/main'
                        });
                    }else{
                        // this.$message.error(errorMsg);
                    }
                }).catch(err=>{
                    // this.$message.error(`${err}`);
                })
            },
            //验证码登录
            loginCode(params){
                this.ApiLists.loginCode(params).then(async res=>{
                    let { respCode,data,errorMsg } = res;
                    if( respCode === 0 ){
                        await this.getUseInfo()
                        this.$router.push({
                            path:'/main'
                        });
                    }else{
                        // this.$message.error(errorMsg);
                    }
                }).catch(err=>{
                    // this.$message.error(`${err}`);
                })
            },
            enterReaction(){
                this.go('loginForm');
            },
        },
    }
</script>
<style lang="scss" scoped>
    .login {
        background-origin: border-box;
        background-repeat:no-repeat;
        background-position: 50%;
        background-image: url(../assets/loginBg.jpg);
        background-size:cover;
        height: 100vh;
        min-height: 500px;
    }
    .setCenter {
        width:930px;
        height:520px;
        background:rgba(255,255,255,1);
        box-shadow:0px 10px 40px 0px rgba(31,34,51,0.1);
        border-radius:20px;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        box-sizing: border-box;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .center-left{
            width:390px;
            height: 520px;
            background:url("../assets/welcome.png");
            border-top-left-radius:20px;
            border-bottom-left-radius:20px;
        }
        .center-right{
            width: 540px;
            padding: 60px 80px 0;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                color: #303133;
                font-size: 24px;
                font-weight: 500;
                height: 30px;
                margin-bottom:50px;
            }
            .login-btn{
                width: 100%;
                height: 40px;
                margin-top: 40px;
            }
        }
    }
</style>
<style lang="scss">
    .login {
        position: relative;
        .login-left{
            position: absolute;
            left: 40px;
            top:20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 20px;
            color: #303133;
            img{
                display: flex;
                width: 40px;
                height: 40px;
                margin-right: 16px;
            }
        }
        .el-form--label-top .el-form-item__label{
            line-height: 34px;
            padding: 0;
        }
        .el-input__inner {
            border-width: 0;
            border-radius: 0;
            box-sizing: border-box;
            padding-left:0;
            text-indent: 10px;
        }
        .sent-btn{
            position: absolute;
            right: 0;
            color: #409EFF;
            font-size: 14px;
            border: none;
            background-color: transparent !important;
        }
        .el-input__prefix {
            left: 0px;
        }
        .el-input__icon {
            text-align: left;
            color: #606266;
        }
        .el-input--prefix .el-input__inner  {
            padding-left: 20px;
        }
        .el-input__inner {
            &:focus {
                border-bottom-color: #303133;
                border-bottom-width: 1px;
            }
        }
        .el-form-item.is-error .el-input__inner {
            border-bottom-width: 1px;
        }
    }
</style>