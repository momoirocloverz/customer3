<template>
    <div class="issueCompleteCon" v-loading="loading">
        <div class="topPart"  @keyup.enter="searchAction">
            <div class="flexCon">                
                <el-input v-model="userName" size="small" placeholder="人员姓名" class="limitInput" clearable><el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button></el-input>        
                <el-button type="primary" size="small" @click="exportAction">导出明细</el-button>
            </div>
         <!--   <div>
                <div class="sumInfoCon">
                    <div class="sumTextCon">合计：{{totalPop}}人；排班收入{{salary}}元；奖惩{{rewardAndPublish}}元；扣款{{deduction}}元；合计收入{{salaryTotal}}元
                    </div>
                    <div>
                        <el-button type="primary" size="small" @click="exportAction">导出明细</el-button>
                    </div>
                </div>
            </div>-->
        </div>
        <div class="bottomPart">
            <div class="tableCon">
                <el-table :data="tableData"  style="width: 100%;margin-top:20px" empty-text="暂无相关信息">
                    <el-table-column prop="talentName" label="人员姓名" ></el-table-column>
                    <el-table-column>
                            <template slot="header" slot-scope="scope">
                                <span>付款手续费</span>   
                            <!--        <el-popover  placement="top" title="" trigger="hover"  :content="firstDescribe" popper-class="cusPopper">
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
                                   <!-- <el-popover  placement="top" title="" trigger="hover"  :content="secondDescribe" popper-class="cusPopper">
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
                                   <!-- <el-popover  placement="top" title="" trigger="hover"  :content="thirdDescribe" popper-class="cusPopper">
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
                                    <!--<el-popover  placement="top" title="" trigger="hover"  :content="fourthDescribe" popper-class="cusPopper">
                                        <i class="el-icon-warning-outline" slot="reference" ></i>
                                  </el-popover>-->
                            </template>
                            <template v-slot="scope">
                                <div>{{ scope.row.tax }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip>
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
        name: 'issueComplete',
        data() {
            return {
                loading:true,
                userName:'',
                date:'',
                status:'',
                totalPop:0,
                salary:0,
                rewardAndPublish:0,
                deduction:0,
                salaryTotal:0,
                options:[
                    {
                        value: '0',
                        label: '不限'
                    }, 
                    {
                        value: '3',
                        label: '发放中'
                    },
                    {
                        value: '5',
                        label: '发放完成'
                    },
                    {
                        value: '6',
                        label: '发放失败'
                    }
                ],
                statusMap:{
                     1:'待发放',
                    2:'待付款',
                    3:'发放中',
                    5:'发放完成',
                    6:'发放失败',
                    7:'已取消'
                },
                tableData:[
//                    {status:3,show:true},{status:1,show:false}
                ],
                currentPage4:1,
                total:0,
                pageSize:20,
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
                this.parentPaytype = this.$parent.$parent.payType;
            },
            exportAction(){
                let params = {
                   orderId:this.id,
                   orderNo:this.$parent.$parent.orderNo,
//                   status:this.$parent.$parent.orderStatus
                    status:5,
                    payWay:this.$parent.$parent.payType
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
                let name = this.$route.name + '5';
                let getValue = this.$store.getters.getCurrentPageSize(name);
                this.pageSize = getValue ? getValue : 20;
            },
            searchAction(){
                let data = this.geneParams();
                data.pageNum = this.currentPage4 = 1;
                data.pageSize = this.pageSize;
                data.id = this.id;
//                data.status = this.$parent.$parent.orderStatus
                data.status = 5;
                data.subStatus = 5;
                this.requestLists( data );
            },
            commonSearch(){
                let data = this.geneParams();
                data.pageNum = this.currentPage4;
                data.pageSize = this.pageSize;
                data.id = this.id;
//                data.status = this.$parent.$parent.orderStatus
                data.status = 5;
                data.subStatus = 5;
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
            geneParams(){
                this.id = String(this.$route.query.id);
                let data = {};
                let arr = ['userName'];
                let inputParamsMap = {
                    userName:'talentName',
                };
                arr.forEach(ele=>{
                    if( this[ele] ){
                        data[inputParamsMap[ele]] = this[ele];
                    }
                });
                return data;
            },
            checkDetail(row){
                const { href } = this.$router.resolve({
                    name: 'commonInnerDetail',
                    query:{
                        talentId:row.talentId,
                        id:this.id,
                        orderNo:this.$parent.$parent.orderNo,
                        talentName:row.talentName,
//                        status:this.$parent.$parent.orderStatus
                        status:5
                    }
                })
                window.open(href);
            },
            handleSizeChange(val){
                this.currentPage4 = 1;
                this.pageSize = val;
                this.$store.commit('setPathSize',{
                    name:this.$route.name + '5',
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
    .issueCompleteCon {
        .limitInput {
            width: 200px;
        }
        .el-icon-warning-outline {
            cursor: pointer;
        }
        .flexCon {
            display: flex;
            justify-content:space-between;
            align-content: center;
            align-items: center;
        }
        .pagCon {
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
        }
        .sumInfoCon {
            margin-top: 30px;
            display: flex;
            justify-content:flex-end;
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