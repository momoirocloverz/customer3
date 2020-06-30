<template>
  <div class="rewardAndPunishmentCon"> 
        <div class="searchCon">
            <div class="leftPart">
                <el-date-picker v-model="month" type="month" class="setInputWidth" placeholder="选择月" value-format="yyyy-MM" @change="commonFetch"></el-date-picker>
                <el-select v-model="type" placeholder="类型" class="setInputWidth" @change="">
                            <el-option v-for="(item,index) in options1" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                </el-select>
                <el-select v-model="status" placeholder="状态" class="setInputWidth" @change="">
                            <el-option v-for="(item,index) in options2" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="rightPart">
                <el-button size="small" type="primary" @click="">添加奖惩</el-button>
            </div>
        </div>
        <div class="listCon">
            <template v-for="(item,index) in resArr">
                <div class="itemCon">
                    <div class="upperPart">
                        <div class="betweenFlex">
                            <div>{{item.talentName}}——{{item.typeName}}</div>
                            <div>{{item.amount > 0 ? '+'+item.amount : item.amount }}</div>
                        </div>
                        <div class="startFlex">
                            <div>
                                <div>所属排班</div>
                                <div></div>
                            </div>
                            <div>
                                <div>奖惩事项</div>
                                <div></div>
                            </div>
                        </div>
                        <div class="startFlex">
                            <div>
                                <div>提交人</div>
                                <div></div>
                            </div>
                            <div>
                                <div>提交日期</div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div class="bottomPart">
                        
                    </div>
                </div>
            </template>
        </div>
  </div>
</template>
<script>
export default {
  name: 'rewardAndPunishment',
  data() {
    return {
        resArr:[],
        month:'',
        type:'',
        options1:[
            {label:'类型',value:''},
        ],
        status:'',
        options2:[
            {label:'状态',value:''},
            {label:'待审核',value:'1'},
            {label:'已同意',value:'2'},
            {label:'已驳回',value:'3'},
            {label:'已撤回',value:'4'},
            {label:'已撤销',value:'5'},
            {label:'已支付',value:'6'},
        ],
        current:1,
    }
  },
   mounted(){
       this.fetchLists();
   },
  methods: {
      commonFetch(){
          this.current = 1;
          this.fetchLists();
      },
      fetchLists(){
          let params = {
              pageNum:this.current,
              pageSize:20,
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
        padding: 30px 40px 40px;
        box-sizing: border-box;
        background-color: #fff;
        margin-left: 40px;
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