<template>
  <div class="rootContainer">
    <div class="flexContainer">
      <div class="header">
        <div class="titleText">
          <img src="../assets/logo.png" alt="" />
          <div class="name">万才企业版</div>
        </div>
        <div class="headerSilderBar">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo mainMenu"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">任务/排班</el-menu-item>
            <el-menu-item index="3">通讯录</el-menu-item>
          </el-menu>
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
      <router-view></router-view>
    </div>

    <el-dialog
      title="薪企云服账户"
      class="setRoot4Scoped setMiddleDialog"
      :visible.sync="cloudVisible"
      width="420px"
      :close-on-click-modal="false"
      border
      center
    >
      <div style="margin-bottom:10px;">
        <div class="accountAmountCon">账户余额: {{ balance }}元</div>
        <div class="accountInfo">
          请向以下网商银行账户转账：<br />
          银行：网商银行<br />
          户名：开封市薪企云服人力资源服务有限公司<br />
          账号：5855700282900000034
        </div>
      </div>
      <div class="flexHere">
        <el-button
          type="info"
          size="small"
          class="sameWidthBtn"
          @click="cloudVisible = false"
          >关 闭</el-button
        >
      </div>
    </el-dialog>
        <div v-if="multipleVisible" class="fakeMask">
            <MultipleRoles @closeAction="closeBridge" :rolesList="rolesArr"></MultipleRoles>
        </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'root',
  data() {
    return {
        rolesArr:[],
        multipleVisible:false,
        existMultipleRoles:false,
        logoSrc:require('@/assets/logo.png'),
      balance: 0,
      activeIndex:'1',
      name: '',
      cloudVisible: false,
      haveAccount: false,
      menuList: [
        {
          title: 'a',
          index: '1',
          iconClass: 'icon-income',
          children: [
            {
              title: '待发收入明细',
              path: '/main/incomeManagement',
              index: '1-1',
            },
            {
              title: '已发收入明细',
              path: '/main/incomeManagement/sendClasslist',
              index: '1-2',
            },
          ],
        },
        {
          title: '收入发放订单',
          index: '2',
          iconClass: 'icon-order',
          path: '/main/provideMaster',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getMenuActiveIndex', 'getWebInfo']),
  },
  watch: {
    $route: function(nval, val) {
      if (nval.path == '/main') {
        this.$store.commit('changeMenuActiveIndex', '1')
      }
    },
  },
  mounted() {
    this.initAction()
    this.activeIndex = this.getMenuActiveIndex;
  },
  methods: {
      closeBridge(){
          this.multipleVisible = false;
      },
    handleSelect(key){
        this.$store.commit('changeMenuActiveIndex', key)
        switch(key){
            case '1':
                this.$router.push({
                    path: '/main/index',
                }).catch(err=>{
                    console.log('err',err);
                });
                break;
            case '2':
                this.$router.push({
                    path: '/main/taskIndex',
                }).catch(err=>{
                    console.log('err',err);
                });
                this.$store.commit('setTabnumber','0');
                break;
            case '3':
                this.$router.push({
                    path: '/main/contacts',
                }).catch(err=>{
                    console.log('err',err);
                });
                break;
        }
    },
    checkOnlineInfo() {
      this.ApiLists.hantangAccount()
        .then((res) => {
          let { respCode, data } = res
          if (respCode == 0) {
            if (data) {
              this.haveAccount = true
              this.balance = data.balance
            } else {
              this.haveAccount = false
            }
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
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
    logOut() {
      localStorage.removeItem('webToken')
      this.$store.commit('reInitVuexData')
      this.$router.push('/')
    },
    changePasswordAction() {
      //            this.passwordVisible = false;
    },
    submitPass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.changePasswordAction()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelPass(formName) {
      this.$refs[formName].resetFields()
      this.passwordVisible = false
    },
    handleOpen(key, keyPath) {
      //          console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //          console.log(key, keyPath);
    },
  },
}
</script>
<style lang="scss" scoped>
.rootContainer {
  .setMargin {
    margin-right: 5px;
    cursor: pointer;
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
    .header {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.05);
      padding: 0px 40px;
      .headerSilderBar {
        width: 60%;
        line-height: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 10;
      }
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
      .titleText {
        line-height: 20px;
        display: flex;
        align-items: center;
        flex: 2;
        .name {
          width: 100px;
          height: 20px;
          font-size: 20px;
          font-weight: 500;
          color: rgba(48, 49, 51, 1);
        }
        img {
          display: flex;
          width: 40px;
          height: 40px;
          margin-right: 16px;
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
    li[role='menuitem'] {
      color: #909399;
    }
    .el-submenu__title {
      color: #909399;
      position: relative;
      height: 60px;
      line-height: 60px;
      text-align: right;
      padding-right: 56px;
      &:hover {
        background-color: rgba(64, 158, 255, 0.1);
        color: #303133;
      }
    }
    .el-menu-item {
      position: relative;
      height: 60px;
      line-height: 60px;
      text-align: right;
      padding-right: 56px;
      font-size: 16px;
      &:hover {
        background-color: rgba(64, 158, 255, 0.1);
        color: #303133;
      }
    }
    .el-submenu .el-menu-item {
      font-size: 14px;
    }
    .is-opened .el-submenu__title {
      color: #303133;
    }
    .is-active {
      &.el-submenu__title {
        background-color: rgba(64, 158, 255, 0.1);
        color: #409eff !important;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 3px;
          height: 20px;
        }
      }
      &.el-menu-item {
        background-color: rgba(64, 158, 255, 0.1);
        color: #409eff !important;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 3px;
          height: 20px;
        }
      }
    }
  }
  .main {
    .el-breadcrumb__inner {
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
  .mainMenu.el-menu--horizontal {
      border-bottom: none;
    }
}
</style>
