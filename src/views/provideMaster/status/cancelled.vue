<template>
    <div class="cancelledCon" v-loading="loading">
        <div class="topPart" @keyup.enter="searchAction">
           <el-input v-model="userName" size="small" placeholder="人员姓名" class="limitInput" clearable><el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button></el-input>
        </div>
        <div class="bottomPart">
            <div class="tableCon">
                <div class="sumTextCon">合计：{{totalPop}}人；排班收入{{salary}}元；奖惩{{rewardAndPublish}}元；扣款{{deduction}}元；合计收入{{salaryTotal}}元</div>
                <el-table :data="tableData"  style="width: 100%;margin-top:20px" empty-text="暂无相关信息">
                    <el-table-column prop="talentName" label="人员姓名" ></el-table-column>
                    <el-table-column prop="salary" label="排班收入(元)" ></el-table-column>
                    <el-table-column prop="rewardAndPublish" label="奖惩(元)" ></el-table-column>
                    <el-table-column prop="deduction" label="扣款(元)" ></el-table-column>
                    <el-table-column prop="salaryTotal" label="应发收入(元)" ></el-table-column>
                    <el-table-column  label="操作" >
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
                totalPop:0,
                salary:0,
                rewardAndPublish:0,
                deduction:0,
                salaryTotal:0,
                id:'',
                loading:true,
            }
        },
        mounted(){
            this.setCurrentPageAction();
            this.searchAction();
        },
        methods: {
            setCurrentPageAction(){
                let name = this.$route.name + '7';
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
                    name:this.$route.name + '7',
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
    .cancelledCon {
        .limitInput {
            width: 200px;
        }
        .pagCon {
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
        }
        .topPart {
            margin-bottom: 30px;
        }
        .sumTextCon {
            font-size: 14px;
            color: #303133;
            font-weight: 400;
        }
    }
</style>