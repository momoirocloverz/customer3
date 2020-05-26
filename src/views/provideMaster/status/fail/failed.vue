<template>
    <div class="failedCon" v-loading="loading">
        <div class="topPart"  @keyup.enter="searchAction">
           <el-input v-model="userName" size="small" placeholder="员工姓名" class="limitInput" clearable><el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button></el-input>
        </div>
        <div class="bottomPart">
            <div class="tableCon">
                <div class="sumInfoCon">
                    <div class="sumTextCon">合计：{{totalPop}}人；排班收入{{salary}}元；奖惩{{rewardAndPublish}}元；扣款{{deduction}}元；合计收入{{salaryTotal}}元</div>
                    <div>
                        <el-button type="primary" size="small" @click="exportAction">导出明细</el-button>
                    </div>
                </div>
                <el-table :data="tableData"  style="width: 100%;margin-top:20px" empty-text="暂无相关信息">
                    <el-table-column prop="talentName" label="员工姓名" ></el-table-column>
                    <el-table-column prop="salary" label="排班收入(元)" ></el-table-column>
                    <el-table-column prop="rewardAndPublish" label="奖惩(元)" ></el-table-column>
                    <el-table-column prop="deduction" label="扣款(元)" ></el-table-column>
                    <el-table-column prop="salaryTotal" label="实发收入(元)" ></el-table-column>
                    <el-table-column  label="失败原因" show-overflow-tooltip>
                        <template v-slot="scope">
                            <span>{{ scope.row.errorMsg }}</span>  
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" >
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="checkDetail(scope.row)">查看明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagCon mt10 mb10" v-if="total">
                <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="currentPage4"  :page-sizes="[5, 10, 20]" :page-size="pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'provideMaster',
        data() {
            return {
                userName:'',
                date:'',
                status:'',
                statusMap:{
                     1:'待发放',
                    2:'待付款',
                    3:'发放中',
                    5:'发放完成',
                    6:'发放失败',
                    7:'已取消'
                },
                options:[
                    {
                        value: '0',
                        label: '不限'
                    }, 
                    {
                        value: '1',
                        label: '待发放'
                    },
                    {
                        value: '2',
                        label: '待付款'
                    },
                    {
                        value: '3',
                        label: '发放中'
                    },
                    {
                        value: '4',
                        label: '发放完成'
                    },
                    {
                        value: '5',
                        label: '发放失败'
                    }
                ],
                tableData:[],
                currentPage4:1,
                total:0,
                pageSize:20,
                id:'',
                totalPop:0,
                salary:0,
                rewardAndPublish:0,
                deduction:0,
                salaryTotal:0,
                loading:true,
            }
        },
        mounted(){
            this.setCurrentPageAction();
            this.searchAction();
        },
        methods: {
            exportAction(){
                let params = {
                   orderId:this.id,
                   orderNo:this.$parent.orderNo,
                   status:this.$parent.orderStatus,
                    payWay:this.$parent.payType
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
            setCurrentPageAction(){
                let name = this.$route.name + '6';
                let getValue = this.$store.getters.getCurrentPageSize(name);
                this.pageSize = getValue ? getValue : 20;
            },
            searchAction(){
                this.id = String(this.$route.query.id);
                let data ={
                    pageNum:this.currentPage4 = 1,
                    pageSize:this.pageSize,
                    talentName:this.userName,
                    id:this.id,
                    status:this.$parent.orderStatus,
                    subStatus:this.$parent.orderStatus,
                };
                this.requestLists( data );
            },
            commonSearch(){
                this.id = String(this.$route.query.id);
                let data ={
                    pageNum:this.currentPage4,
                    pageSize:this.pageSize,
                    talentName:this.userName,
                    id:this.id,
                    status:this.$parent.orderStatus,
                    subStatus:this.$parent.orderStatus,
                };
                this.requestLists( data );
            },
            requestLists(data){
                this.ApiLists.orderPayOrder(data).then(res=>{
                    this.loading = true;
                    let { data,respCode } = res;                     
                    if( respCode == 0 ){
                        if( data&&data.salaryOrderDetailVOPageInfo&&data.salaryOrderDetailVOPageInfo.list ){
                            this.total = data.salaryOrderDetailVOPageInfo.total;
                            this.tableData = data.salaryOrderDetailVOPageInfo.list;
                        }else{
                            this.total = 0;
                            this.tableData = [];
                        }
                        if( data&&data.salaryOrderTotalVO ){
                            this.totalPop = data.salaryOrderTotalVO.totalPop || 0;
                            this.salary =data.salaryOrderTotalVO.salary || 0;
                            this.rewardAndPublish =data.salaryOrderTotalVO.rewardAndPublish || 0;
                            this.deduction =data.salaryOrderTotalVO.deduction || 0;
                            this.salaryTotal =data.salaryOrderTotalVO.salaryTotal || 0;
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
            checkDetail(row){
                const {href} = this.$router.resolve({
                    name: 'commonInnerDetail',
                    query:{
                        talentId:row.talentId,
                        id:this.id,
                        orderNo:this.$parent.orderNo,
                        talentName:row.talentName,
                        status:this.$parent.orderStatus
                    }
                })
                window.open(href);
            },
            handleSizeChange(val){
                this.currentPage4 = 1;
                this.pageSize = val;
                this.$store.commit('setPathSize',{
                    name:this.$route.name + '6',
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
    .failedCon {
        .limitInput {
            width: 200px;
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
            font-size: 12px;
            font-weight: 400;
        }
    }
</style>