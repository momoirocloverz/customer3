<template>
  <div class="rootContainer">    
      <div class="flexContainer">
          <div class="leftPart">
              <div class="titleText">
                  <img src="../assets/logo.png" alt="">
                  万才企业版
              </div>
              <div class="menuCon"> 
                  <el-menu :default-active="getMenuActiveIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened>
                      <template v-for="(item,index) in menuList">
                          <template v-if="item.children">
                              <el-submenu :index="item.index">
                                <template slot="title">
                                    <i class="left-menu-icon setMragin" :class="item.iconClass"></i>
                                    <span>{{item.title}}</span>
                                </template>
                                <template v-for="(subItem,subIndex) in item.children">
                                    <el-menu-item :index="subItem.index" @click="switchToSubMenu(item,subItem)">{{subItem.title}}</el-menu-item>
                                </template>
                              </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="item.index" @click="switchToSingle(item)">
                                    <i class="left-menu-icon setMragin" :class="item.iconClass"></i>
                                    <span slot="title">{{item.title}}</span>
                                  </el-menu-item>
                            </template>
                        </template>     
                    </el-menu>
                </div>
            </div>
          <div class="rightPart">
                <div class="rightTopPart right-header">
                    <div class="breadCon">
                        <el-breadcrumb separator="/">
                            <template v-for="(item,index) in getBreadcrumbList">
                                <el-breadcrumb-item>{{item.title}}</el-breadcrumb-item>
                            </template>
                        </el-breadcrumb>
                    </div>
                    <div class="f14">
                        <span v-if="haveAccount" class="setMargin">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link co-999"> 
                                    {{ name }} 
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">查看薪企云服账户</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                        <span v-else class="el-dropdown-link co-999 setMargin">
                            {{name}}
                        </span>
                      <span class="co-blue cursorSet" @click="logOut">退出登录</span>  
                    </div>
                </div>
              <div class="rightBottomPart">
                  <div class="setWhiteBg">
                      <router-view></router-view>
                  </div>
              </div>
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
    import { mapGetters } from 'vuex'
export default {
    name: 'root',
    data(){
        return {
            balance:0,
            name:'',
            cloudVisible:false,
            haveAccount:false,
            menuList:[
                {
                    title:'人员收入明细',
                    index:'1',
                    iconClass:'icon-income',
                    children:[
                        {
                            title:'待发收入明细',
                            path:'/main/incomeManagement',
                            index:'1-1',
                        },
                        {
                            title:'已发收入明细',
                            path:'/main/incomeManagement/sendClasslist',
                            index:'1-2',
                        },
                    ],
                },
                 {
                     title:'收入发放订单',
                     index:'2',
                     iconClass:'icon-order',
                     path:'/main/provideMaster',
                 },
            ],
        }
    },
    computed: {
        ...mapGetters([
            'getMenuActiveIndex',
            'getBreadcrumbList',
            'getWebInfo',
        ])
    },
    watch:{
        "$route":function(nval,val){
            if( nval.path == '/main' ){
                this.$store.commit('setBreadcrumbList',[
                    { title:'首页' }
                ]);
                this.$store.commit('changeMenuActiveIndex', '0')
            }
        }
    },
    mounted(){
        this.initAction();
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
        initAction(){
            this.name = this.getWebInfo.customerInfo ? this.getWebInfo.customerInfo.name : '';
        },
        handleCommand(command){
            if( command == 'a' ){
                this.cloudVisible = true;
            }
        },
        logOut(){
            localStorage.removeItem('webToken');
            this.$store.commit('reInitVuexData');
            this.$router.push('/');
        },
        switchToSubMenu(item,subItem){
            this.$store.commit('setBreadcrumbList',[
                { title:item.title },
                { title:subItem.title },
            ]);
            this.$router.push({
                path:subItem.path
            });            
            this.$store.commit('changeMenuActiveIndex', subItem.index)
        },
        switchToSingle(item){
            this.$store.commit('setBreadcrumbList',[
                { title:item.title },
            ]);
            this.$router.push({
                path:item.path
            });            
            this.$store.commit('changeMenuActiveIndex', item.index)
        },
        changePasswordAction(){
//            this.passwordVisible = false;
        },
        submitPass(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    this.changePasswordAction();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancelPass(formName){
            this.$refs[formName].resetFields();
            this.passwordVisible = false;
        },
      handleOpen(key, keyPath) {
//          console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
//          console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss" scoped>
    .rootContainer {    
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
        .setMragin {
            margin-right: 10px;
        }
        .cursorSet {
            cursor: pointer;
            color: #909399;
            &:hover {
                color: #303133;
            }
        }
        .flexContainer {
            height: 100vh;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: center;
            .leftPart {               
                width: 240px;
                overflow-y: scroll;
                overflow-x: hidden;
                box-shadow:2px 0px 8px 0px rgba(0,0,0,0.05);
                .menuCon {
                }
                .titleText {
                    display: flex;
                    margin: 0 40px;
                    height:80px;
                    justify-content: center;
                    align-items: center;
                    color: #303133;
                    text-align: center;
                    font-size:20px;
                    border-bottom: 1px solid #DCDFE6;
                    img{
                        display: flex;
                        width:40px;
                        height:40px;
                    }
                }
            }
            .rightPart {
                width: calc( 100% - 200px );
                background-color: #F2F6FC;
                overflow-y: scroll;
                .rightTopPart {
                    height:80px;
                    font-size: 16px;
                    background-color: #fff;
                    box-sizing: border-box;
                    padding-left:40px;
                    padding-right:50px;
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    align-items: center;
                }
                .right-header{
                    background-color: transparent;
                }
                .rightBottomPart {
                    height: calc( 100vh - 80px );
                    overflow-y: scroll;
                    overflow-x: hidden;
                    padding:0 40px 40px;
                    box-sizing: border-box;
                    .setWhiteBg {
                        background-color: #fff;
                        height: 100%;
                        overflow-y: scroll;
                        overflow-x: hidden;
                        padding: 30px;
                        box-sizing: border-box;
                        border-radius: 10px;
                        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.05);
                    }
                }
            }
        }        
    }    
</style>
<style lang="scss">
    .rootContainer {  
        .el-menu-vertical-demo {
            border-right: 0;
        }
        .menuCon {
            li[role="menuitem"] {
                color: #909399; 
            }
            .el-submenu__title {
                color: #909399;
                position: relative;
                height: 60px;
                line-height:60px;
                text-align: right;
                padding-right: 56px;
                &:hover {
                    background-color: rgba(64,158,255,0.1);
                    color: #303133;
                }
            }
            .el-menu-item {
                position: relative;
                height: 60px;
                line-height:60px;
                text-align: right;
                padding-right: 56px;
                font-size: 16px;
                &:hover {
                    background-color: rgba(64,158,255,0.1);
                    color: #303133;
                }
            }
            .el-submenu .el-menu-item{
                font-size: 14px;
            }
            .is-opened .el-submenu__title{
                color: #303133;
            }
            .is-active {
                &.el-submenu__title {
                    background-color: rgba(64,158,255,0.1);
                    color: #409EFF !important;
                     &:before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 10px;
                        width: 3px;
                        height: 20px;
                        /*background-color:#409EFF;*/
                    }
                }
                &.el-menu-item {
                    background-color: rgba(64,158,255,0.1);
                    color: #409EFF !important;
                    &:before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 10px;
                        width: 3px;
                        height: 20px;
                        /*background-color: #FF2626;*/
                    }
                }
            }            
        }
        .rightPart{
            .el-breadcrumb__inner{
                color: #303133;
                font-size: 16px;
            }
        }
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