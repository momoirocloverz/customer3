<template>
    <div class="provideMasterCon" v-loading="loading">
        <div class="topPart" @keyup.enter="searchAction">
            <div>
                <el-select v-model="status" placeholder="订单状态" size="small" class="setSelectWidth mr20" @change="searchAction">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-select v-model="payWay" placeholder="发放方式" size="small" class="setSelectWidth " @change="searchAction">
                    <el-option v-for="item in payWayOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-date-picker v-model="daterange" type="daterange"  range-separator="至"  start-placeholder="创建时间" end-placeholder="创建时间" size="small" class="ml20 mr20" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" @change="searchAction">
                </el-date-picker>
            </div>
           <el-input v-model="orderNumber" size="small" placeholder="订单号" class="limitInput" clearable ><el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button></el-input>
        </div>
        <div class="bottomPart">
            <div class="tableCon">
                <el-table :data="tableData" max-height="620"  style="width: 100%;margin-top:20px" empty-text="暂无相关信息">
                    <el-table-column  label="订单创建时间" width="170" show-overflow-tooltip>
                        <template v-slot="scope">
                            <div>{{ scope.row.createdAt | stableDatefilter1}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderNo" label="订单号" width="200" show-overflow-tooltip></el-table-column>
                    <!--<el-table-column prop="totalPop" label="待发放人数" show-overflow-tooltip>
                        <template v-slot="scope">
                            <div>
                                {{ scope.row.status == '5' ? '0' :  scope.row.totalPop}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalSalary" label="待发放金额" :formatter="formatter4" show-overflow-tooltip></el-table-column>-->
                    <el-table-column label="发放人数" show-overflow-tooltip width="180">
                        <template v-slot="scope">
                            <div>
                                {{ scope.row.status == '5' ? '0' :  scope.row.totalPop}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="payWay" label="发放方式"  :formatter="formatter3" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="successPop" label="成功发放人数" show-overflow-tooltip :formatter="formatter5"></el-table-column>
                    <!--<el-table-column  label="成功发放金额" :formatter="formatter1" show-overflow-tooltip></el-table-column>-->
                    <el-table-column prop="status" label="订单状态" show-overflow-tooltip :formatter="formatter2"></el-table-column>
                    <el-table-column prop="date" label="操作" >
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="checkDetail(scope.row)">订单详情</el-button>
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
                payWay:'',
                payWayOptions:[
                    {
                        value: '0',
                        label: '不限'
                    }, 
                    {
                        value: '1',
                        label: '线下发放'
                    },
                    {
                        value: '2',
                        label: '线上发放-薪企云服'
                    },
                ],
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
                        value: '5',
                        label: '发放完成'
                    },
                    {
                        value: '6',
                        label: '发放失败'
                    }
                ],
                tableData:[],
                currentPage4:1,
                pageSize:20,
                total:0,
                loading:true,
            }
        },
        mounted(){
            this.setCurrentPageAction();
            this.searchAction();
        },
        methods: {
            setCurrentPageAction(){
                let name = this.$route.name;
                let getValue = this.$store.getters.getCurrentPageSize(name);
                this.pageSize = getValue ? getValue : 20;
            },
            searchAction(){
                let data = this.geneParams();
                data.pageNum = this.currentPage4 = 1;
                data.pageSize = this.pageSize;
                this.requestLists( data );
            },
            comonSearch(){
                let data = this.geneParams();
                data.pageNum = this.currentPage4;
                data.pageSize = this.pageSize;
                this.requestLists( data );
            },
            requestLists(data){
                this.ApiLists.waitToPayListGetter(data).then(res=>{
                    this.loading = true;
                    let { respCode,data } =res;
                    if( data&&data.list ){
                        this.total = data.total;
                        this.tableData = data.list;
                    }else{
                        this.total = 0;
                        this.tableData = [];
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
                let arr = ['status','orderNumber','payWay'];
                let inputParamsMap = {
                    status:'status',
                    orderNumber:'orderNo',
                    payWay:'payWay',
                };
                arr.forEach(ele=>{
                    if( this[ele] ){
                        data[inputParamsMap[ele]] = this[ele];
                    }
                });
                let dateParams = [ 'createdAtStart','createdAtEnd' ];
                if( this.daterange ){
                    dateParams.forEach((ele,index)=>{
                        data[ele] = this.daterange[index];
                    });
                }   
                if( data.status == '0' ){
                    delete data.status;
                }
                if( data.payWay == '0' ){
                    delete data.payWay;
                }
                return data;
            },
            formatter4(row,column){
                if(row.totalSalary){
                    return row.totalSalary
                }else{
                    return '-'
                }
            },
            formatter3(row,column){
                if(row.payWay){
                    if( row.payWay == '1' ){
                        return '线下发放'
                    }else if(row.payWay == '2'){
                        return '线上发放-薪企云服'
                    }
                }else{
                    return '-'
                }
            },
            formatter2(row, column){
                let map = {
                    1:'待发放',
                    2:'待付款',
                    3:'发放中',
                    5:'发放完成',
                    6:'发放失败',
                    7:'已取消'
                };
                if( row.status ){
                    return map[row.status];
                }else{
                    return '-'
                }
            },
            formatter5(row, column){
                if( row.status == '7'|| row.status == '1'){
                    return '-'
                }else{
                    return row.successPop
                }
            },
            formatter1(row, column) {
                if( row.status == '7'|| row.status == '1'){
                    return '-'
                }else{
                    if( row.successSalary || row.successSalary == 0 ){
                        return row.successSalary;
                    }else{
                        return '-';
                    }
                }   
            },
            checkDetail(row){
                sessionStorage.removeItem('firstItem1');
                sessionStorage.removeItem('firstItem2');
                sessionStorage.removeItem('secondItem1'); 
                sessionStorage.removeItem('secondItem2'); 
                sessionStorage.removeItem('secondItem3'); 
                sessionStorage.removeItem('secondItem4');
                sessionStorage.removeItem('tabSwitch');
                sessionStorage.removeItem('tabSwitch2'); 
                const {href} = this.$router.resolve({
                    name: 'provideOrderDetail',
                    query:{
                        id:row.id,
                    }
                })
                window.open(href);
            },
            handleSizeChange(val){
                this.currentPage4 = 1;
                this.pageSize = val;
                this.$store.commit('setPathSize',{
                    name:this.$route.name,
                    type:null,
                    pageSize:val
                }); 
                this.comonSearch();
            },
            handleCurrentChange(val){
                this.currentPage4 = val;
                this.comonSearch();
            },
        },
    }
</script>
<style scoped lang="scss">
    .provideMasterCon {
        .limitInput {
            width: 240px;
        }
        .setSelectWidth {
            width: 160px;
        }
        .pagCon {
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
        }
        .topPart {
            display: flex;
            justify-content:space-between;
            align-content: center;
            align-items: center;
        }
    }
</style>