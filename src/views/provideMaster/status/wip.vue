<template>
    <div class="wipMasterCon" v-loading="loading">
        <div class="bottomPart">
            <div  class="topPart" @keyup.enter="searchAction">
                <el-select v-model="status" placeholder="发放状态" size="small" @change="statusChange">
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
                <el-input v-model="userName" size="small" placeholder="员工姓名" class="limitInput" clearable><el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button></el-input>
            </div>
            <div class="tableCon">
                <div class="sumInfoCon">
                    <div class="sumTextCon">
                        合计：{{totalPop}}人；排班收入{{salary}}元；奖惩{{rewardAndPublish}}元；扣款{{deduction}}元；合计收入{{salaryTotal}}元
                    </div>
                </div>
                <el-table :data="tableData"  style="width: 100%;margin-top:20px" empty-text="暂无相关信息">
                    <el-table-column prop="talentName" label="员工姓名" ></el-table-column>
                    <el-table-column prop="salary" label="排班收入(元)" ></el-table-column>
                    <el-table-column prop="rewardAndPublish" label="奖惩(元)" ></el-table-column>
                    <el-table-column prop="deduction" label="扣款(元)" ></el-table-column>
                    <el-table-column prop="salaryTotal">
                        <template slot="header" slot-scope="scope">
                                <span>应发收入(元)</span>   
                                    <el-popover  placement="top" title="" trigger="hover"  :content="sixthDescribe" popper-class="cusPopper" width="250">
                                        <i class="el-icon-warning-outline" slot="reference" ></i>
                                  </el-popover>
                            </template>
                            <template v-slot="scope">
                                <div>{{ scope.row.salaryTotal }}</div>
                            </template>
                    </el-table-column>   
                        <el-table-column>
                            <template slot="header" slot-scope="scope">
                                <span>付款手续费</span>   
                                  <!--  <el-popover  placement="top" title="" trigger="hover"  :content="firstDescribe" popper-class="cusPopper">
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
                                    <!--<el-popover  placement="top" title="" trigger="hover"  :content="secondDescribe" popper-class="cusPopper">
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
          <!--          <el-table-column label="发放状态" >
                        <template v-slot="scope">
                        <span>{{ statusMap[scope.row.status] }}</span>  
                                <el-popover placement="top"  title=""  width="150"  trigger="hover"  content="未绑定银行卡" popper-class="cusPopper" :key="scope.row.talentId">
                                    <i class="el-icon-warning-outline" slot="reference" v-if="scope.row.show"></i>
                              </el-popover>
                        </template>
                    </el-table-column>  --> 

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
        name: 'wipmaster',
        data() {
            return {
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
                status:'',
                statusMap:{
                    3:'发放中',
                    5:'发放完成',
                    6:'发放失败',
                },
                loading:true,
                userName:'',
                tableData:[
                  /*  {show:true,status:3},
                    {show:false,status:5}*/
                ],
                currentPage4:1,
                total:0,
                pageSize:20,
                totalPop:0,
                salary:0,
                rewardAndPublish:0,
                deduction:0,
                salaryTotal:0,
                id:'',
                firstDescribe:'付款手续费1元/人，从员工收入中扣除，由管理费账户支付',
                secondDescribe:'应发收入的1.5%，由管理费账户支付',
                thirdDescribe:'应发收入的1%，由薪税公司账户支付',
                fourthDescribe:'超出30000元/月/人会产生个人所得税，由薪税公司账户支付',
                fifthDescribe:'实发收入=应发收入-个人所得税',
                sixthDescribe:'付款手续费需从人员收入中扣除，故应发收入已扣除付款手续费  付款手续费无需从人员收入中扣除，故应发收入未扣除付款手续费',
                statusChangeFlag:false,
            }
        },
        mounted(){
            this.setCurrentPageAction();
            this.searchAction();
        },
        methods: {
            statusChange(){
                this.statusChangeFlag = true;
                this.searchAction();
            },
            setCurrentPageAction(){
                let name = this.$route.name + '2';
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
                    status: this.statusChangeFlag&&this.status != 0 ? this.status :this.$parent.orderStatus,
                    subStatus: this.statusChangeFlag&&this.status != 0 ? this.status :this.$parent.orderStatus,
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
                    status: this.statusChangeFlag&&this.status != 0 ? this.status :this.$parent.orderStatus,
                    subStatus: this.statusChangeFlag&&this.status != 0 ? this.status :this.$parent.orderStatus,
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
                        showExport:false,
                        talentId:row.talentId,
                        orderNo:this.$parent.orderNo,
                        talentName:row.talentName,
                        status:this.$parent.orderStatus,
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
    .wipMasterCon {
        .topPart {
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            margin-bottom: 30px;
        }
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