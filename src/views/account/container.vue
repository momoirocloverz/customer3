<template>
  <div class="accountManageCon">
        <div class="leftWidth">
            <el-menu :default-active="currentActive"  class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose">
                <template v-for="(item) in localMenu">
                    <div @click="pushToCurrent(item)">
                        <el-menu-item :index="item.index">
                            <span slot="title">{{item.text}}</span>
                        </el-menu-item>
                    </div>
                </template>
            </el-menu>
        </div>
      <div class="rightPart"><router-view/></div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'accountCon',
  data() {
    return {
        localMenu:[],
        currentActive:'1',
    }
  },
    computed:{
        ...mapGetters([
            'getWebInfo','getAccountActiveIndex'
        ]),
    },
  mounted(){
      this.initAction();
  },
  methods: {
      pushToCurrent(item){
          this.$router.push({
              path:item.path
          }).catch(err=>{
              console.log('err',err);
          })
          this.$store.commit('changeAccountActiveIndex', item.index);
      },
      initAction() {
          this.currentActive = this.getAccountActiveIndex;
        if( this.getWebInfo.customerInfo.type ){
            switch( this.getWebInfo.customerInfo.type ){
                case 1:
                    this.localMenu = [
                        {text:'基本信息',path:'/main/account',index:'1'},
                        {text:'登录密码',path:'/main/account/login',index:'2'},
                        {text:'手机号码',path:'/main/account/phone',index:'4'},
                    ];
                    break;
                case 2:
                    this.localMenu = [
                        {text:'基本信息',path:'/main/account',index:'1'},
                        {text:'登录密码',path:'/main/account/login',index:'2'},
                        {text:'支付密码',path:'/main/account/payment',index:'3'},
                        {text:'手机号码',path:'/main/account/phone',index:'4'},
                        {text:'企业信息',path:'/main/account/picture',index:'5'},
                    ];
                    break;    
            }
        }
      },
      handleOpen(){
          
      },
      handleClose(){
          
      },
  }
}
</script>
<style lang="scss" scoped>
    .accountManageCon {
        height: 100%;
        min-height: calc( 100vh - 80px );
        padding: 40px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-content:center;
        align-items:flex-start; 
        .leftWidth {
            width: 200px;
            margin-right: 40px;
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
            border-radius:8px;
            overflow: hidden;
        }
        .rightPart {
            width:calc( 100% - 240px );
        }
    }
</style>
<style lang="scss">
    .accountManageCon {
        .el-menu-item {
            text-align: center;
            color: #303133;
            &.is-active {
                color: #409EFF;
                border-right: 2px solid #409EFF;
            }
        }
    }
</style>