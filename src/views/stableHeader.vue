<template>
    <div class="rootCopyContainer">
        <div class="flexContainer">
            <div class="topCon">
                <div class="titleText">
                    <img src="../assets/logo.png" alt="">
                    <div class="name">万才企业版</div>
                </div>
                <div class="rightTopPart f14">
                    <div class="breadCon"></div>
                    <el-dropdown class="loginDropdown" trigger="hover" @command="handleCommand">
                        <span class="el-dropdown-link loginName">
                            <img :src="logoSrc">
                            <span>{{ name }} </span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">账号管理</el-dropdown-item>
                            <el-dropdown-item v-if="existMultipleRoles" command="b">切换角色</el-dropdown-item>
                            <el-dropdown-item command="c">帮助中心</el-dropdown-item>
                            <el-dropdown-item command="d">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="bottomCon">
                <router-view></router-view>
            </div>
        </div>
        
        <el-dialog title="薪企云服账户" class="setRoot4Scoped setMiddleDialog"  :visible.sync="cloudVisible" width="420px" :close-on-click-modal="false" border center> 
            <div style="margin-bottom:10px;">
                <div class="accountAmountCon">
                    账户余额: {{balance}}元
                </div>
                <div class="accountInfo">请向以下网商银行账户转账：<br/>
                    银行：网商银行<br/>
                    户名：开封市薪企云服人力资源服务有限公司<br/>
                    账号：{{netAccount}}</div>
            </div>
            <div class="flexHere">
                <el-button type="info" size="small" class="sameWidthBtn"  @click="cloudVisible = false">关 闭</el-button>
            </div>
        </el-dialog>
        <div v-if="multipleVisible" class="fakeMask">
            <MultipleRoles @closeAction="closeBridge" :rolesList="rolesArr"></MultipleRoles>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'commonHeader',
        data() {
            return {
                rolesArr:[],
                multipleVisible:false,
                logoSrc:require('@/assets/logo.png'),
                name:'',
                existMultipleRoles:false,
                netAccount:'5855700282900000034',
                cloudVisible:false,
                currentAccount:'',
                haveAccount:false,
                balance:0,
            }
        },
        computed: {
            ...mapGetters([
                'getWebInfo',
            ])
        },
        mounted() {
            this.initAction();
//            this.checkOnlineInfo();
        },
        methods: {
            closeBridge(){
                this.multipleVisible = false;
            },
            initAction() {
                if( this.getWebInfo.customerInfo.type ){
                    this.logoSrc = this.getWebInfo.avatar ;
                    switch( this.getWebInfo.customerInfo.type ){
                        case 1:
                            this.name = this.getWebInfo.customerInfo.realName;
                            break;
                        case 2:
                            this.name = this.getWebInfo.customerInfo.shortName
                            break;    
                    }
                }
                let params1 = {
                    calLatest:false,
                };
                this.ApiLists.fetchMobileAccount(params1).then(res=>{
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        if( data ){
                            if( data.length > 1 ){
                                this.existMultipleRoles =  true;
                                this.rolesArr = data;
                            }else{
                                this.existMultipleRoles =  false;
                                this.rolesArr = [];
                            }
                        }else{
                            this.existMultipleRoles =  false;
                            this.rolesArr = [];
                        }
                    } 
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            checkOnlineInfo(){
                this.ApiLists.hantangAccount().then(res => {
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        if( data ){
                            this.netAccount = '58557002829'+data.subAccountNo;
                            this.haveAccount = true;
                            this.balance = data.balance;
                        }else{
                            this.haveAccount = false;
                        }
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            logOut(){
                localStorage.removeItem('webToken');
                this.$store.commit('reInitVuexData');
                this.$router.push('/');
            },
            handleCommand(command) {
                switch (command){
                    case 'a':
                        this.$router.push({
                            path: '/main/account',
                        }).catch(err=>{
                            console.log('err',err);
                        });
                        this.$store.commit('changeMenuActiveIndex', 'none');
                        this.$store.commit('changeAccountActiveIndex', '1');
                        break;
                    case 'b':
                        this.multipleVisible = true;
                        break;
                    case 'c':
                        this.$router.push({
                            path: '/main/help',
                        }).catch(err=>{
                            console.log('err',err);
                        });
                        this.$store.commit('changeMenuActiveIndex', 'none');
                        break;
                    case 'd':
                        this.logOut();
                        break;
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .rootCopyContainer {
        width: 100%;
        .loginDropdown {
        margin-left: 80px;
        .loginName {
          height: 100%;
          display: flex;
            cursor: pointer;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
              border-radius: 20px;
            margin-right: 16px;
          }
          span {
            height: 40px;
            line-height: 40px;
          }
        }
      }
        .setMargin {
            margin-right: 5px;
            cursor: pointer;
        }
        .accountAmountCon {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .fakeMask {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            overflow: hidden;
            margin: 0;
            z-index: 1000;
            background-color: rgba(0,0,0,0.7)
        }
        .accountInfo {
            font-size: 14px;
            margin-bottom: 20px;
        }
        .flexHere {
            display: flex;
            justify-content: center;
        }
        .cursorSet {
            cursor: pointer;
            &:hover {
                color: #303133;
            }
        }
        .flexContainer {
            height: 100vh;
            .topCon {
                display: flex;
                flex-direction: row;
                justify-content:space-between;
                align-content: center;
                padding-left: 40px;
                padding-right: 40px;
                box-sizing: border-box;
                .titleText {
                    height:80px;
                    width: 200px;
                    justify-content:flex-start;
                    display: flex;
                    align-items: center;
                    color: #303133;
                    text-align: center;
                    font-size:20px;
                    .name {
                        line-height: 20px;
                          width: 100px;
                          height: 20px;
                          font-size: 20px;
                          font-weight: 500;
                          color: rgba(48, 49, 51, 1);
                        }
                    img{
                        width:40px;
                        height:40px;
                        margin-right:16px;
                    }
                }
                .leftTopCon {
                    width: 200px;
                }
                .rightTopPart {
                    height:80px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    align-items: center;
                }
            }
            .bottomCon {
                overflow-y: scroll;
                overflow-x: hidden;
                padding: 30px;
                box-sizing: border-box;
                background-color: #F0F2F5;
                height: calc(100vh - 80px);
            }
        }
    }
</style>
<style lang="scss">
    .rootCopyContainer {
        .setRootScoped .el-dialog {
            height: 400px;
        }
        .setRoot4Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 260px;
            }
        }
    }
</style>