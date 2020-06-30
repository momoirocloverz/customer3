<template>
    <div class="layout">
        <div class="silderBar">
          <el-tabs :tab-position="'left'"  v-model="tabNumber"  @tab-click="handleClick">
            <el-tab-pane :label="item.label" v-for="item in routerList" :key="item.key" >
               <router-view/>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapMutations} from 'vuex';
export default {
  name: 'layout',
  data() {
    return {
      routerList:[
        {label:'任务',value:'/main/taskIndex',key:'1'},
        {label:'排班',value:'/main/schedulingIndex',key:'2'},
        {label:'奖惩',value:'/main',key:'3'},
      ],
      tabNumber:0,
    }
  },
  created(){
    this.tabNumber = this.$store.state.tabNumber
  },
  computed: {
  },
  methods: {
    handleClick(){
      this.$store.commit('setTabnumber',this.tabNumber);
      this.$router.push({
        path: this.routerList[this.tabNumber].value,
      });
    }
  },
}
</script>
<style lang="scss">
  .layout{
    width: 100%;
    display: flex;
    background: #f2f6fc;
    padding-top: 40px;
    .silderBar {
      width:100vw;
      margin: 0 40px;
      .el-tabs--left .el-tabs__header.is-left{
        width: 200px;
      }
      .el-tabs__nav{
        background: #fff;
        font-size: 16px;
        color: #303133;
      }
      .el-tabs--left .el-tabs__item.is-left{
        text-align: center;
        height:50px;
        line-height: 50px;
      }
    }
      // .box {
      //   .headerImg {
      //     width: 270px;
      //     height: 175px;
      //     background: #fff;
      //     margin-bottom: 20px;
      //     border-radius: 5px;
      //   }
      // }
      // .boxList {
      //   .silderBtn {
      //     width: 230px;
      //     height: 80px;
      //     background: rgba(255, 255, 255, 1);
      //     border-radius: 8px;
      //     display: flex;
      //     padding: 0 20px;
      //     align-items: center;
      //     justify-content: space-between;
      //     img {
      //       width: 48px;
      //       height: 48px;
      //       opacity: 0.1;
      //     }
      //     span {
      //       width: 80px;
      //       height: 20px;
      //       font-size: 20px;
      //       font-weight: 500;
      //       color: rgba(48, 49, 51, 1);
      //       line-height: 20px;
      //     }
      //     i {
      //       width: 20px;
      //       height: 20px;
      //     }
      //   }
      // }

  }
  
</style>


