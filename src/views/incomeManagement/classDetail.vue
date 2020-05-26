<template>
    <div class="class-detail" v-loading="loading" element-loading-text="正在请求中...">
        <div class="f20 title-top">
            <span class="fs-bold">{{$route.query.talentName}}</span> <span class="co-999 f14">{{title}}收入明细</span>
        </div>
        <div class="topCon">
            <div class="">
                <el-select size="small" class="lockWidth mr20" v-model="params.type" placeholder="收入明细类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-if="title == '待发'" size="small" class="lockWidth mr20" v-model="params.freezeStatus" placeholder="冻结状态">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-if="title == '已发'" size="small" class="lockWidth mr20" v-model="params.taskId" placeholder="任务名称">
                    <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker class="" v-model="dateRange" type="daterange" align="right" unlink-panels
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                :picker-options="pickerOptions"
                                @change="handleChangeDateRange"
                                size="small"></el-date-picker>
            </div>
        </div>
        <div class="bottomCon">
            <div class="pt30 f14 pb10">
                <!--合计：{{totalInfo.totalPop || 0}}人；-->
                排班收入{{totalInfo.salary || 0}}元；
                奖惩{{totalInfo.rewardAndPublish || 0}}元；
                扣款{{totalInfo.deduction || 0}}元；
                合计收入{{totalInfo.salaryTotal || 0}}元
            </div>
        </div>
        <div class="tableCon">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="type" :formatter="nameFor" label="收入明细类型"></el-table-column>
                <el-table-column prop="salary" :formatter="moenyMatter" label="应发金额(元)"></el-table-column>
                <el-table-column prop="taskName" label="任务名称" width="250" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="排班日期" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>{{scope.row.schedulingDate | dateFor}}</div>
                    </template>
                </el-table-column>
                <el-table-column v-if="title == '待发'" prop="freezeStatus" :formatter="formatter"
                                 show-overflow-tooltip>
                    <template slot="header" slot-scope="scope">
                        <span>冻结状态</span>
                        <el-popover
                                placement="top-start"
                                title=""
                                width="200"
                                trigger="hover"
                                content="当收入明细加入订单后即自动冻结，如取消订单或将该条明细从订单中删除即解冻该明细，已冻结的明细不能重复加入订单">
                            <div slot="reference"><i class="el-icon-warning-outline cursor co-blue"></i></div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template v-slot="scope">
                        <el-button size="mini" type="text" @click="handleEdit(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagCon tc pt30">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 20]"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <ShowDetail :detailInfo="info"
                    :showDetail="showDetail"
                    :cancel="cancel"/>
    </div>
