<template>
  <div class="rewardAndPunishmentCon"> 
        <div class="searchCon">
            <div class="leftPart">
                <el-date-picker v-model="month" type="month" class="setInputWidth" placeholder="选择月" value-format="yyyy-MM" @change="commonFetch"></el-date-picker>
                <el-select v-model="type" placeholder="类型" class="setInputWidth" @change="commonFetch">
                            <el-option v-for="(item,index) in options1" :key="item.dicVal"  :label="item.dicName"  :value="item.dicVal"></el-option>
                </el-select>
                <el-select v-model="status" placeholder="状态" class="setInputWidth" @change="commonFetch">
                            <el-option v-for="(item,index) in options2" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="rightPart">
                <el-button size="small" type="primary" @click="popAdd">添加奖惩</el-button>
            </div>
        </div>
        <div class="listCon">
            <div v-if="!resArr.length" class="nothing">暂无数据</div>
            <template v-for="(item,index) in resArr">
                <div class="itemCon">
                    <div class="upperPart">
                        <div class="betweenFlex">
                            <div class="biggest">{{item.talentName}}—{{item.typeName}}</div>
                            <div class="amountStyle" :class="{redAmount:item.amount > 0,greenAmount: item.amount < 0}" >{{item.amount > 0 ? '+'+item.amount : item.amount }}元</div>
                        </div>
                        <div class="startFlex mt20 mb20">
                            <div class="startFlex divide">
                                <div class="itemHead">所属排班</div>
                                <div class="itemDetail">{{item.schedulingName}}</div>
                            </div>
                            <div class="startFlex divide">
                                <div class="itemHead">奖惩事项</div>
                                <div class="itemDetail">{{item.note}}</div>
                            </div>
                        </div>
                        <div class="startFlex">
                            <div class="startFlex divide">
                                <div class="itemHead">提交人</div>
                                <div  class="itemDetail">{{ item.commitUserName }}</div>
                            </div>
                            <div class="startFlex divide">
                                <div class="itemHead">提交日期</div>
                                <div class="itemDetail">{{ item.createdAt | stableDatefilter2}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="bottomPart">
                        <div class="betweenFlex bottomCon">
                            <div class="startFlex bottomHead" :class="{bottomRed:item.status==3 }">
                                <div>{{ statusMap[item.status] }}</div>
                                <div v-if="item.reviewdPop">（审核人：{{ item.reviewdPop }}）</div>
                            </div>
                            <div v-if="getWebInfo.customerInfo.type == '2' ">
                                <div class="betweenFlex">
                                    <div v-if="item.status==1">
                                        <el-button type="info" size="mini" @click="popDialog(item,'1')">驳回</el-button>
                                    </div>
                                    <div class="ml20" v-if="item.status==1">
                                        <el-button type="info" size="mini" @click="popDialog(item,'2')">同意</el-button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="getWebInfo.customerInfo.type == '1' ">
                                <div v-if="item.status==1">
                                    <el-button type="info" size="mini" @click="popDialog(item,'3')">撤回</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <el-dialog title="添加奖惩"  :visible.sync="rewardVisible" width="480px" :close-on-click-modal="false" :before-close="handleClose" class="setRoot1Scoped setMiddleDialog" >
            <div>
                <el-form :model="rewardForm" label-position="left" ref="rewardForm" label-width="120px" class="demo-ruleForm" :rules="rewardRules">
                    <el-form-item label="奖惩对象" prop="role">
                        <el-select v-model="rewardForm.role" placeholder="请选择奖惩对象" size="small" class="setSelectWidth" @change="setMissions">
                            <el-option v-for="item in optionsRoles" :key="item.talentId" :label="item.talentName" :value="item.talentId">
                                <span >{{ item.talentName }}</span>
                                <span class="ml10">{{ item.sex == 2 ? '女' :'男' }}</span>
                                <span class="ml10">{{ item.age }}岁</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="奖惩类型" prop="type">
                        <el-select v-model="rewardForm.type" placeholder="请选择奖惩类型" size="small" class="setSelectWidth">
                            <el-option v-for="item in options1Copy" :key="item.dicVal" :label="item.dicName" :value="item.dicVal"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="奖惩事情" prop="note">
                        <el-input v-model="rewardForm.note" size="small" placeholder="请输入奖惩事情（例：迟到）" maxLength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="金额" prop="amount">
                        <el-input-number size="small" controls-position="right" v-model="rewardForm.amount" class="setSelectWidth" placeholder="请输入金额" :precision="2" :step="0.1" :max="99999999"></el-input-number>
                        
                    </el-form-item>
                    <el-form-item label="任务" prop="task">
                        <el-select v-model="rewardForm.task" placeholder="请选择任务" size="small" class="setSelectWidth" @change="taskChange(rewardForm.task)">
                            <el-option v-for="item in optionsMissions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排班日期" prop="date1">
                        <el-select v-model="rewardForm.date1" placeholder="请选择排班日期" size="small" class="setSelectWidth" @change="dateChange(rewardForm.date1)">
                            <el-option v-for="item in dateOptions" :key="item.key" :label="item.key" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="技能标签" prop="skill">
                        <el-select v-model="rewardForm.skill" placeholder="请选择技能标签" size="small" class="setSelectWidth">
                            <el-option v-for="item in skillOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>                        
                    </el-form-item>
                    <div class="endSet">
                        <el-button type="primary" size="mini" @click="submit('rewardForm')">确认添加</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>

    <el-dialog :title="dialogTitle"  :visible.sync="cuteVisible" width="480px" :close-on-click-modal="false" class="setRoot2Scoped setMiddleDialog" >
        <div>
            <div class="">确认{{dialogTitle}}吗？</div>
            <div class="flexBtnCon">
                <el-button type="info" size="small" @click="cancelGhostAction">取消</el-button>
                <el-button type="primary" size="small" @click="confirmGhostAction">确认</el-button>
            </div>
        </div>
    </el-dialog>

  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'rewardAndPunishment',
  data() {
    return {
        cuteVisible:false,
        dialogTitle:'驳回',
        currentTarget:{},
        trackType:'1',
        titleMap:{
            1:'驳回',
            2:'同意',
            3:'撤回',
        },
        rewardForm:{
            role:'',
            type:'',
            note:'',
//            amount:'',
            task:'',
            date1:'',
            skill:'',
        },
        rewardRules:{
            role:[
                { required: true, message: '请选择奖惩对象', trigger: 'blur' },
            ],
            type:[
                { required: true, message: '请选择奖惩类型', trigger: 'blur' },
            ],
            note:[
                { required: true, message: '请输入奖惩事情', trigger: 'blur' },
            ],
            amount:[
                { required: true, message: '请输入金额', trigger: 'blur' },
            ],
            task:[
                { required: true, message: '请选择任务', trigger: 'blur' },
            ],
            date1:[
                { required: true, message: '请选择排班日期', trigger: 'blur' },
            ],
            skill:[
                { required: true, message: '请选择技能标签', trigger: 'blur' },
            ],
        },
        optionsRoles:[],
        rewardVisible:false,
        resArr:[],
        month:'',
        type:'',
        options1:[{dicName:'类型',dicVal:''}],
        options1Copy:[],
        optionsMissions:[],
        dateOptions:[],
        skillOptions:[],
        statusMap:{
            1:'待审核',
            2:'已通过',
            3:'已驳回',
            4:'已撤回',
            5:'已撤销'
        },
        status:'',
        options2:[
            {label:'状态',value:''},
            {label:'待审核',value:'1'},
            {label:'已通过',value:'2'},
            {label:'已驳回',value:'3'},
         /*   {label:'已撤回',value:'4'},
            {label:'已撤销',value:'5'},
            {label:'已支付',value:'6'},*/
        ],
        current:1,
        optionsTypes:[],
    }
  },
    computed:{
        ...mapGetters([
            'getWebInfo',
        ]),
    },
   mounted(){
       this.initOptions1();
       this.fetchLists();
   },
  methods: {
      cancelGhostAction(){
          this.cuteVisible = false;
      },
      confirmGhostAction(){
          let data = {
              id:this.currentTarget.id,
          };
          let tempMap = {
              1:3,
              2:1,
              3:4,
          };
          data.oper = tempMap[this.trackType];
          this.ApiLists.operateRewardAndPunish(data).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.$message({
                    message: `${this.dialogTitle}成功`,
                    type: 'success'
                });
                  this.cuteVisible = false;
                  this.fetchLists();
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      popDialog(item,flag){
          this.trackType = flag;
          this.dialogTitle = this.titleMap[flag];
          this.cuteVisible = true;
          this.currentTarget = item;
      },
      submit(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  console.log('submit!');
                  this.addAction();
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      addAction(){
          let data = {
              talentId:this.rewardForm.role,
              taskId:this.rewardForm.task,
              schedulingDate:this.rewardForm.date1,
              industry:this.rewardForm.skill,
              amount:this.rewardForm.amount,
              note:this.rewardForm.note,
              type:this.rewardForm.type,
          };
          let find1 = this.optionsRoles.find(ele=>{
              return ele.talentId == this.rewardForm.role
          })
          data.talentName = find1.talentName;
          let find2 = this.options1Copy.find(ele=>{
              return ele.dicVal == this.rewardForm.type
          })
          let find3 = this.dateOptions.find(ele=>{
              return ele.key == this.rewardForm.date1
          })
          let find4 = this.skillOptions.find(ele=>{
              return ele.key == this.rewardForm.skill
          })
          data.typeName = find2.dicName;
          data.schedulingName = find3.schedulingName;
          data.schedulingId = find3.schedulingId;
          data.industryName = find4.value;
          this.ApiLists.addRewardAndPunish(data).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                  this.rewardVisible = false;
                  this.fetchLists();
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      handleClose(){
          this.rewardVisible = false;
      },
      dateChange(val){
          let params1 = {
              talentId:this.rewardForm.role,
              taskId:this.rewardForm.task,
              schedulingDate:val,
          };
          this.ApiLists.getLinkAgeIndustry(params1).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.skillOptions = data;
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      taskChange(val){
          let params1 = {
              talentId:this.rewardForm.role,
              taskId:this.rewardForm.task
          };
          this.ApiLists.getLinkAgeBatch(params1).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.dateOptions = data;
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      setMissions(){
          let params1 = {
              talentId:this.rewardForm.role
          };
          this.ApiLists.getLinkAgeTask(params1).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.optionsMissions = data;
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      popAdd(){
          this.rewardVisible = true;
          this.ApiLists.rewardAndPunishGetUser().then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.optionsRoles = data;
              }
          }).catch(err=>{
              console.log('err',err);
          })
          this.$nextTick(()=>{
              this.$refs['rewardForm'].resetFields();
          })
      },
      initOptions1(){
          let params = {
              code:'rnpType',
              level:1
          };
          this.ApiLists.getByCodeAndLevel(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.options1 = [  {dicName:'类型',dicVal:''},...data];
                  this.options1Copy = data;
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      commonFetch(){
          this.current = 1;
          this.fetchLists();
      },
      fetchLists(){
          let params = {
              pageNum:this.current,
              pageSize:10000,
              month:this.month,
              type:this.type,
              status:this.status,
          };
          this.ApiLists.rewardAndPunishLists(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.resArr = data.list || [];
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
  }
}
</script>
<style lang="scss" scoped>
    .rewardAndPunishmentCon {
        margin-bottom: 40px;
        padding: 30px 40px 40px;
        background-color: #fff;
        margin-left: 40px;
        box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
        border-radius:8px;
        .flexBtnCon {
            display: flex;
            justify-content: flex-end;
            align-content: center;
            align-items: center;
            margin-top: 30px;
        }
        .endSet {
            text-align: end;
        }
        .setSelectWidth {
            width: 100%;
        }
        .biggest {
            color: #303133;
            font-size: 20px;
            font-weight: 500;
            line-height: 20px;
        }
        .nothing {
            text-align: center;
            font-size: 14px;
            color: #606266;
        }
        .bottomCon {
            margin-top: 16px;
        }
        .bottomHead {
            color: #909399;
            font-size: 16px;
            line-height: 16px;
        }
        .bottomRed {
            color: #F56C6C;
        }
        .amountStyle {
            font-weight: 500;
            font-size: 20px;
            line-height: 20px;
        }
        .redAmount {
            color: #F56C6C;
        }
        .greenAmount {
            color: #67C23A;
        }
        .divide {
            width: 50%;
        }
        .itemHead {
            width: 56px;
            color: #606266;
            font-size: 14px;
            line-height: 14px;
        }
        .itemDetail {
            color: #606266;
            font-size: 14px;
            line-height: 14px;
            margin-left: 20px;
            font-weight: 500;
        }
        .betweenFlex {
            display: flex;
            justify-content:space-between;
            align-content: center;
            align-items: center;
        }
        .startFlex {
            display: flex;
            justify-content:flex-start;
            align-content: center;
            align-items: center;
        }
        .setInputWidth {
            width: 160px;
            margin-right: 20px;
        }
        .searchCon {
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            margin-bottom: 30px;
            .leftPart {
                
            }
            .rightPart {
                
            }
        }
        .listCon {
            .itemCon {
                height:200px;
                background:#fff;
                border-radius:4px;
                border:1px solid rgba(220,223,230,1);
                margin-bottom: 20px;
                &:last-child {
                    margin-bottom: 0;
                }
                padding: 20px;
                box-sizing: border-box;
                .upperPart {
                    height: 110px;
                    border-bottom:1px solid rgba(220,223,230,1);
                }
                .bottomPart {
                    
                }
            }
        }
    }
</style>
<style lang="scss">
    .rewardAndPunishmentCon {
        .setRoot2Scoped {
            .el-dialog {
                height: 200px;
                border-radius: 5px;
            }
        }
        .setRoot1Scoped {
            .el-dialog {
                height: 510px;
                border-radius: 5px;
            }
            .el-form-item {
                margin-bottom: 15px;
            }
            .el-dialog__body {
                padding: 10px 20px 0;
            }
        }
    }
</style>