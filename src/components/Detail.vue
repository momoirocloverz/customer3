<template>
    <div class="detail-box">
        <el-dialog :title="detailInfo.title + '详情'" :visible.sync="showDetail" class="" width="450px" :close-on-click-modal="true" :before-close="close">
            <div class="">
                <div class="flex-box detail-item">
                    <span>员工姓名</span>
                    <span>{{ detailInfo.talentName }}</span>
                </div>
                <div class="flex-box detail-item" v-show="!( ( detailInfo.type&&detailInfo.type != '系统使用费')&&(detailInfo.title&&detailInfo.title.includes('扣款')) )">
                    <span>排班名称</span>
                    <span>{{ detailInfo.schedulingName }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.punchStartTime && detailInfo.title.includes('收入')">
                    <span>开始打卡</span>
                    <span>{{ detailInfo.punchStartTime | dateTimeFor }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.punchEndTime && detailInfo.title.includes('收入')">
                    <span>结束打卡</span>
                    <span>{{ detailInfo.punchEndTime | dateTimeFor}}</span>
                </div>
                <div class="flex-box detail-item" v-show="!( ( detailInfo.type&&detailInfo.type != '系统使用费')&&(detailInfo.title&&detailInfo.title.includes('扣款')) )">
                    <span>技能标签</span>
                    <span>{{ detailInfo.industryName }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.settlementTypeName && detailInfo.title.includes('收入')">
                    <span>结算周期</span>
                    <span>{{ detailInfo.settlementTypeName }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.commitPop && detailInfo.title.includes('奖惩')">
                    <span >提交人</span>
                    <span >{{ detailInfo.commitPop }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.type && detailInfo.title.includes('奖惩')">
                    <span>奖惩类型</span>
                    <span>{{ detailInfo.type }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.createdAt && detailInfo.title.includes('奖惩')">
                    <span>提交日期</span>
                    <span>{{ detailInfo.createdAt | dateFor }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.workTimeHours && detailInfo.title.includes('收入')">
                    <span>工时</span>
                    <span>{{ detailInfo.workTimeHours }}小时</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.title && detailInfo.title.includes('收入')">
                    <span>产量</span>
                    <span>{{ detailInfo.pieceSize | pieceSizeFor}}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.salary && detailInfo.title.includes('收入')">
                    <span>单价</span>
                    <span>{{ detailInfo.salary | filtersFor}}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.salaryTotal && detailInfo.title.includes('收入')">
                    <span>结算收入</span>
                    <span class="co-red">{{ detailInfo.salaryTotal }}元</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.salaryTotal && detailInfo.title.includes('奖惩')">
                    <span>奖惩金额</span>
                    <span class="co-red">{{ detailInfo.salaryTotal }}元</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.note && detailInfo.title.includes('奖惩')">
                    <span>奖惩事项</span>
                    <span class="">{{ detailInfo.note }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.type && detailInfo.title.includes('扣款')">
                    <span>扣款类型</span>
                    <span class="">{{ detailInfo.type }}</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.salaryTotal && detailInfo.title.includes('扣款')">
                    <span>扣款金额</span>
                    <span class="co-red">{{ detailInfo.salaryTotal }}元</span>
                </div>
                <div class="flex-box detail-item" v-show="detailInfo.createdAt && detailInfo.title.includes('扣款')">
                    <span>扣款日期</span>
                    <span class="">{{ detailInfo.createdAt | dateForHour }}</span>
                </div>
                <!--<div class="flexHere pt20 tc">-->
                    <!--<el-button type="info" size="small" class="sameWidthBtn"  @click="close()">关 闭</el-button>-->
                <!--</div>-->
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'detailBox',
    props:{
        showDetail: [Boolean],
        cancel: [Function],
        detailInfo:{
            type:Object,
        },
    },
    data(){
        return {
        }
    },
    filters:{
        typeFor(val){
            if(val == 1){
                return '小b'
            }else if(val == 2){
                return '大B'
            }else{
                return ''
            }
        }
    },
    mounted(){
    },
    methods:{
        close(){
            this.cancel()
        }
    },
}
</script>
<style lang="scss">
    .detail-box {
        .el-dialog__body{
            padding-top:10px;
        }
        .el-dialog{
            border-radius:10px;
        }
        .detail-item{
            text-align: left;
            line-height: 30px;
            span{
                display: inline-block;
                min-width:100px;
            }
        }
    }
</style>