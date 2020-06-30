<template>
  <div class="taskList"> 
      <div class="main">
        <div class="seepage">
          <el-button class="newTaskbtn" type="primary">发布任务123213</el-button>
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
          <div class="searchbox">
            <el-select v-model="moldValue" placeholder="任务类型" @change="search">
              <el-option
                v-for="item in mold"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
             <el-select v-model="settlementCyclevalue" placeholder="结算周期" @change="search">
              <el-option
                v-for="item in settlementCycle"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </div>
          <div class="setWhiteBg" v-loading="loading" element-loading-text="正在请求中..." v-if="taskListdata.length > 0">
            <!-- 进行中任务组件 -->
            <li class="rightMinbox" v-for="(item,index) in taskListdata" :key="index"  >
              <div class="minBoxheader">
                <div class="tasknametitle">
                  <h3>{{item.taskName}}</h3>
                  <div class="tagBox">
                    <el-tag type="info">{{PUNCHWAY[item.punchWay]}}</el-tag>
                    <el-tag type="info">核定{{item.authorizedNumber}}人</el-tag>
                    <el-tag type="info">{{SETTLEMENTTYPE[item.settlementType]}}结</el-tag>
                  </div>
                  <el-tag v-if="item.taskType == 1" type="warning">{{TASKTYPE[item.taskType]}}</el-tag>
                  <el-tag v-if="item.taskType == 2">{{item.recCustomerName}}∙{{TASKTYPE[item.taskType]}}</el-tag>
                </div>
              </div>
              <div class="minBoxtext" >
                <p>
                  <i class="el-icon-circle-plus-outline"></i><span>{{item.price | priceFor}}</span>
                </p>
                <div class="timeAddress">
                  <div><i class="el-icon-time"></i><span>{{item.startTime}} ~ {{item.endTime ?  item.endTime : '长期'}}</span></div>
                  <div><i class="el-icon-location-outline"></i><span>{{item.workingPlace}}</span></div>
                </div>
              </div>
              <div class="minBoxbtnPersonal" v-if="btnType=='个人'">
                <el-button size="mini">任务设置</el-button>
                <el-button size="mini" v-if="item.processStatus==1">新建排班</el-button>
                <el-button size="mini" v-if="item.processStatus==2">排班管理</el-button>
                <el-button size="mini" v-if="item.processStatus==2">查看排班</el-button>
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
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
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
      btnType:'企业',
      tackType:1,
      moldValue:'', // 搜索类型值
      settlementCyclevalue:'', // 搜索结算周期值
      loading: false,
      mold: [
        {label: '不限', value: -1},
        {label: '自有任务', value: 1},
        {label: '指派任务', value: 2},
      ],
      settlementCycle: [
        {label: '不限', value: -1},
        {label: '日结', value: 1},
        {label: '月结', value: 2},
        {label: '周结', value: 4},
      ],
      // 结算方式 字段
      SETTLEMENTTYPE: {
        1: '日', 
        2: '月', 
        3: '', 
        4: '周', 
      },
      // 任务类型
      TASKTYPE:{
        1:'自有任务',
        2:'指派任务'
      },
      // 打卡方式
      PUNCHWAY:{
        1:'扫码打卡',
        2:'自主打卡'
      },
      PROCESSstatus:{
        1:'待执行',
        2:'执行中',
        3:'已完成',
        4:'已关闭'
      },
      taskListdata:[],
      total:0,
      currentPage: 1,
      pageSize: 5,
    }
  },
  created(){
    this.getTasklist()
  },
  // mounted(){
  //   this.getTasklist()
  // },
  methods: {
    getTasklist(){
      this.loading = true
      let params = {
        status: this.tackType,
        taskType:this.moldValue === -1? '' : this.moldValue,
        settleType:this.settlementCyclevalue === -1? '' : this.settlementCyclevalue,
        pageNum: this.currentPage,
        pageSize:this.pageSize,

      };
      this.ApiLists.taskList(params).then(res => {
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
    handleSelect(key, keyPath) {
      this.tackType = key
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
            &>div:first-child{
              margin-right: 20px;
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


