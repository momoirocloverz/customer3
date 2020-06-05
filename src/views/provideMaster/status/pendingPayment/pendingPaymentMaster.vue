<template>
    <div class="pendingPaymentMasterCon" v-loading="loading">
        <div class="bottomPart">
            <div @keyup.enter="searchAction">
                <el-input v-model="userName" size="small" placeholder="人员姓名" class="limitInput" clearable><el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button></el-input>
            </div>
            <div class="tableCon">
                <div class="sumInfoCon">
                    <div class="sumTextCon">
                        合计：{{totalPop}}人；排班收入{{salary}}元；奖惩{{rewardAndPublish}}元；扣款{{deduction}}元
                    </div>
                    <div>
                        <el-button type="primary" size="small" @click="exportExcel">导出明细</el-button>
                    </div>
                </div>
                <el-table :data="tableData"  style="width: 100%;margin-top:20px" empty-text="暂无相关信息">
                    <el-table-column prop="talentName" label="人员姓名" ></el-table-column>
                    <el-table-column prop="salary" label="排班收入(元)" ></el-table-column>
                    <el-table-column prop="rewardAndPublish" label="奖惩(元)" ></el-table-column>
                    <el-table-column prop="deduction" label="扣款(元)" ></el-table-column>
                    <el-table-column prop="salaryTotal" label="应发收入(元)" ></el-table-column>                    
                    <div v-if="parentPaytype == 2">
                        <el-table-column>
                            <template slot="header" slot-scope="scope">
                                <span>付款手续费</span>   
                     <!--               <el-popover  placement="top" title="" trigger="hover"  :content="firstDescribe" popper-class="cusPopper">
                                        <i class="el-icon-warning-outline" slot="reference" ></i>
                                  </el-popover>-->
                            </template>
                            <template v-slot="scope">
                                <div>{{ scope.row.payMoney }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot="header" slot-scope="scope">
                                <span>平台信息费</span>   
                              <!--      <el-popover  placement="top" title="" trigger="hover"  :content="secondDescribe" popper-class="cusPopper">
                                        <i class="el-icon-warning-outline" slot="reference" ></i>
                                  </el-popover>-->
                            </template>
                            <template v-slot="scope">
                                <div>{{ scope.row.cusServiceFee }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot="header" slot-scope="scope">
                                <span>信息服务费</span>   
                             <!--       <el-popover  placement="top" title="" trigger="hover"  :content="thirdDescribe" popper-class="cusPopper">
                                        <i class="el-icon-warning-outline" slot="reference" ></i>
                                  </el-popover>-->
                            </template>
                            <template v-slot="scope">
                                <div>{{ scope.row.serviceFee }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot="header" slot-scope="scope">
                                <span>个人所得税</span>   
                                 <!--   <el-popover  placement="top" title="" trigger="hover"  :content="fourthDescribe" popper-class="cusPopper">
                                        <i class="el-icon-warning-outline" slot="reference" ></i>
                                  </el-popover>-->
                            </template>
                            <template v-slot="scope">
                                <div>{{ scope.row.tax }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot="header" slot-scope="scope">
                                <span>实发收入</span>   
                                    <el-popover placement="top" title="" trigger="hover"  :content="fifthDescribe" popper-class="cusPopper">
                                        <i class="el-icon-warning-outline" slot="reference" ></i>
                                  </el-popover>
                            </template>
                            <template v-slot="scope">
                                <div>{{ scope.row.salaryTotal - scope.row.tax||0 }}</div>
                            </template>
                        </el-table-column>
                    </div>
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
        name: 'pendingPaymentMaster',
        data() {
            return {
                loading:true,
                userName:'',
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
                firstDescribe:'付款手续费1元/人，从人员收入中扣除，由管理费账户支付',
                secondDescribe:'应发收入的1.5%，由管理费账户支付',
                thirdDescribe:'应发收入的1%，由薪税公司账户支付',
                fourthDescribe:'超出30000元/月/人会产生个人所得税，由薪税公司账户支付',
                fifthDescribe:'实发收入=应发收入-个人所得税',
                parentPaytype:1,
            }
        },
        mounted(){
            this.getParentInfo();
            this.setCurrentPageAction();
            this.searchAction();
        },
        methods: {
            getParentInfo(){
                this.parentPaytype = this.$parent.payType;
            },
            setCurrentPageAction(){
                let name = this.$route.name + '2';
                let getValue = this.$store.getters.getCurrentPageSize(name);
                this.pageSize = getValue ? getValue : 20;
            },
            exportExcel(){
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
                        showExport:true,
                        talentId:row.talentId,
                        orderNo:this.$parent.orderNo,
                        talentName:row.talentName,
                        status:this.$parent.orderStatus,
                        payWay:this.$parent.payType,
                        id:this.id,
                    }
                })
                window.open(href);
            },
            handleSizeChange(val){
                this.currentPage4 = 1;
                this.pageSize = val;
                this.$store.commit('setPathSize',{
                    name:this.$route.name + '2',
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
    .pendingPaymentMasterCon {
        .el-icon-warning-outline {
            cursor: pointer;
        }
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
            margin-top: 30px;
            align-content: center;
            align-items: center;
        }
        .sumTextCon {
            font-size: 14px;
            color: #303133;
            font-weight: 400;
        }
    }
</style>