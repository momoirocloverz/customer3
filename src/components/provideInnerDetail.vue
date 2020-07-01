<template>
    <div class="provideInnerDetailCon">
        <div v-if="detailInfo.title == '排班收入' ">
            <div class="localFlex">
                <div>人员姓名</div>
                <div>{{ detailInfo.obj.talentName }}</div>
            </div>
            <div class="localFlex">
                <div>排班名称</div>
                <div>{{ detailInfo.obj.schedulingName }}</div>
            </div>
            <div class="localFlex">
                <div>开始打卡</div>
                <div>{{ detailInfo.obj.punchStartTime | dateTimeFor }}</div>
            </div>
            <div class="localFlex">
                <div>结束打卡</div>
                <div>{{ detailInfo.obj.punchEndTime | dateTimeFor  }}</div>
            </div>
            <div class="localFlex">
                <div>技能标签</div>
                <el-tooltip class="item" effect="dark" :content="detailInfo.obj.industryName " placement="bottom">
                  <div class="setLimitWidth">{{ detailInfo.obj.industryName }}</div>
                </el-tooltip>
            </div>
            <div class="localFlex">
                <div>结算周期</div>
                <div>{{ detailInfo.obj.settlementTypeName }}</div>
            </div>
            <div class="localFlex">
                <div>工时</div>
                <div>{{ detailInfo.obj.workTimeHours }}小时</div>
            </div>
            <div class="localFlex">
                <div>产量</div>
                <div>{{ detailInfo.obj.pieceSize | pieceSizeFor }}</div>
            </div>
            <div class="localFlex">
                <div>单价</div>
                <el-tooltip class="item" effect="dark" :content="detailInfo.obj.salary | filtersFor" placement="bottom">
                  <div class="setLimitWidth">{{ detailInfo.obj.salary | filtersFor }}</div>
                </el-tooltip>
            </div>
            <div class="localFlex">
                <div>结算收入</div>
                <div class="co-red">{{ detailInfo.obj.salaryTotal }}元</div>
            </div>            
        </div>
        <div v-if="detailInfo.title == '奖惩' ">
            <div class="localFlex">
                <div>人员姓名</div>
                <div>{{ detailInfo.obj.talentName }}</div>
            </div>
            <div class="localFlex">
                <div>排班名称</div>
                <div>{{ detailInfo.obj.schedulingName }}</div>
            </div>
            <div class="localFlex">
                <div>技能标签</div>
                <el-tooltip class="item" effect="dark" :content="detailInfo.obj.industryName" placement="bottom">
                  <div class="setLimitWidth">{{ detailInfo.obj.industryName }}</div>
                </el-tooltip>
            </div>
            <div class="localFlex">
                <div>提交人</div>
                <div>{{ detailInfo.obj.commitPop }}</div>
            </div>
            <div class="localFlex">
                <div>奖惩类型</div>
                <div>{{ detailInfo.obj.type }}</div>
            </div>
            <div class="localFlex">
                <div>提交日期</div>
                <div>{{ detailInfo.obj.createdAt | dateFor}}</div>
            </div>
            <div class="localFlex">
                <div>奖惩金额</div>
                <div class="co-red">{{ detailInfo.obj.salaryTotal }}元</div>
            </div>
            <div class="localFlex">
                <div>奖惩事项</div>
                <div>{{ detailInfo.obj.note }}</div>
            </div>
        </div>
        <div v-if="detailInfo.title == '扣款' ">
             <div class="localFlex">
                <div>人员姓名</div>
                <div>{{ detailInfo.obj.talentName }}</div>
            </div>
            <div class="localFlex" v-if="detailInfo.obj.type == '系统使用费' ">
                <div>排班名称</div>
                <div>{{ detailInfo.obj.schedulingName }}</div>
            </div>
            <div class="localFlex" v-if="detailInfo.obj.type == '系统使用费' ">
                <div>技能标签</div>
                <el-tooltip class="item" effect="dark" :content="detailInfo.obj.industryName" placement="bottom">
                  <div class="setLimitWidth">{{ detailInfo.obj.industryName }}</div>
                </el-tooltip>
            </div>
            <div class="localFlex">
                <div>扣款类型</div>
                <div><span v-if="detailInfo.obj.type == '系统使用费' ">{{ detailInfo.obj.feeDate |cutter }}</span>{{ detailInfo.obj.type }}</div>
            </div>
            <div class="localFlex">
                <div>扣款金额</div>
                <div class="greenHere">{{ detailInfo.obj.salaryTotal }}元</div>
            </div>
            <div class="localFlex">
                <div>扣款日期</div>
                <div>{{ detailInfo.obj.createdAt | dateForHour }}</div>
            </div>
        </div>
      
    </div>
</template>
<script>
export default {
    name: 'provideInnerDetail',
    props:{
         detailInfo:{
            type:Object,
        },
    },
    data(){
        return {
        }
    },
    filters:{
        cutter(val){
            if( val ){
                let arr = val.split('-');
                return arr[1]+arr[2];
            }
        },
    },
}
</script>
<style scoped lang="scss">
    .provideInnerDetailCon {
        color: #606266;
        .greenHere {
            color: #67C23A;
        }
        .localFlex{
            line-height: 32px;
            height: 32px;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            .setLimitWidth {
                max-width: 280px;
                height: 32px;
                overflow: hidden;
            }
            div {
                &:nth-child(1){
                    width: 70px;
                } 
                &:nth-child(2){
                    margin-left: 20px;
                } 
            }
        }
    }
</style>