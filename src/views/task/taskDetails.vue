<template>
  <div class="taskDetailsbox">
    <header>邮政中心局供件白班</header>
    <main>
      <div>
        <el-menu
          :default-active="detailsActiveIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color='#FFF'
          active-text-color='#409EFF'
          @select="handleSelect"
        >
          <el-menu-item index="1">任务需求</el-menu-item>
          <el-menu-item index="2">结算模式</el-menu-item>
          <el-menu-item index="3">人员要求</el-menu-item>
          <el-menu-item index="4">管理要求</el-menu-item>
        </el-menu>
        <div class="contentbox">
          <div v-if="workType == '1' ">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">创建者</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{taskDetails.customerName}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">执行人</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{taskDetails.recCustomerName}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">任务开始时间</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{taskDetails.startTime}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">任务结束时间</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{taskDetails.endTime || '长期' }}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">预期工量</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{taskDetails.expectPieceSize || '暂无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">预期总价</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{taskDetails.expectMoney || '暂无' }}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">任务说明</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{taskDetails.expectPieceSize || '暂无'}}</div></el-col>
            </el-row>
          </div>

          <div v-if="workType == '2' ">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">结算周期</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{SETTLEMENTTYPE[taskDetails.settlementType] + '结'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">计价方式</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{PRICINGMETHOD[taskDetails.valuationType]}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">单价</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{taskDetails.price | priceFor }}</div></el-col>
            </el-row>
          </div>

          <div v-if="workType == '3' ">
            <el-row v-for=" (item,index) in personnel" :key="index">
              <el-col :span="6"><div class="grid-content bg-purple">{{item.title}}</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light" v-if="item.title != '年龄范围'">{{item.value}}</div></el-col>
              <el-col :span="6" v-if="item.title == '年龄范围'">
                <div class="textItem" v-if="item.value && item.value.mageLowerLimit " >
                  {{`男 :${item.value.mageLowerLimit} - ${item.value.mageUpperLimit}岁`}}
                </div>
                <div class="textItem" v-if="item.value && item.value.fageLowerLimit ">
                  {{`女 :${item.value.fageLowerLimit} - ${item.value.fageUpperLimit}岁`}}
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-if="workType == '4' ">
            <el-row v-for=" (item,index) in manage" :key="index">
              <el-col :span="6"><div class="grid-content bg-purple">{{item.title}}</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">{{item.value}}</div></el-col>
            </el-row>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name:'taskDetails',
  data() {
    return {
      detailsActiveIndex: '1' ,// 默认
      workType: '3',  // 展示联动参数
      // taskId : this.$router.query.taskId,
      taskDetails:{},   // 任务详情数据
      price:'', // 解析后单价
      personnel:[],     // 人员管理
      manage:[],   // 管理要求
      // 结算方式 字段
      SETTLEMENTTYPE: {
        1: '日', 
        2: '月', 
        3: '', 
        4: '周', 
      },
      PRICINGMETHOD:{
        1:'计时',
        2:'计量',
        3:'计时+计量'
      }
    }
  },
  created(){
    this.getdetailslist()
  },
  mothod(){
   
  },
  methods: {
    // 获取任务详情
    getdetailslist(){
      let params = {
        taskId:113, // this.taskId
      }
      this.ApiLists.getTaskdetails(params).then(res => {
        this.taskDetails = res.data
        let result = res.data
        this.personnel = [
          {title: '每日排班人数', value: result.authorizedNumber || 0},
          {title: '所需技能标签', value: [...Object.values(result.industryMap)].join(',')},
          {title: '性别要求', value: this.$dictionary.sexLimt[result.sexLimt]},
          {title: '年龄范围', value: result } ,
          {title: '开始打卡', value: result.workStartTime},
          {title: '结束打卡', value: this.$dictionary.endWorkType[result.endWorkType] + ' ' + result.workEndTime},
          {title: '打卡方式', value: this.$dictionary.punchWay[result.punchWay]},
          {title: '打卡地点', value: result.workingPlace},
          {title: '打卡范围', value: result.punchRange + 'm'},
          {title: '人脸打卡', value:this.$dictionary.isFacePunch[result.isFacePunch]},
        ]
        this.manage = [
          {title: '排班单价审核', value:this.$dictionary.needPriceCheck[result.needPriceCheck] || '无'},
          {title: '第三方结算确认',value:this.$dictionary.needConfirm[result.needConfirm] || '无', btnShow: false, btnText: '查看设置'},
          {title: '第三方全称', value:result.thirdPerson || '无',isTrue:result.needConfirm !== 1},
          {title: '结算确认人', value:result.taskConfirms && result.taskConfirms.name || '无',isTrue:result.needConfirm !== 1},
          {title: '排班是否可修改考勤', value:this.$dictionary.isModifyPunch[result.isModifyPunch] || '无'},
          {title: '排班内奖惩限制', value:this.$dictionary.rewardLimit[result.rewardLimit] || '无', btnShow: false, btnText: '查看设置'},
          {title: '单个零工奖励上限', value:result.rewardPersonLimit || 0 + '元',isTrue:result.rewardLimit !== 1},
          {title: '每日排班奖励上限(合计)', value:result.rewardSchedulingLimit || 0 + '元',isTrue:result.rewardLimit !== 1},
        ]
      })
    },
    // 切换
    handleSelect(key, keyPath){
      console.log(key)
      this.workType = key;
    },
  }
}
</script>

<style lang="scss" scoped>
.taskDetailsbox{
  width: 100%;
  height:100%;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
  padding: 0 40px 40px;
  header{
    height: 80px;
    line-height: 80px;
    font-weight:500;
    font-size:20px;
    color:#303133;
  }
  main{
    background: #fff;
    min-height: calc(100vh - 160px);
    border-radius: 8px;
    &>div{
      border-radius: 8px;
      .contentbox{
        margin: 40px 0px 0px 40px;
        .el-row{
          margin-bottom:25px;
          font-size:14px;
          color:#606266;
        }
      }
    }
  }
}
</style>