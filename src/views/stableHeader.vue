<template>
    <div class="rootCopyContainer">
        <div class="flexContainer">
            <div class="topCon">
                <div class="titleText">
                    <img src="../assets/logo.png" alt="">
                    万才企业版
                </div>
                <div class="rightTopPart f14">
                    <div class="breadCon"></div>
                    <div>
                        <span v-if="haveAccount" class="setMargin">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link co-999"> 
                                    {{ currentAccount }} 
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">查看薪企云服账户</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>                        
                      <span v-else class="el-dropdown-link cursorSet co-999 setMargin">
                        {{currentAccount}}
                      </span>
                      <span class="co-blue cursorSet" @click="logOut">退出登录</span>
                    </div>
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
                    账号：5855700282900000034</div>
            </div>
            <div class="flexHere">
                <el-button type="info" size="small" class="sameWidthBtn"  @click="cloudVisible = false">关 闭</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'commonHeader',
        data() {
            return {
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
            this.currentAccount = this.getWebInfo.customerInfo ? this.getWebInfo.customerInfo.name : '';
            this.checkOnlineInfo();
        },
        methods: {
            checkOnlineInfo(){
                this.ApiLists.hantangAccount().then(res => {
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        if( data ){
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
                switch (command) {
                    case 'a':
                        this.cloudVisible = true;
                    break;
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .rootCopyContainer {
        width: 100%;
        .setMargin {
            margin-right: 5px;
            cursor: pointer;
        }
        .accountAmountCon {
            font-size: 16px;
            margin-bottom: 20px;
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
                .titleText {
                    display: flex;
                    margin: 0 40px;
                    height:80px;
                    justify-content: center;
                    align-items: center;
                    color: #303133;
                    text-align: center;
                    font-size:20px;
                    img{
                        display: flex;
                        width:40px;
                        height:40px;
                        margin-right:5px;
                    }
                }
                .leftTopCon {
                    width: 200px;
                }
                .rightTopPart {
                    height:80px;
                    box-sizing: border-box;
                    padding-right:40px;
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