</template>
<script>
    import { mapGetters,mapMutations} from 'vuex';
    import ShowDetail from '../../components/Detail'
    export default {
        name: 'classDetail',
        components:{ShowDetail},
        data() {
            return {
                params: {
                    type: '',
                    startDate:null,
                    endDate:null,
                    taskId:'',
                    freezeStatus: '',
                },
                info:{},
                dateRange: '',
                showDetail:false,
                options: [
                    {label: '不限', value: -1},
                    {label: '排班收入', value: 1},
                    {label: '奖惩', value: 2},
                    {label: '扣款', value: 3},
                ],
                options2: [
                    {label: '不限', value: -1},
                    {label: '未冻结', value: 1},
                    {label: '已冻结', value: 2},
                ],
                options3: [
                    {label: '不限', value: -1},
                ],
                pickerOptions: {},
                currentPage: 1,
                pageSize:20,
                total: 0,
                tableData: [],
                title:this.$route.query.title,
                totalInfo: {},
                loading: false,
            }
        },
        computed:{
            ...mapGetters(['getPathSize'])
        },
        watch: {
            'params.type':function (val) {
                this.currentPage = 1;
                this.getList()
            },
            'params.taskId':function (val) {
                if(this.title == '已发'){
                    this.currentPage = 1;
                    this.getList()
                }
            },
            'params.freezeStatus':function (val) {
                if(this.title == '待发'){
                    this.currentPage = 1;
                    this.getList()
                }
            }
        },
        async mounted() {
            await this.getSize();
            if(this.title == '已发'){
                this.getTaskList()
            }
            this.getList()
        },
        methods: {
            ...mapMutations(['setPathSize']),
            getSize(){
                if(this.getPathSize.length > 0){
                    for (let item of this.getPathSize){
                        if(item.name == this.$route.name){
                            this.pageSize = item.pageSize
                        }
                    }
                }
            },
            handleChangeDateRange(val) {
                if(val){
                    this.params.startDate = val[0];
                    this.params.endDate = val[1];
                }else{
                    this.params.startDate = null;
                    this.params.endDate = null;
                }
                this.currentPage = 1;
                this.getList()
            },
            getList(){
                let params = {
                    taskId: this.params.taskId === -1 ? '' : this.params.taskId,
                    talentId: this.$route.query.talentId,
                    schedulingDateStart:this.params.startDate,
                    schedulingDateEnd: this.params.endDate,
                    type: this.params.type === -1 ? '' : this.params.type,
                    freezeStatus:this.params.freezeStatus === -1 ? '' : this.params.freezeStatus,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                };
                if(this.title == '待发'){
                    this.ApiLists.getListByTalentId(params).then(res=>{
                        if (res.respCode === 0) {
                            let list = res.data.talentSalaryReocrdVOPageInfo.list;
                            if (list) {
                                this.tableData = list;
                                this.total = res.data.talentSalaryReocrdVOPageInfo.total;
                                this.totalInfo = res.data.salaryReocrdToTalVO;
                            } else {
                                this.tableData = [];
                                this.total = 0;
                                this.totalInfo = {}
                            }
                        }
                    }).catch(err=>{
                        console.log(err)
                    }).finally(()=>{

                    })
                }else if(this.title == '已发'){
                    this.ApiLists.getAlreadyTalentId(params).then(res=>{
                        if (res.respCode === 0) {
                            let list = res.data.talentSalaryReocrdVOPageInfo.list;
                            if (list) {
                                this.tableData = list;
                                this.total = res.data.talentSalaryReocrdVOPageInfo.total;
                                this.totalInfo = res.data.salaryReocrdToTalVO;
                            } else {
                                this.tableData = [];
                                this.total = 0;
                                this.totalInfo = {}
                            }
                        }
                    }).catch(err=>{
                        console.log(err)
                    }).finally(()=>{

                    })
                }
            },
            nameFor(cell, col, val) {
                val = Number(val)
                if (val === 1) {
                    return '排班收入'
                } else if(val === 2) {
                    return '奖惩'
                }else if(val === 3){
                    return '扣款'
                }
            },
            formatter(cell, col, val) {
                if (val == 1) {
                    return '未冻结'
                } else if (val == 2) {
                    return '已冻结'
                } else {
                    return '无'
                }
            },
            moenyMatter(cell, col, val) {
                val = Number(val)
                if (val != NaN) {
                    return val.toFixed(2)
                } else {
                    return '无'
                }
            },
            getTaskList(){
                this.options3 = [{label: '不限', value: -1}]
                this.ApiLists.getBtaskList({
                    status:'2',
                    pageNum:1,
                    pageSize:0,
                }).then(res=>{
                    if(res.respCode === 0){
                        let list = res.data;
                        if(list){
                            for(let item of list){
                                this.options3.push({
                                    label:item.taskName,
                                    value:item.taskId,
                                })
                            }
                        }
                    }
                })
            },
            async handleEdit(row) {
                let typeName;
                if(row.type == 1){
                    typeName = '排班收入'
                }else{
                    typeName = row.typeName;
                }
                let {respCode,data} = await this.ApiLists.getComDetail({talentSalaryId:row.salaryRecordId,type:row.type});
                if(respCode !== undefined && respCode === 0){
                    this.info = Object.assign(data,{title:typeName});
                    this.showDetail = true
                }
            },
            cancel(){
                this.showDetail =false;
                setTimeout(()=>{
                    this.info = {};
                },500)
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getList()
            },
             handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                 this.setPathSize({
                     name:this.$route.name,
                     type:null,
                     pageSize:val
                 })
                this.getList()
            },
        },
    }
</script>
<style lang="scss" scoped>
    .class-detail{
        padding:40px;
        margin-top:40px;
        background-color: #fff;
        .topCon {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .lockWidth {
                width: 200px;
            }

            .topFirst {
                display: flex;
                justify-content: space-between;
                align-content: center;
                align-items: center;
            }

        }
        .title-top{
            margin-top: -90px;
            margin-left: -40px;
            margin-bottom:60px;
        }
        .bottomCon {
            .tableCon {
                margin-top: 10px;
            }

            .pagCon {
                display: flex;
                justify-content: center;
                margin-top: 30px;
            }
        }
    }
</style>