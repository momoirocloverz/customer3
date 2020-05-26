<template>
    <div class="person-summary" v-loading="loading" element-loading-text="正在请求中...">
        <div class="topCon mt15">
            <div class="">
                <el-input @keyup.enter.native="search()" v-model="params.talentName" class="" size="small" placeholder="员工姓名"
                          clearable>
                    <el-button slot="append" icon="el-icon-search" @click="search()" ></el-button>
                </el-input>
            </div>
        </div>
        <div class="bottomCon">
            <div class="pt30 f14 pb10">
                合计：{{totalInfo.totalPop || 0}}人；
                排班收入{{totalInfo.salary || 0}}元；
                奖惩{{totalInfo.rewardAndPublish || 0}}元；
                扣款{{totalInfo.deduction || 0}}元；
                合计收入{{totalInfo.salaryTotal || 0}}元
            </div>
        </div>
        <div class="tableCon">
            <el-table :data="tableData"  style="width: 100%">
                <el-table-column prop="talentName" label="员工姓名"></el-table-column>
                <el-table-column prop="salary" label="排班收入(元)"></el-table-column>
                <el-table-column prop="rewardAndPublish" label="奖惩(元)"></el-table-column>
                <el-table-column prop="deduction" label="扣款(元)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salaryTotal" label="" show-overflow-tooltip>
                    <template slot="header" slot-scope="scope">
                        <span>待发收入(元)</span>
                        <el-popover
                                placement="top-start"
                                title=""
                                width="200"
                                trigger="hover"
                                content="该员工待发明细合计金额（未包含已冻结金额）">
                            <div slot="reference"><i class="el-icon-warning-outline cursor co-blue"></i></div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="freezeMoney" show-overflow-tooltip>
                    <template slot="header" slot-scope="scope">
                        <span>已冻结金额(元)</span>
                        <el-popover
                                placement="top-start"
                                title=""
                                width="200"
                                trigger="hover"
                                content="该员工待发明细中已冻结的合计金额">
                            <div slot="reference"><i class="el-icon-warning-outline cursor co-blue"></i></div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template v-slot="scope">
                        <el-button size="mini" type="text" @click="handleEdit(scope.row)">查看明细</el-button>
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
    </div>
</template>
<script>
    import { mapGetters,mapMutations} from 'vuex';
    export default {
        name: 'personSummary',
        data() {
            return {
                params:{
                    talentName:'',
                },
                loading:false,
                currentPage:1,
                pageSize:20,
                tableData: [],
                totalInfo:{},
                total:0,
            }
        },
        computed:{
            ...mapGetters(['getPathSize'])
        },
        watch:{
        },
        async mounted() {
            console.log(this.$route.name)
            await this.getSize();
            this.getList()
        },
        methods: {
            ...mapMutations(['setPathSize']),
            getSize(){
                if(this.getPathSize.length > 0){
                    for (let item of this.getPathSize){
                        if(item.name == this.$route.name + 'TabOne'){
                            this.pageSize = item.pageSize
                        }
                    }
                }
            },
            search() {
                this.currentPage = 1;
                this.getList()
            },
            getList() {
                this.loading = true;
                let params = {
                    talentName: this.params.talentName,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                }
                this.ApiLists.getListByPop(params).then(res => {
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
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    setTimeout(()=>{
                        this.loading = false;
                    },500)
                })
            },
            change(text){
                text = '该员工待发明细合计金额（未包含已冻结金额）';
                return this.$alert(text, '', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                });
            },
            handleEdit(row) {
                const { href } = this.$router.resolve({
                    name: 'incomeManagementClassDetail',
                    query:{
                        title:'待发',
                        ...row,
                    }
                });
                window.open(href);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getList()
            },
            handleSizeChange(val) {
                console.log(val)
                this.currentPage = 1;
                this.pageSize = val;
                this.setPathSize({
                    name:this.$route.name + 'TabOne',
                    type:null,
                    pageSize:val
                })
                this.getList()
            },
        },
    }
</script>
<style lang="scss" scoped>
    .person-summary{
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