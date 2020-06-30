<template>
  <div class="taskChangepage">
    <div class="tbody">
      <el-form class="formbody" ref="form" :model="taskChangeform" :label-position="'left'">
        <!-- 任务需求 -->
        <div class="taskRequirements">
          <el-form-item label="任务名称">
            <el-input v-model="taskChangeform.name" placeholder="请输入任务名称（不超过10个字）" maxLength="10" ></el-input>
          </el-form-item>
          <el-form-item label="发布对象">
            <el-select v-model="value7" placeholder="请选择">
              <el-option-group
                v-for="group in options3"
                :key="group.label"
                :label="group.label"
                @change="PublishingobjectsChange"
                >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <!-- <div class="block">
            <span class="demonstration">默认</span>

          </div> -->
          <el-form-item label="任务开始时间"> 
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="任务结束时间"> 
            <el-radio v-model="radio" label="1">长期</el-radio>
            <el-radio v-model="radio" label="2">短期</el-radio>
          </el-form-item>
          <el-form-item label=""> 
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预期工量">
            <el-input v-model="taskChangeform.name" placeholder="请输入预期工量（选填）" ></el-input>
          </el-form-item>
          <el-form-item label="预期总价 (元) ">
            <el-input v-model="taskChangeform.name" placeholder="请输入预期总价（选填）" ></el-input>
          </el-form-item>
          <el-form-item label="任务说明">
            <el-input v-model="taskChangeform.name" type="textarea" width placeholder="可描述现场情况和任务具体需求" ></el-input>
          </el-form-item>                                    
        </div>
        
        <!-- 人员要求 -->
        <div class="personnelRequirements" >
          <el-form-item label="每日排班人数">
            <el-input v-model="taskChangeform.name" placeholder="请输入所需人数"></el-input>
          </el-form-item>
          <el-form-item label="所需技能标签">
            <el-select v-model="value" placeholder="请选择所需技能标签">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>  
          </el-form-item>
          <el-form-item label="性别要求"> 
            <el-radio v-model="radio" label="1">只限男性</el-radio>
            <el-radio v-model="radio" label="2">只限女性</el-radio>
            <el-radio v-model="radio" label="3">男女不限</el-radio>
          </el-form-item>            
          <el-form-item label="男工占比（%）">
            <el-input v-model="taskChangeform.name" placeholder="请输入男工占比（%）"></el-input>
          </el-form-item>
          <el-form-item label="年龄范围（男）" class="personnelAge"> 
            <el-select v-model="value" placeholder="请选择" class="personnelAgeinput">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> 
            至    
            <el-select v-model="value" placeholder="请选择" class="personnelAgeinput">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>           
          </el-form-item>
          <el-form-item label="年龄范围（女）" class="personnelAge"> 
            <el-select v-model="value" placeholder="请选择" class="personnelAgeinput">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> 
            至    
            <el-select v-model="value" placeholder="请选择" class="personnelAgeinput">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>           
          </el-form-item>
          <el-form-item label="打卡要求"> 
            <el-radio v-model="radio" label="1">半点打卡</el-radio>
            <el-radio v-model="radio" label="2">不打卡</el-radio>
          </el-form-item>
          <el-form-item label="任务地点"> 
            <el-input v-model="taskChangeform.name" placeholder="请输入任务地点"></el-input>
          </el-form-item>
          <div class="mapbox">
            <baidu-map :center="center" :zoom="zoom" @ready="handler"></baidu-map>
          </div>
          <el-form-item label="打卡范围(米)"> 
            <el-input v-model="taskChangeform.name" placeholder="请输入打卡范围"></el-input>
          </el-form-item>
        </div>


        <!-- 结算要求 -->
        <div class="settlementRequirements" >
          <el-form-item label="结算周期">
            <!-- 问题图标 -->
            <el-tooltip class="questionItem cycle" effect="dark" content="Top Left 提示文字" placement="top-start">
              <img :src="questionIcon" alt="">
            </el-tooltip> 
            <el-radio v-model="radio" label="1">日结</el-radio>
            <el-radio v-model="radio" label="2">周结</el-radio>
            <el-radio v-model="radio" label="3">月结</el-radio>
          </el-form-item>
          <!-- 半点打卡 -->
          <el-form-item label="计价方式">
            <el-radio v-model="radio" label="1">计时</el-radio>
            <el-radio v-model="radio" label="2">计量</el-radio>
            <el-radio v-model="radio" label="3">计时+计量</el-radio>
          </el-form-item>
          <!-- 不打卡 -->
          <el-form-item label="计价方式">
            <div>计量</div>
          </el-form-item>
          <el-form-item label="单价" class="personnelAge"> 
            <el-input v-model="taskChangeform.name" placeholder="请输入单价" class="personnelAgeinput"></el-input> 元/小时
          </el-form-item>
        </div>     


        <!-- 管理要求 -->
        <div class="managementRequirements" >
          <el-form-item label="排班单价审核">
            <!-- 问题图标 -->
            <el-tooltip class="questionItem" effect="dark" content="Top Left 提示文字" placement="top-start">
              <img :src="questionIcon" alt="">
            </el-tooltip> 
            <el-switch v-model="value1"></el-switch>
          </el-form-item>

          <el-form-item class="special" label="第三方结算确认">
            <!-- 问题图标 -->
            <el-tooltip class="questionItem" effect="dark"  content="Top Left 提示文字" placement="top-start">
              <img :src="questionIcon" alt="">
            </el-tooltip>
            <el-switch v-model="value1"></el-switch>
          </el-form-item>

          <el-form-item>
            <div slot="label">
              <span>第三方全称</span>
              <br>
              <span style="font-size:12px;color:#909399;">用于生成客户确认表的表头</span>
            </div>
            <el-input v-model="taskChangeform.name" placeholder="请输入第三方全称" class="personnelAgeinput" style="line-height:80px; width: 240px;"></el-input> 
          </el-form-item>

          <el-form-item label="结算确认人">
            <!-- 问题图标 -->
            <el-tooltip class="questionItem" effect="dark" content="Top Left 提示文字" placement="top-start">
              <img :src="questionIcon" alt="">
            </el-tooltip>
            <el-input v-model="taskChangeform.name" placeholder="请输入单价" class="personnelAgeinput" style="width: 240px;"></el-input> <span style="color:#409EFF; cursor:pointer">新增</span>
          </el-form-item>

          <el-form-item label="排班数据修改权限">
            <!-- 问题图标 -->
            <el-tooltip class="questionItem" effect="dark" content="Top Left 提示文字" placement="top-start">
              <img :src="questionIcon" alt="">
            </el-tooltip>
            <el-switch v-model="value1"></el-switch>
          </el-form-item>

          <el-form-item label="排班内奖惩限制">
            <!-- 问题图标 -->
            <el-tooltip class="questionItem" effect="dark" content="Top Left 提示文字" placement="top-start">
              <img :src="questionIcon" alt="">
            </el-tooltip>
            <el-switch v-model="value1"></el-switch>
          </el-form-item>
          <el-form-item label="人员单笔奖励上限（元）" > 
            <el-input v-model="taskChangeform.name" placeholder="请输入金额" style="width: 240px;"></el-input>
          </el-form-item>  
          <el-form-item label="单个排班奖励上限 (合计) (元）" > 
            <el-input v-model="taskChangeform.name" placeholder="请输入金额" style="width: 240px;" ></el-input>
          </el-form-item>                      
        </div>

        <div class="bottombtnbox">
          <el-button style="margin-top: 12px;">发布</el-button> 
        </div>
      </el-form>
    </div> 
  </div>
