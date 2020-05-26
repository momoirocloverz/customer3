<template>
    <div class="incomeDetCon" v-loading="loading">
        <div class="topPart" @keyup.enter="store3(userName)">            
            <el-select v-model="incomeType" placeholder="收入明细类型" size="small" @change="store6(incomeType)" class="mr20">
                <el-option  v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            <el-date-picker v-model="daterange" type="daterange"  range-separator="至"  start-placeholder="排班时间" end-placeholder="排班时间" size="small" class="ml20 mr20" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" @change="store5(daterange)">
                </el-date-picker>
            <el-input v-model="taskName" size="small" placeholder="任务名称" class="limitInput mr20" clearable>
                <el-button slot="append" icon="el-icon-search" @click="store4(taskName)"></el-button>
            </el-input>
            <el-input v-model="userName" size="small" placeholder="员工姓名" class="limitInput" clearable>
                <el-button slot="append" icon="el-icon-search" @click="store3(userName)"></el-button>
            </el-input>
        </div>
        <div class="bottomPart">
            <div class="tableCon">
                <div class="sumInfoCon">
                    <div class="sumTextCon">合计：{{totalPop}}人；排班收入{{salary}}元；奖惩{{rewardAndPublish}}元；扣款{{deduction}}元；合计收入{{salaryTotal}}元</div>
                    <div>
                        <el-button type="danger" size="small" :disabled="! !!multipleArr.length" @click="multipleDelete">批量删除</el-button>
                        <el-button type="primary" size="small" @click="exportExcel">导出明细</el-button>
                    </div>
                </div>
                <el-table :data="tableData"  style="width: 100%;margin-top:20px" empty-text="暂无相关信息"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="100"></el-table-column>
                    <el-table-column prop="talentName" label="员工姓名" ></el-table-column>
                    <el-table-column label="收入明细类型" >
                        <template v-slot="scope">
                            <div>{{ typeMap[scope.row.type] || '-'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="salary" label="应发金额(元)" ></el-table-column>
                    <el-table-column prop="taskName" label="任务名称" >
                        <template v-slot="scope">
                            <div>{{ scope.row.taskName || '-'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="排班日期" >
                        <template v-slot="scope">
                            <div>{{ scope.row.schedulingDate | stableDatefilter2}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="操作" >
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="checkDetail(scope.row)">查看详情</el-button>
                            <el-button type="text" class="deleteRed" size="small" @click="popDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagCon mt10 mb10" v-if="total">
                <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="currentPage4"  :page-sizes="[5, 10, 20]" :page-size="pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="info.title + '详情'"  class="setMiddleDialog resetStyle" width="450px" :close-on-click-modal="false" :visible.sync="showDetail" :class="{setRootScoped1:root1On,setRootScoped2:root2On,setRootScoped3:root3On}">
            <PopDetail :detailInfo="info"/>
        </el-dialog>
    </div>
</template>
<script>
    import PopDetail from '@/components/provideInnerDetail.vue';
    export default {
        name: 'incomeDet',
        components:{ PopDetail },
        data() {
            return {
                loading:true,
                id:'',
                info:{},
                showDetail:false,
                userName:'',
                daterange:'',
                taskName:'',
                status:'',
                incomeType:'',
                options2:[
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
                options:[
                    {
                        value: '0',
                        label: '不限'
                    }, 
                    {
                        value: '1',
                        label: '未绑定银行卡'
                    },
                    {
                        value: '2',
                        label: '应发收入<0'
                    },
                    {
                        value: '3',
                        label: '应发收入=0'
                    }
                ],
                typeMap:{
                    1:'排班收入',
                    2:'奖惩',
                    3:'扣款',
                },
                tableData:[],
                currentPage4:1,
                pageSize:20,
                total:0,
                root1On:false,
                root2On:false,
                root3On:false,
                multipleArr:[],
                salary:0,
                rewardAndPublish:0,
                deduction:0,
                salaryTotal:0,
                totalPop:0,
            }
        },
        mounted(){
            this.analyseStorage();
            this.setCurrentPageAction();
            this.commonSearch();
        },
        methods: {
            analyseStorage(){
                this.userName = sessionStorage.getItem('secondItem1') || '';
                this.taskName = sessionStorage.getItem('secondItem2') || '';
                this.daterange = sessionStorage.getItem('secondItem3') ? JSON.parse(sessionStorage.getItem('secondItem3')) :'' || '';
                this.incomeType = sessionStorage.getItem('secondItem4') || '';
            },
            store3(val){
                sessionStorage.setItem('secondItem1',val);
                this.searchAction();
            },  
            store6(val){
                if(+val){
                    sessionStorage.setItem('secondItem4',val);
                }else{
                    sessionStorage.setItem('secondItem4','');
                }
                this.searchAction();
            }, 
            store5(val){
                if(!val){
                    sessionStorage.setItem('secondItem3','');
                }else{
                    sessionStorage.setItem('secondItem3',JSON.stringify(val));
                }
                this.searchAction();
            }, 
            store4(val){
                sessionStorage.setItem('secondItem2',val);
                this.searchAction();
            }, 
            setCurrentPageAction(){
                let name = this.$route.name + 'Copy';
                let getValue = this.$store.getters.getCurrentPageSize(name);
                this.pageSize = getValue ? getValue : 20;
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
                        this.$router.go(0);
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
            handleSelectionChange(val){
                this.multipleArr = val;
            },
            exportExcel(){
                let params = {
                   orderId:this.id,
                   orderNo:this.$parent.$parent.orderNo,
                   status:this.$parent.$parent.orderStatus
                };
                this.ApiLists.orderExport(params).then(res=>{
                    let { data,respCode } = res;
                    if( respCode == 0 ){
                        window.open(data);
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            geneParams(){
                this.id = String(this.$route.query.id);
                let data = {};
                let arr = ['userName','incomeType','taskName'];
                let inputParamsMap = {
                    userName:'talentName',
                    incomeType:'type',
                    taskName:'taskName'
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
                if( this.incomeType == '0' ){
                    delete data.type;
                }                
                return data;
            },
            searchAction(){
                let data = this.geneParams();
                data.orderId = this.id;
                data.pageNum = this.currentPage4 = 1;
                data.pageSize = this.pageSize;
                this.requestList( data );
            },
            commonSearch(){
                let data = this.geneParams();
                data.orderId = this.id;
                data.pageNum = this.currentPage4;
                data.pageSize = this.pageSize;
                this.requestList( data );
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
                this.$store.commit('setPathSize',{
                    name:this.$route.name + 'Copy',
                    type:null,
                    pageSize:val
                }); 
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
    .incomeDetCon {
        margin-top: 20px;
        .limitInput {
            width: 200px;
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
        .topPart {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            margin-bottom: 30px;
        }
        .deleteRed {
            color: #F56C6C;
        }
    }
</style>
<style lang="scss">
    .incomeDetCon {
        .resetStyle {
            .el-dialog {
                height: 0;
            }
        }
        .setRootScoped1 {
            .el-dialog {
                border-radius: 10px;
                height: 400px;
            }
            .el-dialog__body {
                padding: 0 40px;
            }
        }
        .setRootScoped2 {
            .el-dialog {
                border-radius: 10px;
                height: 330px;
            }
            .el-dialog__body {
                padding: 0 40px;
            }
        }
        .setRootScoped3 {
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