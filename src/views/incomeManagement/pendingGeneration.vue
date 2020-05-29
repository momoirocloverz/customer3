<template>
    <div class="pending-generation" v-loading="loading" element-loading-text="正在请求中...">
        <el-form :model="form" status-icon ref="passwordForm" label-width="120px" class="">
            <div class="co-999 f16 pb20 pl20">请选择需要发放数据，生成待发放订单</div>
            <el-form-item label="选择任务">
                <div class="co-666">
                    {{ isTaskAll ? '全部' : `已选择${form.taskIds.length}个任务` }}
                    <span class="co-blue cursor pl10" @click="open()">重新选择</span>
                </div>
            </el-form-item>
            <el-form-item label="选择排班日期">
                <el-date-picker class="" v-model="dateRange" type="daterange" align="right" unlink-panels
                                range-separator="至" start-placeholder="不限" end-placeholder="不限"
                                value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                :picker-options="pickerOptions"
                                @change="handleChangeDateRange"
                                size="small"></el-date-picker>
            </el-form-item>
            <el-form-item label="选择人员属性">
                <div class="flex-box">
                    <el-checkbox class="pr30" :indeterminate="isIndeterminatePeople"
                                 v-model="checkPeopleAll"
                                 @change="handlePeopleCheckAllChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedPeopleCities" @change="handlePeopleCheckedCitiesChange">
                        <el-checkbox v-for="(item,index) in peoples" :label="item.attributeId" :key="index">{{item.attributeName}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-form-item>
            <el-form-item label="选择结算周期">
                <div class="flex-box">
                    <el-checkbox class="pr30" :indeterminate="isIndeterminate"
                                 v-model="checkAll"
                                 @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(city,index) in cities" :label="city.settlementType" :key="index">{{city.settlementTypeName}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-form-item>
            <el-form-item label="选择人员">
                <div>
                    {{ isTalentAll ? '全部' : `已选择${form.talentIds.length}个人员`}}
                    <span class="co-blue cursor pl10" @click="openTalent()">重新选择</span>
                </div>
            </el-form-item>
            <el-form-item label="其他设置">
                <el-checkbox-group class="label-col" v-model="setType">
                    <el-checkbox label="1">包含非本订单项奖惩的惩罚金额</el-checkbox>
                    <el-checkbox label="2">排除所选条件下合计待发金额≤0的人员</el-checkbox>
                </el-checkbox-group>
                <el-popover
                        placement="top-start"
                        title=""
                        width="200"
                        trigger="hover"
                        class="label-icon"
                        content="选中后，如所选人员有所选条件以外的待发放惩罚金额，亦将加入该订单">
                    <div slot="reference"><i class="el-icon-warning-outline cursor co-blue"></i></div>
                </el-popover>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" size="small" class="sameWidthBtn" @click="submit()">
                    生成待发放订单
                </el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="选择任务" :visible.sync="dialogTaskVisble" class="" width="520px"
                   :close-on-click-modal='true' :before-close="close" center>
            <el-table :data="taskData" @selection-change="handleSelectionChange" style="width: 100%" height="380px">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column prop="taskName" label="任务名称"></el-table-column>
            </el-table>
            <div class="flexHere flex-box pt20 flex-right">
                <el-button type="info" size="small" class="sameWidthBtn" @click="close()">取 消</el-button>
                <el-button type="primary" size="small" class="sameWidthBtn" @click="submitTask()"
                           :disabled="form.selectData.length == 0">保 存
                </el-button>
            </div>
        </el-dialog>
        <el-dialog title="选择人员" :visible.sync="dialogTalentVisble" class="dialog-talent-visble" width="880px"
                   height="500px"
                   style="overflow-y: auto" :close-on-click-modal='true' :before-close="closeTalent">
            <div class="flex-box flex-align">
                <div>
                    <el-select v-model="form.attributeName" class="mr20 el-select-width" placeholder="属性" size="small" @change="search">
                        <el-option  v-for="(item,index) in attributeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="form.settlementTypeName" class="mr20 el-select-width" placeholder="结算周期" size="small" @change="search">
                        <el-option  v-for="(item,index) in cycleOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="pb10" style="width: 240px">
                    <el-input v-model="form.talentName" class="" size="small" placeholder="人员姓名"
                              clearable>
                        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                    </el-input>
                </div>
            </div>
            
            <el-table :data="tableData"
                      ref="multipleTable"
                      :row-key="getRowKey"
                      @selection-change="handleSelectionChangeTalent"
                      style="width: 100%" height="300px">
                <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55">
                </el-table-column>
                <el-table-column prop="talentName" label="人员姓名" align="center"></el-table-column>
                <el-table-column prop="attributeName" label="属性" align="center"></el-table-column>
                <el-table-column prop="settlementTypeName" label="结算周期" align="center"></el-table-column>
                <el-table-column prop="salary" align="center">
                    <template slot="header" slot-scope="scope">
                        <span>待发收入(元)</span>
                        <el-popover
                                placement="top-start"
                                title=""
                                width="200"
                                trigger="hover"
                                content="该人员待发明细合计金额（未包含已冻结金额）">
                            <div slot="reference"><i class="el-icon-warning-outline cursor co-blue"></i></div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="freezeMoney" align="center">
                    <template slot="header" slot-scope="scope">
                        <span>已冻结金额(元)</span>
                        <el-popover
                                placement="top-start"
                                title=""
                                width="200"
                                trigger="hover"
                                content="该人员待发明细中已冻结的合计金额">
                            <div slot="reference"><i class="el-icon-warning-outline cursor co-blue"></i></div>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <div class="co-666 pt10 f14">已选中{{multipleSelection.length}}人
                <!--<el-checkbox class="ml20"-->
                             <!--v-model="checkTalendAll"-->
                             <!--@change="checkAllTalends">全部选择-->
                <!--</el-checkbox>-->
            </div>
            <div class="flexHere flex-box pt20 flex-align">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
                <div class="flex-box flex-right">
                    <el-button type="info" size="small" class="sameWidthBtn" @click="closeTalent()">取 消</el-button>
                    <el-button type="primary" size="small" class="sameWidthBtn" :disabled="multipleSelection.length === 0" @click="save()">保 存</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'pendingGeneration',
        components: {},
        data() {
            return {
                checkAll: true,
                checkPeopleAll: true,
                checkTalendAll: false,
                checkedCities: [],
                checkedPeopleCities: [],
                cities: [],
                peoples: [],
                isIndeterminate: true,
                isIndeterminatePeople: true,
                isTaskAll:true,
                isTalentAll:true,
                attributeOptions:[
                    { label:'不限',value:-1},
                ],
                cycleOptions:[
                    { label:'不限',value:-1 },
                ],
                form: {
                    attributeName:'',
                    settlementTypeName:'',
                    selectData: [],
                    selectTalentData:[],
                    talendAllIds:[],
                    taskIds:[],
                    talentIds:[],
                    startDate:null,
                    endDate:null,
                },
                multipleSelection:[],//当页
                multipleSelectionAll:[],//所有分页
                setType: ['1','2'],
                dialogTaskVisble: false,
                dialogTalentVisble: false,
                dateRange: '',
                pickerOptions: {
                },
                currentPage: 1,
                pageSize:5,
                taskData: [],
                total: 0,
                tableData: [],
                loading:false,
            }
        },
        watch: {
            setType:function (val){
                console.log(val)
            }
        },
        mounted() {
            this.getTalents();
            this.getAttributeList();
            this.getSettment();
            this.getTaskList();
        },
        methods: {
            handleSelectionChange(val) {
                this.form.selectData = val.map(i => i.taskId)
            },
            getSettment(){
                this.ApiLists.getSettleList().then(res => {
                    if(res.respCode === 0){
                        this.cities = res.data || [];
                        if(res.data && res.data.length > 0){
                            this.checkedCities = this.cities.map(i => i.settlementType)
                            this.handleCheckAllChange(this.cities)
                            for(let item of res.data){
                                this.cycleOptions.push({
                                    label:item.settlementTypeName,
                                    value:item.settlementType,
                                })
                            }
                        }

                        console.log(this.checkedCities)
                        console.log(this.cities)
                    }
                })
            },
            getAttributeList(){
                this.ApiLists.attributeList().then(res => {
                    if(res.respCode === 0){
                        this.peoples = res.data || [];
                        if(res.data && res.data.length > 0){
                            this.checkedPeopleCities = this.peoples.map(i => i.attributeId)
                            this.handlePeopleCheckAllChange(this.peoples)
                            for(let item of res.data){
                                this.attributeOptions.push({
                                    label:item.attributeName,
                                    value:item.attributeId,
                                })
                            }
                        }
                        console.log(this.checkedPeopleCities)
                        console.log(this.peoples)
                    }
                })
            },
            getTaskList() {
                this.taskData = []
                this.ApiLists.getBtaskList({
                    status: '1',
                    pageNum: 1,
                    pageSize: 0,
                }).then(res => {
                    if (res.respCode === 0) {
                        let list = res.data;
                        if (list) {
                            this.taskData = list
                            this.form.taskIds = list.map(i => i.taskId)
                        }
                    }
                })
            },
            getRowKey(row){
                return row.talentId;
            },
            handleSelectionChangeTalent(val) {
                let _this = this;
                this.multipleSelection = val
                console.log(val,'s')
                // setTimeout(()=>{
                //     _this.changePageCoreRecordData()
                // },20)

            },
            // 记忆选择核心方法
            changePageCoreRecordData (){
                // 标识当前行的唯一键的名称
                let _this = this;
                // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
                if (this.multipleSelectionAll.length <= 0) {
                    this.multipleSelectionAll = this.multipleSelection;
                    return;
                }
                // 总选择里面的key集合
                let selectAllIds = [];
                this.multipleSelectionAll.forEach(row=>{
                    selectAllIds.push(row['talentId']);
                })
                let selectIds = []
                // 获取当前页选中的id
                this.multipleSelection.forEach(row=>{
                    selectIds.push(row['talentId']);
                    // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
                    if (selectAllIds.indexOf(row['talentId']) < 0) {
                        _this.multipleSelectionAll.push(row);
                    }
                })
                let noSelectIds = [];
                // 得到当前页没有选中的id
                this.tableData.forEach(row=>{
                    if (selectIds.indexOf(row['talentId']) < 0) {
                        noSelectIds.push(row['talentId']);
                    }
                })
                noSelectIds.forEach(id=>{
                    if (selectAllIds.indexOf(id) >= 0) {
                        for(let i = 0; i< _this.multipleSelectionAll.length; i ++) {
                            if (_this.multipleSelectionAll[i]['talentId'] == id) {
                                // 如果总选择中有未被选中的，那么就删除这条
                                _this.multipleSelectionAll.splice(i, 1);
                                break;
                            }
                        }
                    }
                })
                //如果选中过，则回显
                if(this.multipleSelectionAll.length > 0){
                    for (let i of this.tableData){
                        for (let j of this.multipleSelectionAll){
                            if(i.talentId == j.talentId){
                                this.$refs.multipleTable.toggleRowSelection(i,true);//这步操作是让  页面显示选中的数据
                            }else{
                                this.$refs.multipleTable.clearSelection();
                            }
                        }
                    }
                }
                console.log(_this.multipleSelectionAll)
                console.log(_this.multipleSelection)
            },
            getTalents(type) {
                this.ApiLists.getBtalents({
                    pageNum: this.currentPage,
                    pageSize:this.pageSize,
                    attributeId:this.form.attributeName === -1 ? '' : this.form.attributeName,
                    settle:this.form.settlementTypeName === -1 ? '' : this.form.settlementTypeName,
                    talentName: this.form.talentName,
                }).then(async res => {
                    if (res.respCode === 0) {
                        let list = res.data.linkUserSalaryVOPageInfo.list;
                        let talendAllIds = res.data.talentIds
                        if (list) {
                            this.tableData = list;
                            this.form.talendAllIds = talendAllIds;
                            // this.form.talentIds = talendAllIds;
                            this.total = res.data.linkUserSalaryVOPageInfo.total

                        } else {
                            this.tableData = []
                            this.total = 0;
                        }
                    }
                })
            },
            handleChangeDateRange(val) {
                if(val){
                    this.form.startDate = val[0];
                    this.form.endDate = val[1];
                }else{
                    this.form.startDate = null;
                    this.form.endDate = null;
                }
            },
            close() {
                this.dialogTaskVisble = false;
                this.dialogTalentVisble = false;
            },
            closeTalent() {
                let len = this.form.talentIds.length;
                if (len > 0) {
                    this.$refs.multipleTable.clearSelection();
                    this.form.selectTalentData.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
                this.dialogTalentVisble = false;
            },
            open() {
                this.dialogTaskVisble = true
            },
            openTalent() {
                this.dialogTalentVisble = true
            },
            submitTask() {
                this.form.taskIds = this.form.selectData;
                this.isTaskAll = false
                this.dialogTaskVisble = false;
            },
            search() {
                this.currentPage = 1;
                this.getTalents()
            },
            save() {
                this.form.selectTalentData = this.multipleSelection;
                this.form.talentIds = this.multipleSelection.map(x => x.talentId);
                this.isTalentAll = false
                this.dialogTalentVisble = false;
            },
            submit() {
                let _this = this;
                _this.loading = true;
                let contiansReward = 0,existZero = 0;
                if(!this.setType.includes('1')){
                    contiansReward = 1
                }
                if(!this.setType.includes('2')){
                    existZero = 1
                }
                let params = {
                    taskIds:this.form.taskIds,
                    talentIds:this.form.talentIds.length > 0 ? this.form.talentIds : this.form.talendAllIds,
                    settles:this.checkedCities,
                    attributeIds:this.checkedPeopleCities,
                    schedulingDateStart:this.form.startDate,
                    schedulingDateEnd:this.form.endDate,
                    contiansReward:contiansReward,
                    existZero:existZero,
                }
                this.ApiLists.sendOrderQuery(params).then(res=>{
                    console.log(res)
                    if(res.respCode === 0){
                        if(res.data){
                            sessionStorage.removeItem('firstItem1');
                            sessionStorage.removeItem('firstItem2');
                            sessionStorage.removeItem('secondItem1'); 
                            sessionStorage.removeItem('secondItem2'); 
                            sessionStorage.removeItem('secondItem3'); 
                            sessionStorage.removeItem('secondItem4');
                            sessionStorage.removeItem('tabSwitch');   
                            sessionStorage.removeItem('tabSwitch2');  
                            this.$message.success('待发放订单生成成功')
                            const { href } = this.$router.resolve({
                                name: 'provideOrderDetail',
                                query:{
                                    id:res.data,
                                }
                            });
                            setTimeout(() => {
                                window.open(href);
                            },500)
                        }else{
                            this.$message.error('当前所设置条件，无可待发收入可生成，请修改相关条件')
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                }).finally(()=>{
                    setTimeout(()=>{
                        _this.loading = false;
                    },500)
                })
            },
            checkAllTalends(val){ //全选暂时不用
                console.log(val)
                let list = this.form.talendAllIds.map(i =>{
                    return Object.assign({
                        talendId:i,
                        talentName:'撒旦'+ i,
                        salary:i,
                        freezeMoney:i+3,
                    })
                })
                if(val){
                    this.tableData.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    })
                }else{
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.cities.map(i => i.settlementType) : [];
                this.isIndeterminate = false;
            },
            handlePeopleCheckAllChange(val) {
                this.checkedPeopleCities = val ? this.peoples.map(i => i.attributeId) : [];
                this.isIndeterminatePeople = false;
            },
            handlePeopleCheckedCitiesChange(value) {
                console.log(value)
                let checkedCount = value.length;
                this.checkPeopleAll = checkedCount === this.peoples.length;
                this.isIndeterminatePeople = checkedCount > 0 && checkedCount < this.peoples.length;
            },
            handleCheckedCitiesChange(value) {
                console.log(value)
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
             handleCurrentChange(val) {
                // this.changePageCoreRecordData()
                this.currentPage = val
                this.getTalents()
            },
        },
    }
</script>
<style lang="scss">
    .dialog-talent-visble {
        .el-dialog__body {
            padding-top: 10px;
        }
    }
</style>
<style lang="scss" scoped>
    .pending-generation {
        .dialogFlex {
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
        }
        .label-icon {
            position: relative;
            display: flex;
            top: -80px;
            margin-left: 220px;
        }

        .label-col {
            display: flex;
            flex-direction: column;
        }

        .title-top {
            margin-top: -90px;
            margin-left: -40px;
            margin-bottom: 60px;
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