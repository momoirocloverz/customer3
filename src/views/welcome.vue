<template>
  <div class="mainIndexCon">
    <div class="main">
      <div class="silderBar">
        <div class="box">
          <img class="headerImg" src="img/welcome2.1f2b266a.png" alt="" />
        </div>
        <ul class="boxList">
          <li class="silderBtn" @click="goTotask()">
            <img src="../assets/logo.png" alt="" />
            <span>发布任务</span>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li class="silderBtn" @click="goToscheduling()">
            <img src="../assets/logo.png" alt="" />
            <span>排班</span>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>
      </div>
      <div class="seepage">
        <div class="someline">更多任务/排班</div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color='#f2f6fc'
          active-text-color='#409EFF'
          @select="handleSelect"
        >
          <el-menu-item index="任务">进行中任务</el-menu-item>
          <el-menu-item index="排班">进行中排班</el-menu-item>
        </el-menu>
        <div class="setWhiteBg">
          <!-- 进行中任务组件 -->
          <li class="rightMinbox" v-for="(item,index) in this.taskListdata" :key="index" v-if="workType=='任务'">
            <div class="minBoxheader">
              <div class="tasknametitle">
                <h3>{{item.taskName}}</h3>
                <div class="tagBox">
                  <el-tag v-if="item.taskType == 1" type="warning">{{TASKTYPE[item.taskType]}}</el-tag>
                  <el-tag v-if="item.taskType == 2">{{item.recCustomerName}}∙{{TASKTYPE[item.taskType]}}</el-tag>
                  <el-tag type="info">{{PUNCHWAY[item.punchWay]}}</el-tag>
                  <el-tag type="info">核定{{item.authorizedNumber}}人</el-tag>
                  <el-tag type="info">{{SETTLEMENTTYPE[item.settlementType]}}结</el-tag>
                </div>
              </div>
              <h2 style="color:#909399;" v-if="item.processStatus==1">{{PROCESSstatus[item.processStatus]}}</h2>
              <h2 style="color:#409EFF;" v-if="item.processStatus==2">{{PROCESSstatus[item.processStatus]}}</h2>
            </div>
            <div class="minBoxtext" >
              <p>
                <i class="el-icon-circle-plus-outline"></i><span>{{item.price | priceFor}}</span>
                <!-- 1 ~ 1000(含)件，1元/件；1000(不含) ~ 3000件，2元/件； -->
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
          <!-- 进行中排班 -->
          <li class="rightMinbox rightMinboxScheduling" v-for="item in Schedulingdata" v-if="workType=='排班'">
            <div class="minBoxheader">
              <div class="tasknametitle">
                <h3>邮政中心局供件白班</h3>
              </div>
              <h2 style="color:#909399;">待执行 · 待审核</h2>
            </div>
            <div class="SchedulingminBoxtext" >
              <div><i class="el-icon-time"></i><span>2020/06/24 18:30 ~ 2020/06/25 08:30</span></div>
              <div class="somepople">
                <div ><span>排班人数: </span><b>200</b></div>
                <div style="margin-left:12px;"><span>打卡人数: </span><b>18</b></div>
              </div>
            </div>
            <div class="minBoxbtnPersonal" v-if="btnType=='个人'">
              <el-button>默认按钮</el-button>
              <el-button>默认按钮</el-button>
            </div>
            <div class="minBoxbtnEnterprise" v-if="btnType=='企业'">
              <div style="display: flex;" >
                <div style="font-size:14px; color:#F56C6C">单价设置错误，请重新提交</div>
              </div>
              <div >
                <el-button>默认按钮</el-button>
                <el-button>默认按钮</el-button>
              </div>
            </div>
          </li>
        </div>
        <!-- 任务设置 -->
        <el-dialog
          title="提示"
          :visible.sync="settingDialog"
          width="480px"
          :before-close="handleClose"
          >
          <el-form class="formbody" ref="form" :model="taskSettings" :label-position="'left'">
            <el-form-item>
              <div slot="label" class="settinglable">
                <span>自动排班</span>
                <br>
                <span style="font-size:12px;color:#909399;">系统将于每日22:30通过自动复制功能生成明日排班（如明日已有排班，则不重复生成）</span>
              </div>
              <el-switch v-model="settingSwitch" @change="ChangeAutoMatic" class="personnelAgeinput"></el-switch>
            </el-form-item>

            <el-form-item v-if="isShowsetting == 1 ">
              <div slot="label" class="settinglable" >
                <span>结束打卡时间限制</span>
                <br>
                <span style="font-size:12px;color:#909399;">本任务下所有排班超出结束打卡时间多少小时即无法打卡</span>
              </div>
              <el-input v-model="taskSettings.endPunchLimit" placeholder="0" class="personnelAgeinput" ></el-input> /小时
            </el-form-item>

            <el-form-item v-if="isShowsetting == 1 ">
              <div slot="label" class="settinglable">
                <span>开始打卡提前时间限制</span>
                <br>
                <span style="font-size:12px;color:#909399;">本任务下所有排班可提前多少小时打卡</span>
              </div>
              <el-input v-model="taskSettings.startPunchLimit" placeholder="0" class="personnelAgeinput" ></el-input> /小时
            </el-form-item>
          </el-form>
          
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="settintask">保存设置</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'welcome',
  data() {
    return {
      imgsrc: require('@/assets/welcome2.png'),
      activeIndex: '任务',
      btnType:'企业',
      workType:'任务',
      taskListdata:{},   // 任务列表
      Schedulingdata:{}, // 排班列表
      // 设置任务自动排班
      settingSwitch : false,
      // 任务设置提交参数
      taskSettings:{
        id:'',
        autoScheduling: 0,
        endPunchLimit: 0,
        startPunchLimit: 0,
      },
      // 半点打卡/ 不打卡
      isShowsetting:'',
      // 弹窗
      settingDialog:false,
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
      }
    }
  },
  mounted(){
    this.gettaskList()
  },
  methods: {
    // 任务列表数据
    gettaskList(){
      let params = {
        status: '1,2',
        pageNum : 0,
        pageSize : 0

      };
      this.ApiLists.taskList(params).then(res => {
        this.taskListdata = res.data.list
      })
      // let schedulinglist = {
      //   processStatus: '1,2',
      //   type : 2,
      // }
      // this.ApiLists.getschedulinglist(schedulinglist).then(res => {
      //   console.log(res.data)
      // })
    },
    // 任务设置
    taskSettingsbtn(item){
      this.isShowsetting = item.punchType
      this.taskSettings ={
        id: item.id,
        autoScheduling: item.autoScheduling,
        endPunchLimit: item.endPunchLimit,
        startPunchLimit: item.startPunchLimit,
      } 
      let istrue = item.autoScheduling > 0 ? true : false
      this.settingSwitch = istrue 
      this.settingDialog = true
    },
    // 关闭弹窗
    handleClose(){
      this.settingDialog = false
    },
    // 更改自动排班按钮
    ChangeAutoMatic(){
      this.taskSettings.autoScheduling = this.settingSwitch ? 1 : 0 
    },
    // 设置任务
    settintask(){
      this.ApiLists.taskSetting(this.taskSettings).then (res=>{
        if(res.respCode == 0){
          this.$message({
            message: '设置成功',
            type: 'success'
          });
          this.settingDialog = false
          this.gettaskList()
        }
      }).catch((error) => {  
        console.log(error)
      });
    },

    open(raskId){
      this.$confirm('确认该任务下所有待执行的排班关闭', '确认关闭', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
      }).then(() => {
        let params = {
          id: raskId,
        };
        this.ApiLists.endtask(params).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
           this.gettaskList()
        }).catch((error) => {  
          
        });
      })
    },
    // 切换
    handleSelect(key, keyPath) {
      this.workType = key
    },
    // 跳转新建任务
    goTotask(){
       this.$router.push({
        path: '/main/taskCreated',
        query:{
          id:'',
        },
      });
    },
    // 跳转新建任务
    goToscheduling(){
       this.$router.push({
        path: '/main/schedulingIndex',
        query:{
          id:'',
        },
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.mainIndexCon {
  width: 100%;
  height: 100%;
  background: #f2f6fc;
  .main {
    display: flex;
    background: #f2f6fc;
    padding-top: 40px;
    .silderBar {
      width: 270px;
      margin: 0 40px;
      .box {
        .headerImg {
          width: 270px;
          height: 175px;
          background: #fff;
          margin-bottom: 20px;
          border-radius: 5px;
        }
      }
      .boxList {
        .silderBtn {
          width: 230px;
          height: 80px;
          background: rgba(255, 255, 255, 1);
          border-radius: 8px;
          display: flex;
          padding: 0 20px;
          align-items: center;
          justify-content: space-between;
          img {
            width: 48px;
            height: 48px;
            opacity: 0.1;
          }
          span {
            width: 80px;
            height: 20px;
            font-size: 20px;
            font-weight: 500;
            color: rgba(48, 49, 51, 1);
            line-height: 20px;
          }
          i {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .seepage {
      width: calc(100vw - 500px);
      position: relative;
      .el-menu-demo{
        background: #f2f6fc;
      }
    }
    .someline {
      width:91px;
      height:14px;
      font-size:14px;
      font-weight:400;
      color:rgba(64,158,255,1);
      line-height:14px;
      position:absolute;
      right:0px;
      top: 22px;
      z-index: 2;
    }
    .setWhiteBg {
      background: #f2f6fc;
      overflow-y: scroll;
      overflow-x: hidden;
      margin:30px 0;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
      .rightMinbox{
        height: 208px;
        background: white;
        padding: 20px 20px 0;
        display: flex;
        margin-bottom: 20px;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
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
                margin-left: 8px;
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
          i{margin-right: 5px;}
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

  .formbody{
    .settinglable{
      width: 15rem /* 240/16 */;
      margin-right:30px;;
    }
    .personnelAgeinput{
      width:5.625rem /* 90/16 */;
    }
  }

  // 任务状态样式
  .padding {color:#909399!important;}
  .run {color:#409EFF!important;}
}
</style>
<style lang="scss">
  ul, ol, li { list-style: none; }
  a { text-decoration: none; }
  a:hover { text-decoration: underline; }
  h2,h3 {font-size:20px; }
  .mainIndexCon{
    .seepage{
      // 弹窗
      .dialog{
        border-radius:15px;
      }
    }
  }

</style>


