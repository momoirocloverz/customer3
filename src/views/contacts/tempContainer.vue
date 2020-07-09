<template>
  <div class="temp1Con">
      <h1 class="mb20">临时页面，调试使用</h1>
      <el-button type="primary" @click="popNow">点击1</el-button>
      <div class="mt20">
          <template v-for="(item,index) in storeCurrentTarget.schedulingSettingVOList">
          
            <div class="mb20">
              
                <el-button type="primary" @click="popStartPunch(item)">开始打卡</el-button>
      
                <el-button type="primary" @click="popPunch(item)">结束打卡</el-button>
              
            </div>
          
        </template>
    </div>
      
      
      
      
      
      <el-dialog title="快捷添加人员"  class="setRoot7Scoped setMiddleDialog" :visible.sync="humanVisible"  width="480px" :close-on-click-modal="false" border :class="{dynamicHeight:activeName1 != 'first' }">
          <div class="codeCon">
              <el-tabs class="tabWidth" v-model="activeName1" @tab-click="handleClick1">
                <el-tab-pane label="验证码" name="first"></el-tab-pane>
                <el-tab-pane label="身份证号" name="second"></el-tab-pane>
                <el-tab-pane label="二维码" name="third"></el-tab-pane>
            </el-tabs>
        <div v-if="activeName1 == 'first'">
            <div class="describe">申请验证码（30分钟内有效）</div>
            <div class="codeSelf">{{bindCode}}</div>
            <div class="listCon">
                <div>添加步骤：</div>
                <div>1、将此验证码告知需添加的人员；</div>
                <div>2、需添加的人员登录个人版APP，点击“加入排班”并输入验证码提交申请；</div>
                <div>3、查看申请名单，安排技能标签；</div>
               <div>4、已绑定并已设置结算周期、属性的人员按原设置结算，未绑定加入排班后结算周期自动默认为日结，属性默认为零工。</div> 
            </div>
            <div class="btnFirstCon"><el-button type="primary" size="small" @click="checkNameLists">查看申请名单</el-button></div>
        </div>
        <div v-if="activeName1 == 'second'" key="'idForm'">
            <el-form :model="idForm" label-position="left" ref="idForm" label-width="120px" class="demo-ruleForm" :rules="idRules" key="'idForm'">
                <el-form-item label="身份证号" prop="id">
                        <el-input v-model.trim="idForm.id" size="small" placeholder="请输入要添加人员的身份证号" maxLength="20"></el-input>
                    </el-form-item>
            </el-form>
            <div class="btnIdCon"><el-button type="primary" size="small" :disabled="!idForm.id" @click="idNext('idForm')">下一步</el-button></div>
        </div>
              <div v-if="activeName1 == 'third'" key="'qrForm'">
                <el-form :model="qrForm" label-position="left" ref="qrForm" label-width="120px" class="demo-ruleForm" :rules="qrRules">
                    <el-form-item label="安排技能标签" prop="skill" key="'qrForm'">
                        <el-select v-model="qrForm.skill" placeholder="请选择技能标签" class="setWidth">
                            <el-option  v-for="(item) in skillArr" :key="item.industry" :label="item.industryName" :value="item.industry"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                  <div class="btnIdCon"><el-button type="primary" size="small" :disabled="!qrForm.skill" @click="qrNext('qrForm')">下一步</el-button></div>                
            </div>
        </div>
    </el-dialog>
      <el-dialog title="申请名单"  class="setRoot6Scoped setMiddleDialog" :visible.sync="nameVisible"  width="640px" :close-on-click-modal="false" border>
            <div class="nameDialogCon">
                <el-select v-model="skill" placeholder="请选择技能标签" >
                    <el-option  v-for="(item) in skillArr" :key="item.industry" :label="item.industryName" :value="item.industry">
                    </el-option>
                </el-select>
                <div class="nameListCon">
                    <el-table :data="nameListTable" ref="nameListTable" style="width: 100%" height="250px" @selection-change="handle2SelectionChange">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column>
                            <template slot="header" slot-scope="scope">
                                已选中{{multiple2Selection.length}}人
                            </template>
                            <template slot-scope="scope">
                                {{scope.row.talentNameAlias}}
                            </template>
                        </el-table-column>
                        <el-table-column label="">
                            <template slot-scope="scope">
                                <div class="spIconCon">
                                    <div>
                                        {{scope.row.age}}
                                    </div>
                                    <div>
                                        {{scope.row.attributeName  }}
                                    </div>
                                    <div>
                                        {{scope.row.settlementTypeName  }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="">
                            <template slot-scope="scope">
                                <div>
                                    <el-button type="text" size="small" @click="popDelete(scope.row)">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="btnNameCon"><el-button type="primary" size="small" @click="addSelectedGuys" :disabled="!multiple2Selection.length || !skill ">确定添加</el-button></div>
            </div>
        </el-dialog>
        <el-dialog title="快捷添加人员—身份证号"  class="setRoot5Scoped setMiddleDialog" :visible.sync="idStepVisible"  width="480px" :close-on-click-modal="false" border>
            <div>
                <el-form :model="id2Form" label-position="left" ref="id2Form" label-width="120px" class="demo-ruleForm" :rules="id2Rules">
                    <el-form-item label="姓名">
                        <div>{{tempForm.realNameAlias}}</div>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <div>{{tempForm.idCard}}</div>
                    </el-form-item>
                    <el-form-item label="性别">
                        <div>{{tempForm.sex == 1 ? '男' : '女' }}</div>
                    </el-form-item>
                    <el-form-item label="安排技能标签" prop="skill">
                        <el-select v-model="id2Form.skill" placeholder="请选择技能标签"  @change="analysePrice(id2Form.skill)">
                            <el-option  v-for="(item) in skillArr" :key="item.industry" :label="item.industryName" :value="item.industry"></el-option>
                        </el-select>
                        </el-form-item>
                    <el-form-item label="单价">
                        <div>{{dynamicPrice}}</div>
                    </el-form-item>
                </el-form>
                <div class="btnIdCon"><el-button type="primary" size="small" @click="id2Next('id2Form')">确认添加</el-button></div>
            </div>
        </el-dialog>
        <el-dialog title="快捷添加人员—二维码"  class="setRoot8Scoped setMiddleDialog" :visible.sync="qrNormalVisible"  width="480px" :close-on-click-modal="false" border>
            <div class="qrDivCon">
                <div class="qrFirstline">
                    <div class="qrTitle">打卡标签</div>
                    <div class="qrContent">分拣</div>
                </div>
                <div class="qrSecondline">
                    <div class="qrTitle">打卡时间</div>
                    <div class="qrContent">2020-06-24 18:00</div>
                </div>
                <div class="qrcon">
                    <img class="hugeQr" :src="tempSrc">
                    <div>请让人员使用万才个人版APP扫码</div>
                </div>
                <div class="describe">人员扫此二维码可直接加入该技能标签并考勤打卡，如已加入则直接打卡；如人员未和企业绑定（即企业未给该人员设置结算周期），则该些员工将默认为日结（按日结算）</div>
            </div>
        </el-dialog>
        <el-dialog title="快捷添加人员—二维码"  class="setRoot9Scoped setMiddleDialog" :visible.sync="qrErrorVisible"  width="480px" :close-on-click-modal="false" border>
            <div>
                <div class="errorText">{{errText}}</div>
                <div class="btnIdCon"><el-button type="primary" size="small" @click="qrErrorVisible = false">我知道了</el-button></div>
            </div>
        </el-dialog>
        <el-dialog title="扫码打卡"  class="setRoot10Scoped setMiddleDialog" :visible.sync="scanVisible"  width="480px" :close-on-click-modal="false" border>
            <div class="scanText">现在生成的二维码，无论人员何时扫码，其打卡时间均为</div>
            <div class="scanTime">{{punchQrForm.time}}</div>
            <div class="btnIdCon">
                <el-button type="info" size="small" @click="scanVisible = false">暂不打卡</el-button>
                <el-button type="primary" size="small" @click="scanPunchNext">继续打卡</el-button>
            </div>
        </el-dialog>
        <el-dialog title="扫码打卡"  class="setRoot11Scoped setMiddleDialog" :visible.sync="qrScanVisible"  width="480px" :close-on-click-modal="false" border>
            <div class="qrDivCon">
                <div class="qrFirstline">
                    <div class="qrTitle">打卡工种</div>
                    <div class="qrContent">{{punchQrForm.industryName}}</div>
                </div>
                <div class="spSecondline">
                    <div class="qrTitle">打卡类型</div>
                    <div class="qrContent">{{punchQrForm.type}}</div>
                </div>
                <div class="spThirdline">
                    <div class="qrTitle">打卡时间</div>
                    <div class="qrContent">{{punchQrForm.time}}</div>
                </div>
                <div class="qrcon">
                    <img class="hugeQr" :src="punchSrc">
                    <div>请让人员使用万才个人版APP扫码</div>
                </div>
            </div>
        </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'temp1Con',
    data(){
        return {
            punchType:1,
            punchSrc:'',
            qrScanVisible:false,
            scanVisible:false,
            errText:'该技能标签开始打卡时间未设置，无法生成二维码',
            qrNormalVisible:false,
            qrErrorVisible:false,
            dynamicPrice:'选择技能标签后自动显示',
            idStepVisible:false,
            idForm:{
                id:'',
            },
            idRules:{
                id:[
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                ]
            },
            id2Rules:{},
            id2Form:{},
            qrForm:{
                skill:'',
            },
            qrRules:{
                skill:[
                    { required: true, message: '请输入身份证号', trigger: 'change' },
                ]
            },
            nameVisible:false,
            humanVisible:false,
            bindCode:'000000',
            activeName1:'first',
            skillArr:[],
            skill:'',
            multiple2Selection:[],
            nameListTable:[],
            storeCurrentTarget:{},
            currentTaskInfo:{},
            tempSrc:'',
            tempForm:{
                realNameAlias:'',
                idCard:'',
                sex:'',
                talentId:'',
            },
            punchQrForm:{
                industryName:'',
                type:'',
                time:'23',
                industry:'',
                currentTime:'',
            },
        }
    },
    mounted(){
        this.initFetch();
    },
    methods:{
        generatePunchSrc(){
            let str = '';
            let option = {
                version:9,
            }
             if( this.punchType == 1 ){
                 let obj1 = {
                     type: '2',
                     state:{
                         c: this.punchQrForm.currentTime,
                         id: this.storeCurrentTarget.id,
                         ind: this.punchQrForm.industry,
                         t: this.punchQrForm.time,
                         type: '1',
                     }
                 };
                 str = JSON.stringify(obj1);
                 str = window.btoa(unescape(encodeURIComponent(str)));
                 this.QRCode.toDataURL(str,option, (err, url)=> {
                    this.punchSrc = url
                 })
             }else{
                 let obj2 = {
                     type: '2',
                       state:{
                          c: this.punchQrForm.currentTime,
                          id: this.storeCurrentTarget.id,
                          ind: this.punchQrForm.industry,
                          t: this.punchQrForm.time,
                          type: '2',
                      }
                 };
                 str = JSON.stringify(obj2);
                 str = window.btoa(unescape(encodeURIComponent(str)));
                 this.QRCode.toDataURL(str,option, (err, url)=> {
                    this.punchSrc = url
                 })
             }  
        },
        scanPunchNext(){
            this.scanVisible = false;
            this.qrScanVisible = true;
            this.generatePunchSrc();
        },
        popStartPunch(item){
            this.punchType = 1;
            if( (this.storeCurrentTarget.priceCheckStatus != 1) || (this.storeCurrentTarget.priceCheckStatus != 4) ){
                this.$message({
                    message: '单价审核未通过，无法打卡。',
                    type: 'error'
                });
            }else{
                this.ApiLists.getCurrentTime().then(res=>{
                    let { data,respCode } = res;
                    if( respCode == 0 ){
                        let currentTime = data;
                        if( this.storeCurrentTarget.punchTimeManageSwitch && !item.startTimeSet ){
                            this.$message({
                                message: '请先设置开始打卡时间。',
                                type: 'error'
                            });
                        }
                        let workTime = '';
                        if( this.storeCurrentTarget.punchTimeManageSwitch ){
                            workTime = item.startTimeSet;
                        }else{
                            workTime = `${this.storeCurrentTarget.schedulingDate} ${item.workStartTime}`;
                        }
                        let resHours = 0;
                        resHours = this.currentTaskInfo.startPunchLimit / 60; 
                        let mixTime =  new Date(workTime).getTime();
                        let diff = mixTime - currentTime;
                        let stableDiff = this.currentTaskInfo.startPunchLimit*60*1000;
                        if( diff < stableDiff ){
                            if( workTime > currentTime ){
                                this.punchQrForm = {
                                    industryName:item.industryName,
                                    type:'开始打卡',
                                    time:this.Dayjs(workTime).format('YYYY-MM-DD HH:mm:ss'),
                                    industry:item.industry,
                                    currentTime
                                };
                                this.scanVisible = true;
                            }else{
                                let temp2 = this.timeProcesser(currentTime);
                                this.punchQrForm = {
                                    industryName:item.industryName,
                                    type:'开始打卡',
                                    time:this.Dayjs(temp2).format('YYYY-MM-DD HH:mm:ss'),
                                    industry:item.industry,
                                    currentTime
                                };
                                this.scanVisible = true;
                            }
                        }else{
                            this.$message({
                                message: `开始打卡时间前${resHours}小时才允许打卡`,
                                type: 'error'
                            });
                        }                    
                    }
                }).catch(err=>{
                    console.log('err',err);
                })  
            }
        },
        timeProcesser(currentTime){
            let temp2 = '';
            let afterFormatStr = this.Dayjs(currentTime).format('YYYY-MM-DD HH:mm:ss');
            let afterArr = afterFormatStr.split(':');
            let [ first,second,third ] = afterArr;
            let subArr = first.split(' ');
            let [subFirst,subSecond] = subArr;
            let diffMin = 0;
            if( (+second > 0)&&(+second < 30 ) ){
                diffMin = 30 - second;
            }
            if( +second > 30 ){
                diffMin = 60 - second;
            }
            let regeneMinute = String(+second + diffMin);
            let rewriteTime = `${subFirst} ${subSecond}:${regeneMinute}:00`;
            temp2 = rewriteTime; 
            return this.Dayjs(temp2).format('YYYY-MM-DD HH:mm:ss');
        },
        popPunch(item){
            this.punchType = 2;
            let endHours = 0;
            endHours = this.currentTaskInfo.endPunchLimit / 60; 
            if( (this.storeCurrentTarget.priceCheckStatus != 1) || (this.storeCurrentTarget.priceCheckStatus != 4) ){
                return this.$message({
                    message: '单价审核未通过，无法打卡。',
                    type: 'error'
                });
            }else{
                this.ApiLists.getCurrentTime().then(res=>{
                    let { data,respCode } = res;
                    if( respCode == 0 ){
                        let currentTime = data;
                        let workTime = `${this.storeCurrentTarget.schedulingDate} ${item.workEndTime}`;
                        let workDate = new Date(workTime).getTime();
                        let workEndTime = '';
                        if( this.storeCurrentTarget.endWorkType == 2 ){
                            let part = workDate + 24*60*60*1000;
                            workDate = part; 
                        }
                        if( this.storeCurrentTarget.punchTimeManageSwitch ){
                            if( item.endTimeSet ){
                                workEndTime = item.endTimeSet;
                            }else{
                                workEndTime = workTime;
                            }
                        }else{
                            workEndTime = workTime; 
                        }   
                        let diff = workDate - currentTime;
                        let stableDiff = this.currentTaskInfo.endPunchLimit*60*1000;
                        if( diff > stableDiff ){
                            return this.$message({
                                message: `已超出结束打卡时间${endHours}小时，不可打卡`,
                                type: 'error'
                            });
                        }
                        if( this.storeCurrentTarget.punchTimeManageSwitch ){
                            if( !item.endTimeSet ){
                                if( workDate > currentTime ){
                                    let temp2 = this.timeProcesser(currentTime);
                                    this.punchQrForm = {
                                        industryName:item.industryName,
                                        type:'结束打卡',
                                        time:temp2,
                                        industry:item.industry,
                                        currentTime
                                    };
                                    this.scanVisible = true;
                                }else{
                                    return this.$message({
                                        message: '请先设置结束打卡时间。',
                                        type: 'error'
                                    });
                                }
                            }else{                        
                                let endFlag = new Date(item.endTimeSet).getTime();
                                if( endFlag > currentTime ){
                                    let temp2 = this.timeProcesser(currentTime);
                                    this.punchQrForm = {
                                        industryName:item.industryName,
                                        type:'结束打卡',
                                        time:temp2,
                                        industry:item.industry,
                                        currentTime
                                    };
                                    this.scanVisible = true;
                                }else{
                                    this.punchQrForm = {
                                        industryName:item.industryName,
                                        type:'结束打卡',
                                        time:item.endTimeSet,
                                        industry:item.industry,
                                        currentTime
                                    };
                                    this.scanVisible = true;
                                }
                            }
                        }else{
                            if( workDate > currentTime ){
                                let temp2 = this.timeProcesser(currentTime);
                                this.punchQrForm = {
                                    industryName:item.industryName,
                                    type:'结束打卡',
                                    time:temp2,
                                    industry:item.industry,
                                    currentTime
                                };
                                this.scanVisible = true;
                            }else{
                                this.punchQrForm = {
                                    industryName:item.industryName,
                                    type:'结束打卡',
                                    time:workEndTime,
                                    industry:item.industry,
                                    currentTime
                                };
                                this.scanVisible = true;
                            }
                        }                    
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            }
        },
        popDelete(row){
            console.log(row);
        },
        normalShowQrcode(target){
            this.qrNormalVisible = true;
            this.generateAddCode(target);            
        },
        generateAddCode(target){
            let option = {
                version:9,
            }
            let str = '';
            this.ApiLists.getCurrentTime().then(res=>{
                let { data,respCode } = res;
                if( respCode == 0 ){
                    let currentTime = data;
                    let temp1 = `${this.storeCurrentTarget.schedulingDate} ${target.startTimeSet}`;
                    let temp2 = '';
                    let temp1stamp = new Date(temp1).getTime();
                    let diff = temp1stamp - currentTime;
                    if( diff > 0 ){
                        temp2 = temp1;
                    }else{
                        temp2 = this.timeProcesser(currentTime);
                    }
                    if( this.currentTaskInfo.punchType == 1 ){
                        let obj1 = {
                            type: '3',
                            state:{
                                c: currentTime,
                                cusId: this.storeCurrentTarget.customerId,
                                id: this.storeCurrentTarget.id,
                                ind: target.industry,
                                name: target.industryName,
                                t: temp2,
                                type: '1',
                            }
                        };
                        str = JSON.stringify(obj1);
                        str = window.btoa(unescape(encodeURIComponent(str)));
                        this.QRCode.toDataURL(str,option, (err, url)=> {
                            this.tempSrc = url
                        })
                    }else{
                        let obj2 = {
                            type: '4',
                            state:{
                                c: currentTime,
                                cusId: this.storeCurrentTarget.customerId,
                                id: this.storeCurrentTarget.id,
                                ind: target.industry,
                                name: target.industryName,
                            }
                        };
                        str = JSON.stringify(obj2);
                        str = window.btoa(unescape(encodeURIComponent(str)));
                        this.QRCode.toDataURL(str,option, (err, url)=> {
                            this.tempSrc = url
                        })
                    }  
                }
            }).catch(err=>{
                console.log('err',err);
            })
      },
        analyseStatus(){
//                    this.qrNormalVisible = true;
//                    this.qrErrorVisible = true;
           /* this.qrForm.skill
            this.skillArr*/
            let find1 = this.skillArr.find(ele=>{
                return ele.industry == this.qrForm.skill;
            })
            if( !find1.startTimeSet ){
                if( this.storeCurrentTarget.punchTimeManageSwitch ){
                    this.qrErrorVisible = true;
                    this.errText = '该技能标签开始打卡时间未设置，无法生成二维码';
                }else{
                    find1.startTimeSet = find1.workStartTime;
                    this.ApiLists.getCurrentTime().then(res=>{
                        let { data,respCode } = res;
                        if( respCode == 0 ){
                            let currentTime = data;
                            let resHours = 0;
                            resHours = this.currentTaskInfo.startPunchLimit / 60; 
                            let mixFirst = `${this.storeCurrentTarget.schedulingDate} ${find1.workStartTime}`;
                            let mixTime =  new Date(mixFirst).getTime();
                            let diff = mixTime - currentTime;
                            let stableDiff = this.currentTaskInfo.startPunchLimit*60*1000;
                            if( diff < stableDiff ){
                                this.qrErrorVisible = true;
                                this.errText = `早于开始打卡时间大于${resHours}小时，无法生成二维码`;
                            }else{
                                this.normalShowQrcode(find1);
                            }
                        }
                    }).catch(err=>{
                        console.log('err',err);
                    })
                }
            }else{
                this.normalShowQrcode(find1);
            }
        },
        qrNext(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    this.humanVisible = false;
                    this.analyseStatus();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        analysePrice(val){
            let find1 = this.skillArr.find(ele=>{
                return ele.industry == val;
            })
            let parseObj = JSON.parse( find1.salary );
            console.log( 'parseObj',parseObj );
            let find2 = parseObj.find(ele=>{
                return ele.settlementType == '1'
            })
            console.log( 'find2',find2 );
            
            
//            this.PriceForAdd();
//            console.log( this.PricePlugin(find1.salary) );
        },
        idStep2Action(){
            let find1 = this.skillArr.find(ele=>{
                return ele.industry == this.id2Form.skill;
            })
            let params1 = {
                schedulingId:this.storeCurrentTarget.id,
                talentId:this.tempForm.talentId,
                industry:this.id2Form.skill,
                industryName:find1.industryName,
                isScan:false,
            };
            this.ApiLists.schedulFastAddEmp(params1).then(res=>{
                let { respCode,data } = res;
                if( respCode == 0 ){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                }
            }).catch(err=>{
                console.log('err',err);
            })
        },
        id2Next(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    this.idStep2Action();
                  /*  this.idStepVisible = true;
                    this.humanVisible = false;*/
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        idNext(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params1 = {
                        idCard:this.idForm.id
                    };
                    this.ApiLists.fetchTalentByIdCard(params1).then(res=>{
                       let { respCode,data } = res;
                        if( respCode == 0 ){
                            if( data ){
                                this.idStepVisible = true;
                                this.humanVisible = false;
                                this.tempForm.realNameAlias = data.realNameAlias;
                                this.tempForm.idCard = data.idCard;
                                this.tempForm.sex = data.sex;
                                this.tempForm.talentId = data.id;
                            }else{
                                this.$message({
                                    message: '身份证号对应的人员不存在',
                                    type: 'error'
                                });
                            }
                        }   
                    }).catch(err=>{
                        console.log('err',err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addSelectedGuys(){
            let params1 = {
                schedulingId:this.$route.query.id,
            };
            let find1 = this.skillArr.find(ele=>{
                return ele.industry == this.skill;
            })
            params1.industry = this.skill;
            params1.industryName = find1.industryName;
            params1.applyIdList = this.multiple2Selection.map(ele=>{
                return ele.id
            })
            this.ApiLists.confirmApplySchCode(params1).then(res=>{
               let { respCode,data } = res;
                if( respCode == 0 ){
                    this.$message({
                        message: `添加成功`,
                        type: 'success'
                    });
                    this.nameVisible = false;
                    this.humanVisible = false;
                }   
            }).catch(err=>{
                console.log('err',err);
            })
        },
        handle2SelectionChange(val){
            this.multiple2Selection = val;
        },
        checkNameLists(){
            this.nameVisible = true;
            let params1 = {
                schedulingId:this.$route.query.id,
                pageNum:1,
                pageSize:10000,
            };
            this.ApiLists.applyListCustomer(params1).then(res=>{
               let { respCode,data } = res;
                if( respCode == 0 ){
                    this.nameListTable = data.list || [];
                }   
            }).catch(err=>{
                console.log('err',err);
            })
        },
        handleClick1(tab){
            switch (this.activeName1){
                case 'second':
                    this.$nextTick(()=>{
                        this.$refs.idForm.resetFields();
                        this.idForm.id = '';
                    })
                    break;
                case 'third':
                    this.$nextTick(()=>{
                        this.$refs.qrForm.resetFields();
                        this.qrForm.skill = '';
                    })
                    break;    
            }
        },
        popNow(){
            this.humanVisible = true;
            this.activeName1 = 'first';
            let params1 = {
                schedulingId:this.$route.query.id,
            };
            this.ApiLists.getSchedulingCode(params1).then(res=>{
               let { respCode,data } = res;
                if( respCode == 0 ){
                   this.bindCode = data;
                }   
            }).catch(err=>{
                console.log('err',err);
            })
        },
        fetchTaskInfo(){
            let params1 = {
                taskId:this.storeCurrentTarget.taskId,
            };
            this.ApiLists.getTaskdetails(params1).then(res=>{
                let { respCode,data } = res;
                if( respCode == 0 ){
                    this.currentTaskInfo = data;
                }   
            }).catch(err=>{
                console.log('err',err);
            })
        },
        initFetch(){
             let params1 = {
                id:this.$route.query.id,
            };
            this.ApiLists.schedulingDetail(params1).then(res=>{
                let { respCode,data } = res;
                if( respCode == 0 ){
                    this.storeCurrentTarget = data;
                    this.skillArr = this.storeCurrentTarget.schedulingSettingVOList.filter(ele=>{
                        return ele.status
                    }); 
                    this.fetchTaskInfo();
                }   
            }).catch(err=>{
                console.log('err',err);
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    .temp1Con {
        height: 100%;
        min-height: 100vh;
        
        
        
        .codeCon {
            .describe {
                color: #909399;
                font-size: 14px;
                line-height: 14px;
            }
            .codeSelf {
                color: #409EFF;
                font-size: 40px;
                line-height: 40px;
                margin-top: 20px;
                margin-bottom: 40px;
            }
            .listCon {
                color: #606266;
                font-size: 14px;
                height: 154px;
                line-height: 22px;
            }
            .btnFirstCon {
                display:flex;
                justify-content: flex-end;
                align-content: center;
                align-items: center;
                margin-top: 36px;
            }
        }
        .tabWidth {
            width: 240px;
            height: 70px;
        }
        .btnNameCon {
            display:flex;
            justify-content: flex-end;
            align-content: center;
            align-items: center;
        }
        .btnIdCon {
            display:flex;
            justify-content: flex-end;
            align-content: center;
            align-items: center;
        }
        .setWidth {
            width: 100%;
        }
        .qrDivCon {
            padding-top: 30px;
            box-sizing: border-box;
        }
        .qrcon {
            text-align: center;
            color: #909399;
            font-size: 14px;
            line-height: 14px;
            margin-bottom: 30px;
        }
        .hugeQr {
            width: 320px;
            height: 320px;
            margin-bottom: 20px;
        }
        .describe {
            color: #606266;
            font-size: 14px;
            line-height: 22px;
        }
        .spSecondline {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            padding-left: 60px;
            box-sizing: border-box;
            margin-top: 20px;
        }
        .spThirdline {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            margin-bottom: 40px;
            padding-left: 60px;
            box-sizing: border-box;
            margin-top: 20px;
        }
        .qrSecondline {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            padding-left: 60px;
            box-sizing: border-box;
            margin-top: 20px;
            margin-bottom: 40px;
        }
        .qrFirstline {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            padding-left: 60px;
            box-sizing: border-box;
        }
        .qrTitle {
            font-size: 14px;
            color: #606266;
            line-height: 14px;
            margin-right: 20px;
        }
        .qrContent {
            font-size: 14px;
            color: #606266;
            line-height: 14px;
        }
        .errorText {
            color: #909399;
            font-size: 14px;
            line-height: 14px;
            margin-bottom: 30px;
        }
        .spIconCon {
            display: flex;
            justify-content:flex-start;
            align-content: center;
            align-items: center;
        }
        .scanText {
            color: #909399;
            font-size: 14px;
            line-height: 14px;
            margin-bottom: 20px;
            margin-top: 10px;
        }
        .scanTime {
            color: #F56C6C;
            font-size: 20px;
            line-height: 20px;
            margin-bottom: 10px;
        }
        
        
        
        
        
        
        
        
        
        
        
        
    }
</style>
<style lang="scss" >
    .temp1Con {
        .setRoot7Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 490px;
            }
            .el-dialog__body {
                padding-top: 0;
            }
        }
        .dynamicHeight {
            .el-dialog {
                height: 240px !important;
            }
        }
        .setRoot6Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 390px;
            }
            .el-dialog__body {
                padding-top: 0;
            }
        }
        .setRoot5Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 410px;
            }
            .el-dialog__body {
                padding-top: 0;
            }
        }
        
        .setRoot8Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 656px;
            }
            .el-dialog__body {
                padding-top: 0;
            }
        }
        .setRoot9Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 180px;
            }
        }
        .setRoot10Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 180px;
            }
            .el-dialog__body {
                padding-top: 0;
            }
        }
        .setRoot11Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 590px;
            }
            .el-dialog__body {
                padding-top: 0;
            }
        }
    }
</style>