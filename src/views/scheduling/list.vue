<template>
  <div class="taskList"> 
      <div class="main">
        <div class="seepage">
          <el-button class="newTaskbtn" type="primary">发布排班</el-button>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color='#409EFF'
          >
            <el-menu-item index="1">未开始</el-menu-item>
            <el-menu-item index="2">进行中</el-menu-item>
            <el-menu-item index="3">已结束</el-menu-item>
            <el-menu-item index="4">已关闭</el-menu-item>
          </el-menu>
          <div class="searchbox" style="width:240px">
            <el-input placeholder="请输入内容" v-model="sblingValue" class="input-with-select" size="large">
              <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
            </el-input>
          </div>
          <div class="setWhiteBg" v-loading="loading" element-loading-text="正在请求中..." v-if="taskListdata.length > 0">
            <!-- 进行中任务组件 -->
            <li class="rightMinbox" v-for="(item,index) in taskListdata" :key="index"  @click="checkDetail(item)">
              <div class="minBoxheader">
                <div class="tasknametitle">
                  <h3>{{item.schedulingName}}</h3>
                </div>
                <h2 style="color:#909399;" v-if="item.processStatus==1">{{PROCESSstatus[item.processStatus]}}</h2>
                <h2 style="color:#409EFF;" v-if="item.processStatus==2">{{PROCESSstatus[item.processStatus]}}</h2>
                </div>
              <div class="minBoxtext" >
                <div class="timeAddress">
                  <div><i class="el-icon-time"></i><span>{{item.workStartTimeMin}} ~ {{item.workEndTimeMax}}</span></div>
                  <ul>
                    <li>
                      <span>排班人数 : </span>
                      <h3>{{item.schedulingEmpCount}}</h3>
                    </li>
                      <li>
                      <span>打卡人数 : </span>
                      <h3 style="color:#409EFF;">{{item.schedulingPunchCount}}</h3>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="minBoxbtnPersonal" v-if="btnType=='个人'">
                <el-button size="mini" v-if="item.processStatus==1" type="danger" plain>关闭</el-button>
                <el-button size="mini">复制</el-button>
                <el-button size="mini" v-if="item.processStatus==2">修改单价</el-button>
                <el-button size="mini" v-if="item.processStatus==2">去结算</el-button>
                <el-button size="mini" v-if="item.processStatus==2">三方确认</el-button>
                <el-button size="mini" v-if="item.processStatus==2">启用</el-button>
              </div>
              <div class="minBoxbtnEnterprise" v-if="btnType=='企业'">
                <div style="display: flex; flex:2;">
                  <div style="font-size:14px; color:#E6A23C" v-if="item.noPriceCheckScheduling">{{item.noPriceCheckScheduling}}个排班单价待审核 <i class="el-icon-arrow-right"></i></div>
                  <div style="font-size:14px; color:#409EFF" v-if="item.notReviewRp">{{item.notReviewRp}}个奖惩待审核 <i class="el-icon-arrow-right"></i></div>
                  <div style="font-size:14px; color:#F56C6C" v-if="item.noSettleScheduling">{{item.noSettleScheduling}}个排班结算待审核 <i class="el-icon-arrow-right"></i></div>
                </div>
                <div>
                  <el-button size="mini" type="danger" plain @click="open(item.id)">结束任务</el-button>
                  <el-button size="mini" v-if="item.processStatus==2" @click="taskSettingsbtn(item)">任务设置</el-button>
                  <el-button size="mini" v-if="item.processStatus==1">排班管理</el-button>
                  <el-button size="mini" v-if="item.processStatus==1">新建排班</el-button>
                  <el-button size="mini" v-if="item.processStatus==2">查看排班</el-button>
                </div>
              </div>
            </li>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="setWhiteBgblank" v-if="taskListdata.length < 1">
            <img :src="imgsrc" alt="">
            <div class="textCon">            
              暂无数据
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'taskIndex',
  data() {
    return {
      imgsrc:require('@/assets/task/welcome.png'),
      activeIndex: '1',
      btnType:'个人',
      tackType:1,
      sblingValue:'', // 排班类型值
      settlementCyclevalue:'', // 搜索结算周期值
      loading: false,
      PROCESSstatus:{
        1:'待执行',
        2:'待结算',
        3:'已完成',
        4:'已结束'
      },
      taskListdata:[],
      total:0,
      currentPage: 1,
      pageSize: 10,
    }
  },
  created(){
    this.getTasklist()
  },
  // mounted(){
  //   this.getTasklist()
  // },
  methods: {
      checkDetail(item){
          this.$router.push({
              name: 'schDetails',
              query:{
                  id:item.schedulingId
              }
          })
      },
    getTasklist(){
      this.loading = true
      let params = {
        processStatus: this.tackType,
        type:2,
        pageNum: this.currentPage,
        pageSize:this.pageSize,
        schedulingName: this.sblingValue,

      };
      this.ApiLists.getschedulinglist(params).then(res => {
       if (res.respCode === 0) {
            this.taskListdata = res.data.list ? res.data.list : []
            this.total = res.data.total
        }
      }).catch(err => {
          console.log(err)
      }).finally(() => {
          setTimeout(() => {
              this.loading = false;
          }, 300)
      })
    },
    search(){
      this.currentPage = 1;
      this.getTasklist();
    },
             
    handleCurrentChange(val) {
        this.currentPage = val
        this.getTasklist()
    },
    handleSizeChange(val){
      this.pageSize = val
      this.getTasklist()
    },
    handleSelect(key, keyPath) {
      this.tackType = key
      this.getTasklist()
    },
    //  名字搜索
    searchName(){
      this.getTasklist()
    }
  }
}
</script>
<style lang="scss" scoped>
.taskList {
  width: 100%;
  height: 100%;
  background: #f2f6fc;
  .main {
    display: flex;
    background: #f2f6fc;
    .seepage {
      width:100%;
      position: relative;
      background: #fff;
      padding: 30px 40px;
      box-sizing: border-box;
      margin:0 0 40px 50px;
      .searchbox{
        margin:30px 0;
        .el-select{
          margin-right:10px;
        }
      }
    }
    .newTaskbtn {
      position:absolute;
      right:40px;
      top: 37px;
      z-index: 2;
    }
    .setWhiteBgblank{
      height:calc(100vh - 20.125rem /* 322/16 */);
      margin-bottom: 20px;
      box-sizing: border-box;
      text-align: center;
      color: #606266;
      font-size: 14px;
      font-weight: 300;
      img {
          width: 260px;
          height: 200px;
          margin-top: 15vh;
          margin-bottom: 40px;
      }
      .textCon {
          line-height: 30px;
          margin-bottom: 30px;
      }
    }
    .setWhiteBg {
      overflow-y: scroll;
      overflow-x: hidden;
      box-sizing: border-box;
      border-radius: 10px;
      // box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
      .block{
        display: flex;
        justify-content: center;
      }
      .rightMinbox{
        height: 208px;
        background: white;
        padding: 20px 20px 0;
        display: flex;
        margin-bottom: 20px;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
        border: 1px solid #DCDFE6;
        .minBoxheader{
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #303133;
          .tasknametitle{
            display: flex;
            flex: 4;
            justify-content: space-between;
            align-items: center;
            .tagBox{
              flex: 3;
              display: flex;
              .el-tag{
                margin-left:8px;
              }
            }
          }
        }
        .minBoxtext, .SchedulingminBoxtext{
          font-size: 14px;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-evenly;
          color:#606266;
          .timeAddress{
            display: flex;
            align-items: center;
            justify-content: space-between;
            &>ul{
              display: flex;
              justify-content: space-between;
              &>li{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                align-items: baseline;
                span{
                  margin-right:10px;
                }
                h3{
                  color:#303133;
                  font-size: 20px;
                  font-weight: 500;
                }
              }
              &>li:first-child{
                margin-right:1.25rem /* 20/16 */;
              }
            }
          }
          i{
            margin-right: 5px;
          }
        }
        .SchedulingminBoxtext{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .somepople{
            display: flex;
            align-items: center;
            justify-content:space-between;
          }
        }
        .minBoxbtnPersonal{
          height: 72px;
          line-height: 72px;
          text-align: right;
          border-top: 1px solid #E4E7ED;
        }
        .minBoxbtnEnterprise{
          height: 72px;
          line-height: 72px;
          text-align: right;
          border-top: 1px solid #E4E7ED;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      .rightMinboxScheduling{
        height: 172px;
      }
    }
  }
  // 任务状态样式
  .padding {color:#909399!important;}
  .run {color:#409EFF!important;}
}
</style>


