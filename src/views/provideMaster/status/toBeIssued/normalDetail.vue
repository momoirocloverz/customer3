<template>
    <div class="normalDetCon" v-loading="loading">
        <div class="topPart" @keyup.enter="enterReaction">
            <el-select v-model="errorStatus" placeholder="人员异常状态" size="small" @change="store1(errorStatus)">
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
           <el-input v-model="userName" size="small" placeholder="人员姓名" class="limitInput " clearable>
               <el-button slot="append" icon="el-icon-search" @click="store2(userName)"></el-button>
            </el-input>
        </div>
        <div class="bottomPart">
            <div class="tableCon">
                <div class="sumInfoCon">
                    <div class="sumTextCon">合计：{{totalPop}}人；排班收入{{salary}}元；奖惩{{rewardAndPublish}}元；扣款{{deduction}}元；合计收入{{salaryTotal}}元</div>
                    <div>
                        <el-button type="danger" size="small" :disabled="! !!multipleArr.length" @click="multipleDelete">批量删除</el-button>
                        <el-button type="primary" size="small" @click="exportExcel" >导出明细</el-button>
                    </div>
                </div>
                <el-table :data="tableData" style="width: 100%;margin-top:20px" empty-text="暂无相关信息" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="100"></el-table-column>
                    <el-table-column label="人员姓名" >    
                        <template v-slot="scope">
                            <div class="flexHere">
                                <span>{{ scope.row.talentName }}</span>   
                                <el-popover  placement="top"  title=""  width="150"  trigger="hover"  content="未绑定银行卡" popper-class="cusPopper" :key="scope.row.talentId">
                                    <img slot="reference" v-if="+scope.row.isHavCard" :src="icon1Src">
                              </el-popover>
                                <el-popover placement="top" title="" width="150" trigger="hover"  content="应发收入小于0" popper-class="cusPopper" :key="scope.row.talentId + '1' ">
                                    <img slot="reference" v-if="+scope.row.salaryTotal < 0" :src="icon2Src">                                    
                              </el-popover>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="salary" label="排班收入(元)" ></el-table-column>
                    <el-table-column prop="rewardAndPublish" label="奖惩(元)" ></el-table-column>
                    <el-table-column prop="deduction" label="扣款(元)" ></el-table-column>
                    <el-table-column prop="salaryTotal" label="应发收入(元)" ></el-table-column>
                    <el-table-column label="操作" >
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="checkDetail(scope.row)">查看详情</el-button>
                            <el-button class="deleteRed" type="text" size="small" @click="popDelete(scope.row)">删除</el-button>
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
        name: 'normalDet',
        data() {
            return {
                loading:true,
                id:'',
                totalPop:0,
                salary:0,
                rewardAndPublish:0,
                deduction:0,
                salaryTotal:0,
                userName:'',
                errorStatus:'',
                icon1Src:require('@/assets/card.svg'),
                icon2Src:require('@/assets/info.svg'),
                options:[
                    {
                        value: 'holder',
                        label: '不限'
                    }, 
                    {
                        value: '0',
                        label: '未绑定银行卡'
                    },
                    {
                        value: '1',
                        label: '应发收入<0'
                    },
                    {
                        value: '2',
                        label: '应发收入=0'
                    },
                ],
                tableData:[],
                currentPage4:1,
                total:0,
                pageSize:20,
                multipleArr:[],
            }
        },
        mounted(){
            this.analyseStorage();
            this.setCurrentPageAction();
            this.commonSearch();
        },
        methods: {
            enterReaction(){
                this.store2(this.userName);
            },
            analyseStorage(){
                this.errorStatus = sessionStorage.getItem('firstItem1') ? 
                    sessionStorage.getItem('firstItem1') == 'holder' ? '':sessionStorage.getItem('firstItem1') 
                : '';
                this.userName = sessionStorage.getItem('firstItem2') || '';
            },
            store1(val){
                sessionStorage.setItem('firstItem1',val);
                this.searchAction();
            },
            store2(val){
                sessionStorage.setItem('firstItem2',val);
                this.searchAction();
            },
            setCurrentPageAction(){
                let name = this.$route.name;
                let getValue = this.$store.getters.getCurrentPageSize(name);
                this.pageSize = getValue ? getValue : 20;
            },
            requestList(data){
                 this.ApiLists.waitToPayOrderDetail(data).then(res=>{
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
            multipleDelete(){
                let array = this.multipleArr.map((ele)=>{
                    return ele.talentId
                })
                
                this.$confirm('确认删除该些条目', '确认删除', {
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
                const loading = this.$loading({
                    lock: true,
                    text: '正在导出excel表...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.9)'
                });
                this.ApiLists.orderExport(params).then(res=>{
                    let { data,respCode } = res;
                    if( respCode == 0 ){
                        window.open(data);
                    }
                }).catch(err=>{
                    console.log('err',err);
                }).finally(()=>{
                    loading.close();
                })
            },
            geneParams(){
                this.id = String(this.$route.query.id);
                let data = {};
                let arr = ['id','errorStatus','userName'];
                let inputParamsMap = {
                    id:'id',
                    errorStatus:'errorStatus',
                    userName:'talentName',
                };
                arr.forEach(ele=>{
                    if( this[ele] ){
                        data[inputParamsMap[ele]] = this[ele];
                    }
                });
                if( data.errorStatus=='holder' ){
                    delete data.errorStatus;
                }
                return data;
            },
            commonSearch(){
                let data = this.geneParams();
                data.pageNum = this.currentPage4;
                data.pageSize = this.pageSize;
                data.status =this.$parent.$parent.orderStatus;                
                this.requestList( data );
            },
            searchAction(){
                let data = this.geneParams();
                data.pageNum = this.currentPage4 = 1;
                data.pageSize = this.pageSize;
                data.status =this.$parent.$parent.orderStatus;                
                this.requestList( data );
            },
            deleteAction(array){
                let params = {
                    orderId:this.id,
                    talentIds:array,
                };
                this.ApiLists.orderDeletePayOrder(params).then(res=>{
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
                    consoel.log('err',err);
                })
            },
            popDelete(row){
                this.$confirm('确认删除该条目', '确认删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.deleteAction([row.talentId]);
                }).catch(() => {  
                });
            },
            checkDetail(row){
                this.$router.push({
                    name: 'commonInnerDetail',
                    query:{
                        talentId:row.talentId,
                        id:this.id,
                        orderNo:this.$parent.$parent.orderNo,
                        talentName:row.talentName,
                        status:this.$parent.$parent.orderStatus,
                        multiple:true,
                        showExport:true
                    }
                })
            },
            handleSizeChange(val){
                this.currentPage4 = 1;
                this.pageSize = val;
                this.$store.commit('setPathSize',{
                    name:this.$route.name,
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
    .normalDetCon {
        margin-top: 20px;
        .limitInput {
            width: 200px;
        }
        .flexHere {
            display: flex;
            justify-content:flex-start;
            align-content: center;
            align-items: center;
            img {
                cursor: pointer;
                vertical-align: middle;
                margin-left: 5px;
            }
        }
        .topPart {
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
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
    }
</style>
<style lang="scss">
    .cusPopper {
        text-align: center;
    }
</style>