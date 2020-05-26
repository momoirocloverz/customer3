<template>
    <div class="send-person-summary" v-loading="loading" element-loading-text="正在请求中...">
        <div class="topCon mt15">
            <div>
                <el-date-picker
                        v-model="params.month"
                        type="month"
                        value-format="yyyy-MM" format="yyyy-MM"
                        @change="handleChangeDateRange"
                        placeholder="本月">
                </el-date-picker>
            </div>
            <div class="">
                <el-input @keyup.enter.native="search()" v-model="params.talentName" class="" size="small" placeholder="员工姓名"
                          clearable>
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
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
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="" label="月份" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>{{scope.row.month | dateFor}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="talentName" label="员工姓名"></el-table-column>
                <el-table-column prop="salary" label="排班收入(元)" :formatter="moenyMatter"></el-table-column>
                <el-table-column prop="rewardAndPublish" label="奖惩(元)" :formatter="moenyMatter"></el-table-column>
                <el-table-column prop="deduction" label="扣款(元)" :formatter="moenyMatter" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salaryTotal" label="已发收入(元)" :formatter="moenyMatter" show-overflow-tooltip></el-table-column>
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
        name: 'sendPersonSummary',
        data() {
            return {
                params:{
                    talentName:'',
                    month:'',
                    nowMonth:this.Dayjs().format('YYYY-MM'),
                },
                loading:false,
                currentPage:1,
                pageSize:20,
                totalInfo:{},
                total:0,
                tableData: [],
            }
        },
        computed:{
            ...mapGetters(['getPathSize'])
        },
        watch:{
        },
        async mounted() {
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
            handleChangeDateRange(val){
                if(val){
                    this.params.month = val
                }else{
                    this.params.month = '';
                }
                this.currentPage = 1;
                this.getList()
            },
            moenyMatter(cell, col, val) {
                val = Number(val)
                if (val != NaN) {
                    return val.toFixed(2)
                } else {
                    return 0
                }
            },
            getList() {
                this.loading = true;
                let params = {
                    talentName: this.params.talentName,
                    month: this.params.month ? this.params.month : this.params.nowMonth,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                }
                this.ApiLists.getByPopAlready(params).then(res => {
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
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    setTimeout(()=>{
                        this.loading = false;
                    },500)
                })
            },
            handleEdit(row) {
                const { href } = this.$router.resolve({
                    name: 'incomeManagementClassDetail',
                    query:{
                        title:'已发',
                        ...row,
                    }
                });
                window.open(href);
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getList()
            },
            handleSizeChange(val) {
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
    .send-person-summary{
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