</template>
<script>
export default {
  name:'taskChange',
  data() {
    return {
      taskChangeform:{}
    }
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
.taskChangepage{
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  .tbody{
    // width: calc(100vw - 560px);
    width:50rem /* 800/16 */;
    min-height: calc(100vh - 240px);
    background: #fff;
    padding: 40px;
    margin: 40px 0;
    .formbody{
      margin: 55px 120px 0 0px;
      .personnelAge{
        .personnelAgeinput{
          width:10rem /* 160/16 */;
        }
      }
      .questionItem{
        position: absolute;
        left: -20px;
        top: 13px;
      }
      // 周期
      .cycle{
        left: -70px;
      }
      .el-input,.el-select,.el-textarea{
        width:21.875rem /* 350/16 */;
      }
      .managementRequirements{
        .el-form-item{
          .el-form-item__label{
            min-width:13.125rem /* 210/16 */;
          }
        }
        .el-form-item__content{
          div{
            margin-left: 8.75rem /* 140/16 */;
          }
        }
      }
      .special{
        .el-form-item__content{
          margin-left:0;
        }
      }
    }
    .bottombtnbox{
      display: flex;
      justify-content: center;
    }
  }
}
.mapbox {
  margin: 20px 8.625rem /* 138/16 */;
  div{
    width: 20rem /* 320/16 */;
    height: 10rem /* 160/16 */;
  }
}
</style>
