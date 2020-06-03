<template>
    <div class="comNorInnerCon" v-loading="loading">
        <div class="topPart">
            <div class="goBackHere" v-if="orderStatus == '1' ">
                <span @click="goBack"><i class="el-icon-arrow-left"></i>返回订单详情</span>
            </div>
            <div class="orderNo">
                <span>订单</span><span>{{ orderNo }}</span><span class="ml10">{{ name }}</span>
            </div>
        </div>
        <div class="bottomPart">
            <div class="searchArea" @keyup.enter="searchAction">
                <div>
                    <el-select v-model="status" class="mr20" placeholder="收入明细类型" size="small" @change="searchAction">
                        <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-date-picker v-model="daterange" type="daterange"  range-separator="至"  start-placeholder="排班日期" end-placeholder="排班日期" size="small" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" @change="searchAction">
                    </el-date-picker>
                </div>
                <div>
                    <el-input v-model="taskName" size="small" placeholder="任务名称" class="limitInput" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="tableCon">
                <div class="sumInfoCon">
                    <div class="sumTextCon">合计：{{totalPop}}人；排班收入{{salary}}元；奖惩{{rewardAndPublish}}元；扣款{{deduction}}元；合计收入{{salaryTotal}}元</div>
                    <div>
                        <el-button type="danger" size="small" v-if="multiple" @click="multipleDelete"  :disabled="! !!multipleArr.length" >批量删除</el-button>
                        <el-button type="primary" size="small" v-if="showExport" @click="exportExcel">导出明细</el-button>
                    </div>
                </div>
                <el-table :data="tableData" style="width: 100%;margin-top:20px" empty-text="暂无相关信息"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" v-if="multiple" width="100"></el-table-column>
                    <el-table-column label="收入明细类型" >
                        <template v-slot="scope">
                            <div>{{ typeMap[scope.row.type] || '-'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="salary" label="应发金额" ></el-table-column>
                    <el-table-column prop="taskName" label="任务名称" ></el-table-column>
                    <el-table-column label="排班日期" >
                        <template v-slot="scope">
                            <div>{{ scope.row.schedulingDate | stableDatefilter2}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" >
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="checkDetail(scope.row)">查看详情</el-button>
                            <el-button class="deleteRed" type="text" size="small" @click="popDelete(scope.row)" v-if="multiple">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagCon mt10 mb10" v-if="total">
                <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="currentPage4"  :page-sizes="[5, 10, 20]" :page-size="pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="info.title + '详情'"  class="setMiddleDialog resetStyle" width="450px" :close-on-click-modal="false" :visible.sync="showDetail" :class="{setRoot1Scoped:root1On,setRoot2Scoped:root2On,setRoot3Scoped:root3On}" >
            <PopDetail :detailInfo="info"/>
        </el-dialog>
    </div>
</template>
<script>
    import PopDetail from '@/components/provideInnerDetail.vue';
    export default {
        name: 'comNorInner',
        components:{ PopDetail },
        data() {
            return {
                loading:true,
                multipleArr:[],                
                info:{},
                showDetail:false,
                orderNumber:'',
                daterange:'',
                status:'',
                options:[
                    {
                        value: '0',
                        label: '不限'
                    }, 
                    {
                        value: '1',
                        label: '排班收入'
                    },
                    {
                        value: '2',
                        label: '奖惩'
                    },
                    {
                        value: '3',
                        label: '扣款'
                    }
                ],
                typeMap:{
                    1:'排班收入',
                    2:'奖惩',
                    3:'扣款',
                },
                tableData:[],
                currentPage4:1,
                total:0,
                pageSize:20,
                orderNo:'',
                root1On:false,
                root2On:false,
                root3On:false,
                multiple:false,
                showExport:false,
                id:'',
                talentId:'',
                salaryTotal:0,
                rewardAndPublish:0,
                deduction:0,
                salary:0,
                totalPop:0,
                name:'',
                taskName:'',
                orderStatus:'',
                payWay:'',
            }
        },
        mounted(){
            this.analyseQuery();
            this.searchAction();
        },
        methods: {
            analyseQuery(){
                let { orderNo,talentName,talentId,id,multiple,showExport,status,payWay } = this.$route.query;
                this.orderStatus = status;
                this.id = id;
                this.payWay = payWay;
                this.talentId = talentId;
                this.name = talentName;
                this.orderNo = orderNo;
                if( multiple ){
                    this.multiple = true;
                }else{
                    this.multiple = false;
                }
                if( showExport ){
                    this.showExport = true;
                }else{
                    this.showExport = false;
                }
            },
            goBack(){
                this.$router.go(-1);
            },
            commonSearch(){
                let data = this.geneParams();
                data.pageNum = this.currentPage4;
                data.pageSize = this.pageSize;
                data.orderId = this.id;
                data.talentId = this.talentId;
                data.taskName = this.taskName;
                data.type = this.status;
                if( this.status == '0' ){
                    delete data.type;
                }
                this.requestList( data );
            },
            searchAction(){
                let data = this.geneParams();
                data.pageNum = this.currentPage4 = 1;
                data.pageSize = this.pageSize;
                data.orderId = this.id;
                data.talentId = this.talentId;
                data.taskName = this.taskName;
                data.type = this.status;
                if( this.status == '0' ){
                    delete data.type;
                }
                this.requestList( data );
            },
            exportExcel(){
                let params = {
                    orderId:this.id,
                    orderNo:this.orderNo,
                    talentName:this.name,     
                    talentId:this.talentId,
                    status:this.orderStatus,
                };
                if( this.payWay ){
                    params.payWay = this.payWay
                }
                this.ApiLists.orderExport(params).then(res=>{
                    let { data,respCode } = res;
                    if( respCode == 0 ){
                        window.open(data);
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            multipleDelete(){
                let array = this.multipleArr.map((ele)=>{
                    return ele.orderSubId
                })
                this.$confirm('确认删除这些条目', '确认删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.deleteAction(array);
                }).catch(() => {  
                });
            },
            deleteAction(array){
                let params = {
                    orderId:this.id,
                    orderSubId:array,
                };
                this.ApiLists.subDeletePayOrder(params).then(res=>{
                    let { respCode } = res;
                    if( respCode == 0 ){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.commonSearch();
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            handleSelectionChange(val){
                this.multipleArr = val;
            },
            popDelete(row){
                this.$confirm('确认删除该条目', '确认删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.deleteAction([row.orderSubId]);
                }).catch(() => {  
                });
            },
            requestList(data){
                this.ApiLists.orderPayOrderDetail(data).then(res=>{
                    this.loading = true;
                    let { data,respCode } = res;
                    if( respCode == 0 ){
                        if( data&&data.talentSalaryReocrdVOPageInfo&&data.talentSalaryReocrdVOPageInfo.list ){
                            this.total = data.talentSalaryReocrdVOPageInfo.total;
                            this.tableData = data.talentSalaryReocrdVOPageInfo.list;
                        }else{
                            this.total = 0;
                            this.tableData = [];
                        }
                        if( data&&data.salaryReocrdToTalVO ){
                            this.salaryTotal = data.salaryReocrdToTalVO.salaryTotal || 0;
                            this.rewardAndPublish = data.salaryReocrdToTalVO.rewardAndPublish || 0;
                            this.deduction = data.salaryReocrdToTalVO.deduction || 0;
                            this.salary = data.salaryReocrdToTalVO.salary || 0;
                            this.totalPop = data.salaryReocrdToTalVO.totalPop || 0;
                        }
                    }
                }).catch(err=>{
                    console.log('err',err);
                }).finally(()=>{
                    setTimeout(()=>{
                        this.loading = false;
                    },500);
                })
            },
            geneParams(){
                let data = {};
                let arr = [];
                let inputParamsMap = {
                };
                arr.forEach(ele=>{
                    if( this[ele] ){
                        data[inputParamsMap[ele]] = this[ele];
                    }
                });
                let dateParams = [ 'schedulingDateStart','schedulingDateEnd' ];
                if( this.daterange ){
                    dateParams.forEach((ele,index)=>{
                        data[ele] = this.daterange[index];
                    });
                }   
                return data;
            },
            branchAction(bridge,type){
                switch ( type ){
                    case 1:
                        this.root1On = true;
                        this.root2On = false;
                        this.root3On = false;
                        this.info = {
                            title:'排班收入',
                            obj:{
                                talentName:bridge.talentName,
                                schedulingName:bridge.schedulingName,
                                industryName:bridge.industryName,
                                punchStartTime:bridge.punchStartTime,
                                punchEndTime:bridge.punchEndTime,
                                settlementTypeName:bridge.settlementTypeName,
                                workTimeHours:bridge.workTimeHours,
                                salary:bridge.salary,
                                salaryTotal:bridge.salaryTotal,
                                pieceSize:bridge.pieceSize
                            },
                        };
                        break;
                    case 2:
                        this.root1On = false;
                        this.root2On = true;
                        this.root3On = false;
                        this.info = {
                            title:'奖惩',
                            obj:{
                                talentName:bridge.talentName,
                                schedulingName:bridge.schedulingName,
                                industryName:bridge.industryName,
                                commitPop:bridge.commitPop,
                                type:bridge.type,
                                createdAt:bridge.createdAt,
                                salaryTotal:bridge.salaryTotal,
                                note:bridge.note,
                            },
                        };
                        break;
                    case 3:
                        this.root1On = false;
                        this.root2On = false;
                        this.root3On = true;
                        this.info = {
                            title:'扣款',
                            obj:{
                                talentName:bridge.talentName,
                                schedulingName:bridge.schedulingName,
                                industryName:bridge.industryName,
                                type:bridge.type,
                                salaryTotal:bridge.salaryTotal,
                                createdAt:bridge.createdAt,
                            },
                        };
                        break;    
                }
            },
            checkDetail(row){
                this.root1On = false;
                this.root2On = false;
                this.root3On = false;
                this.info = {};                
                let params = {
                    talentSalaryId:row.orderSubId,
                    type:row.type
                };
                this.ApiLists.orderFrameDetail(params).then(res=>{
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        this.showDetail = true;
                        this.branchAction(data,row.type);
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            handleSizeChange(val){
                this.currentPage4 = 1;
                this.pageSize = val;
                this.commonSearch();
            },
            handleCurrentChange(val){
                this.currentPage4 = val;
                this.commonSearch();
            },
        },
    }
</script>
<style scoped lang="scss">
    .comNorInnerCon {
        .limitInput {
            width: 200px;
        }
        .goBackHere {
            color: #409EFF;
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 30px;
            span {
                cursor: pointer;
            }
        }
        .orderNo {
            height:20px;
            font-size:20px;
            font-weight:500;
            color:#303133;
            line-height:20px;
        }
        .topPart {
            margin-bottom: 30px;
        }
        .pagCon {
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
        }
        .sumInfoCon {
            display: flex;
            justify-content:space-between;
            align-content: center;
            align-items: center;
        }
        .sumTextCon {
            font-size: 14px;
            color: #303133;
            font-weight: 400;
        }
        .deleteRed {
            color: #F56C6C;
        }
        .bottomPart {
            padding: 30px 40px;
            box-sizing: border-box;
            background-color: #fff;
            box-shadow:0px 2px 8px 0px rgba(0,0,0,0.05);
            border-radius:10px;  
            .searchArea {
                display: flex;
                justify-content: space-between;
                align-content: center;
                align-items: center;
                margin-bottom: 30px;
            }
        }
    }
</style>
<style lang="scss">
    .comNorInnerCon {
        .resetStyle {
            .el-dialog {
                height: 0;
            }
        }
        .setRoot1Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 400px;
            }
            .el-dialog__body {
                padding: 0 40px;
            }
        }
        .setRoot2Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 330px;
            }
            .el-dialog__body {
                padding: 0 40px;
            }
        }
        .setRoot3Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 260px;
            }
            .el-dialog__body {
                padding: 0 40px;
            }
        }
    }
</style>