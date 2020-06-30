<template>
  <div class="taskCreatedstep">
    <div class="tbody">
        <el-steps :active="tasktStepsactive" finish-status="success" align-center>
          <el-step title="任务需求"></el-step>
          <el-step title="人员要求"></el-step>
          <el-step title="结算模式"></el-step>
          <el-step title="管理要求"></el-step>
        </el-steps>
        <el-form class="formbody" ref="taskCreatedform" :model="taskCreatedform" :label-position="'left'"  :rules="chargeRules">
          <!-- 任务需求 -->
          <div class="taskRequirements" v-show="tasktStepsactive==0">
            <el-form-item label="任务名称" prop="taskName">
              <el-input v-model="taskCreatedform.taskName" placeholder="请输入任务名称（不超过10个字）" maxLength="10" ></el-input>
            </el-form-item>
            <el-form-item label="发布对象" >
              <el-select v-model="Publishingobjects" placeholder="请选择" @change="PublishingobjectsChange">
                <el-option-group
                  v-for="group in partnerList"
                  :key="group.label"
                  :label="group.label"
                  >
                  <el-option
                    v-for="item in group.options"
                    :key="item.customerId"
                    :label="item.customerName"
                    :value="item.customerId">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <!-- 任务开始 -->
            <el-form-item label="任务开始时间" prop="startTime"> 
              <el-date-picker
                v-model="taskStartTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="09:00:00"
                value-format="yyyy-MM-dd HH:mm"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="任务结束时间"> 
              <el-radio v-model="termRadio" label="1">长期</el-radio>
              <el-radio v-model="termRadio" label="2">短期</el-radio>
            </el-form-item>
            <el-form-item label="" v-if="this.termRadio === '2'" prop="endTime"> 
              <el-date-picker
                v-model="taskEndTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="09:00:00"
                value-format="yyyy-MM-dd HH:mm"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预期工量">
              <el-input v-model="taskCreatedform.workQuantity" placeholder="请输入预期工量（选填）" ></el-input>
            </el-form-item>
            <el-form-item label="预期总价 (元) ">
              <el-input v-model="taskCreatedform.totalPrice" placeholder="请输入预期总价（选填）" ></el-input>
            </el-form-item>
            <el-form-item label="任务说明">
              <el-input v-model="taskCreatedform.explain" type="textarea" width placeholder="可描述现场情况和任务具体需求" ></el-input>
            </el-form-item>                                    
          </div>
          
          <!-- 人员要求 -->
          <div class="personnelRequirements" v-show="tasktStepsactive==1">
            <el-form-item label="每日排班人数">
              <el-input v-model="taskCreatedform.authorizedNumber" placeholder="请输入所需人数"></el-input>
            </el-form-item>
            <el-form-item label="所需技能标签">
              <el-select
                v-model="taskCreatedform.industryList"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择所需技能标签">
                <el-option
                  v-for="item in skillList"
                  :key="item.id"
                  :label="item.dicName"
                  :value="item.id">
                </el-option>
              </el-select>              
            </el-form-item>
            <el-form-item label="性别要求"> 
              <el-radio v-model="taskCreatedform.sexLimt" label="1">只限男性</el-radio>
              <el-radio v-model="taskCreatedform.sexLimt" label="2">只限女性</el-radio>
              <el-radio v-model="taskCreatedform.sexLimt" label="3">男女不限</el-radio>
            </el-form-item>            
            <el-form-item label="男工占比（%）" v-if="taskCreatedform.sexLimt == 3">
              <el-input v-model="taskCreatedform.sexRate" placeholder="请输入男工占比（%）"></el-input>
            </el-form-item>
            <el-form-item label="年龄范围（男）" class="personnelAge" v-if="taskCreatedform.sexLimt == 1 || taskCreatedform.sexLimt == 3"> 
              <el-input v-model="taskCreatedform.mageLowerLimit" placeholder="请输入最低年龄" class="personnelAgeinput"></el-input> 
               至    
              <el-input v-model="taskCreatedform.mageUpperLimit" placeholder="请输入最高年龄" class="personnelAgeinput"></el-input>           
            </el-form-item>
            <el-form-item label="年龄范围（女）" class="personnelAge" v-if="taskCreatedform.sexLimt == 2 || taskCreatedform.sexLimt == 3"> 
              <el-input v-model="taskCreatedform.fageLowerLimit" placeholder="请输入最低年龄" class="personnelAgeinput"></el-input> 
               至    
              <el-input v-model="taskCreatedform.fageUpperLimit " placeholder="请输入最高年龄" class="personnelAgeinput"></el-input>           
            </el-form-item>
            <el-form-item label="打卡要求"> 
              <el-radio v-model="taskCreatedform.attendance" label="1">半点打卡</el-radio>
              <el-radio v-model="taskCreatedform.attendance" label="2">不打卡</el-radio>
            </el-form-item>

            <el-form-item label="开始打卡" v-if="this.termRadio === '2'" > 
              <el-date-picker
                v-model="attendanceStart"
                type="datetime"
                placeholder="请选择开始打卡时间"
                default-time="09:00:00"
                value-format="yyyy-MM-dd HH:mm"
                >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="结束打卡" v-if="this.termRadio === '2'"> 
              <el-date-picker
                v-model="attendanceEnd"
                type="datetime"
                placeholder="请选择结束打卡时间"
                default-time="09:00:00"
                value-format="yyyy-MM-dd HH:mm"
                >
              </el-date-picker>
            </el-form-item>  

            <el-form-item label="任务地点"> 
              <el-input v-model="mapConfig.keyword" placeholder="请输入任务地点" @focus="viewMap"></el-input>
              <baidu-map ak="xtnQvrLuY6RFL5A0HAGaRGZysSa7Ntht" :scroll-wheel-zoom="true"  />
              <bm-view class="map"></bm-view>
            </el-form-item>
            <div class="mapbox" v-if="mapDia">
              <baidu-map :center="mapConfig.center" :zoom="mapConfig.zoom" >
                <bm-local-search :keyword="mapConfig.keyword" :auto-viewport="true" :location="mapConfig.location" @infohtmlset="infohtmlset">
                </bm-local-search>
              </baidu-map>
            </div>
            <el-form-item label="打卡范围(米)"> 
              <el-input v-model="taskCreatedform.attendanceScope" placeholder="请输入打卡范围"></el-input>
            </el-form-item>
          </div>


          <!-- 结算要求 -->
          <div class="settlementRequirements" v-if="tasktStepsactive==2">
            <el-form-item label="结算周期">
              <!-- 问题图标 -->
              <el-tooltip class="questionItem cycle" effect="dark" content="Top Left 提示文字" placement="top-start">
                <img :src="questionIcon" alt="">
              </el-tooltip> 
              <el-radio v-model="taskCreatedform.settlementType" label="1">日结</el-radio>
              <el-radio v-model="taskCreatedform.settlementType" label="2">周结</el-radio>
              <el-radio v-model="taskCreatedform.settlementType" label="4">月结</el-radio>
            </el-form-item>

            <!-- 半点打卡 -->
            <el-form-item label="计价方式" >
               <el-radio-group v-model="pricingmode"  @change="pricingmodeChange"> 
                  <el-radio label="1">计时</el-radio>
                  <el-radio label="2">计量</el-radio>
                  <el-radio label="3">计时+计量</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="计量类型" v-if="pricingmode != 1">
              <el-radio-group v-model="meteragetype" @change="meteragetypeChange">  <!-- :disabled="isEdit" -->
                  <el-radio  label="1">单一计量</el-radio>
                  <el-radio  label="2">组合计量</el-radio>
              </el-radio-group>
            </el-form-item>




           
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'单价'"
              :key="domain.key"
              class="dynamicbox"
              v-if="pricingmode != 1 && meteragetype ==2"
            >
              <el-input v-model="domain.value">
                <el-select v-model="domain.text" placeholder="请选择" slot="append" style="width:90px;" @change="autoPricingunitChange">
                  <el-option
                    v-for="item in unitList"
                    :key="item.id"
                    :label="'元/'+item.dicName "
                    :value="item.id">
                  </el-option>
                </el-select>  
              </el-input>
              <div @click.prevent="removeDomain(domain)" class="deletebtn" v-if="dynamicValidateForm.domains.length>1"></div>
            </el-form-item>

            <el-form-item v-if="pricingmode != 1 && meteragetype ==2" style="color:#409EFF;">
              <div @click="addDomain">添加计量单位</div>
            </el-form-item>



            <el-form-item label="计价单位"  v-if="pricingmode != 1 && meteragetype != 2"> 
              <el-select v-model="pricingunit" placeholder="请选择">
                <el-option
                  v-for="item in unitList"
                  :key="item.id"
                  :label="item.dicName"
                  :value="item.dicName">
                </el-option>
              </el-select>    
            </el-form-item>

            <el-form-item label="计量方式"  v-if="(pricingmode == 2 && meteragetype != 2) || (pricingmode == 3 && meteragetype != 2)">
              <el-radio-group v-model="pricingtype" >   <!-- :disabled="isEdit" -->
                <el-radio label="1">固定计价</el-radio>
                <el-radio label="2">阶梯计价</el-radio>
              </el-radio-group>
            </el-form-item>

            <div   
              v-for="(domain, index) in tieredpricingDom.domains"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              v-if="((pricingmode == 2 && meteragetype != 2) || (pricingmode == 3 && meteragetype != 2)) && pricingtype == 2">
              <el-form-item :label=" '计量单价（第'+ (index + 1) +'档)'">
              </el-form-item>
              <el-form-item :label="'数量'">
                <el-input v-model="domain.number"></el-input>
              </el-form-item>
              <el-form-item :label="'单价'">
                <el-input v-model="domain.price"></el-input>
              </el-form-item>
              <el-form-item  style="color:#409EFF;" v-if="tieredpricingDom.domains.length > 1">
                <div @click.prevent="removeTieredpricingDom(domain)" style="text-align: right;">删除阶梯</div>
              </el-form-item>
            </div>
            
            <el-form-item  style="color:#409EFF;text-align: right;"  v-if="((pricingmode == 2 && meteragetype != 2) || (pricingmode == 3 && meteragetype != 2)) && pricingtype == 2">
              <div @click.prevent="addTieredpricingDom">添加阶梯</div>
            </el-form-item>

                   
            <!-- 不打卡 -->
            <el-form-item label="计价方式" v-if="taskCreatedform.attendance == 2">
              <div>计量</div>
            </el-form-item>
            
            <el-form-item label="单价" class="personnelAge" v-if="(pricingmode == 1 && meteragetype == 1 ) || (pricingmode == 3 && meteragetype == 1) || (pricingmode == 3 && meteragetype == 2)" > 
              <el-input v-model="timeUnitprice" placeholder="请输入单价" class="personnelAgeinput"></el-input> 元/小时 
            </el-form-item>

            <el-form-item label="单价" class="personnelAge" 
            v-if="(pricingmode == 2 && pricingtype == 1) || 
            ( pricingmode == 2 && meteragetype == 1 )  || 
            (pricingmode == 3 && pricingtype == 1 ) || 
            ((pricingmode == 3  && meteragetype == 1))"> 
              <el-input v-model="unitPrice" placeholder="请输入单价" class="personnelAgeinput"></el-input> 元/ {{pricingunit}}
            </el-form-item>

            <el-form-item label="超出阶梯单价" class="personnelAge" 
            v-if="(pricingmode == 2 && pricingtype == 2 )|| 
            (pricingmode == 2 && pricingtype == 2) ||
            (pricingmode == 3 && meteragetype == 1 && pricingtype == 2)
            "> 
              <el-input v-model="taskCreatedform.name" placeholder="请输入单价" class="personnelAgeinput"></el-input> 元/{{pricingunit || '小时'}}
            </el-form-item>
          </div>


           <!-- 管理要求 -->
          <div class="managementRequirements" v-if="tasktStepsactive==3">
            <el-form-item label="排班单价审核">
              <!-- 问题图标 -->
              <el-tooltip class="questionItem" effect="dark" content="Top Left 提示文字" placement="top-start">
                <img :src="questionIcon" alt="">
              </el-tooltip> 
              <el-switch v-model="taskCreatedform.needPriceCheck"></el-switch>
            </el-form-item>

            <el-form-item class="special" label="第三方结算确认">
              <!-- 问题图标 -->
              <el-tooltip class="questionItem" effect="dark"  content="Top Left 提示文字" placement="top-start">
                <img :src="questionIcon" alt="">
              </el-tooltip>
              <el-switch v-model="taskCreatedform.needConfirm"  v-if="publishingBtn==1"></el-switch>
              <el-switch v-model="taskCreatedform.needConfirm" disabled v-if="publishingBtn===0" ></el-switch>
            </el-form-item>

            <el-form-item v-if="taskCreatedform.needConfirm == 1">
              <div slot="label">
                <span>第三方全称</span>
                <br>
                <span style="font-size:12px;color:#909399;">用于生成客户确认表的表头</span>
              </div>
              <el-input v-model="taskCreatedform.thirdPerson" placeholder="请输入第三方全称" class="personnelAgeinput" style="line-height:80px; width: 240px;"></el-input> 
            </el-form-item>

            <el-form-item label="结算确认人" v-if="taskCreatedform.needConfirm == 1">
              <!-- 问题图标 -->
              <el-tooltip class="questionItem" effect="dark" content="Top Left 提示文字" placement="top-start">
                <img :src="questionIcon" alt="">
              </el-tooltip>

              <!-- <el-select v-model="autoPricingunit" placeholder="请选择结算确认人">
                <el-option
                  v-for="item in unitList"
                  :key="item.id"
                  :label="'元/'+item.dicName "
                  :value="item">
                </el-option>
              </el-select>  -->
              
              <!-- <el-input v-model="taskCreatedform.taskConfirms" placeholder="请输入单价" class="personnelAgeinput" style="width: 240px;"></el-input> <span style="color:#409EFF; cursor:pointer">新增</span> -->
            </el-form-item>

            <!-- <el-form-item label="排班数据修改权限">
              <el-tooltip class="questionItem" effect="dark" content="Top Left 提示文字" placement="top-start">
                <img :src="questionIcon" alt="">
              </el-tooltip>
              <el-switch v-model="value"></el-switch>
            </el-form-item> -->

            <el-form-item label="排班内奖惩限制">
              <!-- 问题图标 -->
              <el-tooltip class="questionItem" effect="dark" content="Top Left 提示文字" placement="top-start">
                <img :src="questionIcon" alt="">
              </el-tooltip>
              <el-switch v-model="taskCreatedform.rewardLimit"  v-if="publishingBtn===1"></el-switch>
              <el-switch v-model="taskCreatedform.rewardLimit" disabled v-if="publishingBtn===0" ></el-switch>
            </el-form-item>
            <el-form-item label="人员单笔奖励上限（元）" v-if="taskCreatedform.rewardLimit==1" > 
              <el-input v-model="taskCreatedform.name" placeholder="请输入金额" style="width: 240px;"></el-input>
            </el-form-item>  
            <el-form-item label="单个排班奖励上限 (合计) (元）" v-if="taskCreatedform.rewardLimit==1"> 
              <el-input v-model="taskCreatedform.name" placeholder="请输入金额" style="width: 240px;" ></el-input>
            </el-form-item>                      
          </div>

          <div class="bottombtnbox">
            <el-button style="margin-top: 12px;" @click="pre" v-if="tasktStepsactive>0">上一步</el-button> 
            <el-button style="margin-top: 12px;" @click="next" v-if="tasktStepsactive<3">下一步</el-button>
            <el-button style="margin-top: 12px;" @click="submit" v-if="tasktStepsactive==3">发布</el-button> 
          </div>
        </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      User:'',
      questionIcon:require('@/assets/task/question.svg'),
      tasktStepsactive: 2,

      // 任务常见表单数据
      taskCreatedform:{
        taskName:'', // 任务名称

        startTime	: '', // 开始时间
        endTime:'',     // 结束时间
        workQuantity: '',  // 工量
        totalPrice:'',    // 总价
        explain:'',     // 说明

        // 人员要求
        authorizedNumber:'',
        industryList:[], // 技能标签
        sexLimt:'1', // 1男 2女 3不限
        sexRate:'', // 男女比例 
        fageUpperLimit:'',  // 女年龄上限
        fageLowerLimit:'',  // 女年龄下限
        mageUpperLimit:'',  // 男年龄上限
        mageLowerLimit:'',  // 男年龄下限
        attendance: '1',    // 打卡要求 (1 半点打卡 2 不打卡)
        attendanceStart:'',  // 打卡开始时间
        attendanceEnd : '',  // 打卡结束时间
        longitude:'',     // 任务地点 经度
        latitude:'',      // 纬度
        attendanceScope:'500',  // 签到范围

        // 结算方式
        settlementType: '1',  // 1.日2.月4.周）

        // 管理要求
        needPriceCheck:0,   // 排班单价审核 
        needConfirm:0,      // 第三方结算确认
        rewardLimit:0,      // 排班内奖惩限制
      },
      // 结算模式
        // 计价方式
        pricingmode: '1',  // （1 计时 2 计量 3 计时+计量）
        // 计量类型
        meteragetype: '1', // （1 单一计量 2 组合计量 ）
        // 计量单位
        pricingunit: '', 
        // 组合计价
        autoPricingunit:'',
        // 计量方式
        pricingtype: '1', // (1 固定计价 2 阶梯计价)
        // 计量单位
        unitList:[],
        // 组合计量
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
        },
        // 阶梯计价
        tieredpricingDom:{
          domains: [{
            price: '',
            number:'',
          }],
        },
        // 计时单价
        timeUnitprice:'',
        // 单位单价
        unitPrice:'',
      // 发布对象
      partnerList:[
        {
          label:'将任务指派给自己',
          options: [{
            customerId:  '',
            customerName: '自有任务'
          }]
        },{
          label: '将任务指派给合作伙伴',
          options: []
      }],
      Publishingobjects: '',   // 0自有任务 1指派任务
      publishingBtn : 0,  //  处理管理要求中 第三方 排班内惩戒 按钮是否限制
      // 发布时间
      taskStartTime:'',
      // 长期 & 短期
      termRadio: '1',
      taskEndTime: '',
      // 校验
      chargeRules:{
        taskName:[
          { required: true, message: '任务名称不能为空', trigger: 'blur' },
        ],
        // 开始时间
        startTime	: [
          {required: true, message: '开始时间不能为空', trigger: 'blur' }
        ], 
        // 结束时间
        endTime: [
          {required: true, message: '结束时间不能为空', trigger: 'blur' }
        ],     

        // taskName: [{required: true, message: '任务名称', trigger: 'blur' }], // 任务名称,{validator: validateTitle, trigger: 'blur' }
      },
      // 人员设置 技能标签
      skillList:[],
      // 地图相关 
      mapDia: false,
      mapConfig: {
        location: '',
        keyword: '',
        // 地图 经纬 层级
        center: { lng: 120.21937542, lat: 30.25924446 },
        zoom: 15,
      },
      // 阶梯的新增步径
      step:0,
      // 单价对象
      
      pricejson:[]



    }
  },
  created(){},
  watch: {
    'pricingunit': function (newshow, oldshow) {
      this.$set(this, 'pricingunit', newshow)
      console.log(this.pricingunit)
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    // 计量类型 change时 初始化计量方式
    meteragetypeChange(value){
      console.log(value)
      if(value == 1){
        this.pricingtype = '1';
      } else{
        this.pricingtype = '';
      }
     
    },
     // 计价方式 change时 初始化计量类型 计量类型
    pricingmodeChange(){
      this.meteragetype = '1';
      this.pricingtype = '1'; 
    },
    // 提交处理函数
    submit(){
      // 结算周期
      // pricingmode: '1',  // （1 计时 2 计量 3 计时+计量）
      // meteragetype: '1', // （1 单一计量 2 组合计量 ）
      // pricingtype: '1', // (1 固定计价 2 阶梯计价)
      //  数据 : countFixed = timeUnitprice 时间单价
      //  type 1 pricingmode == 1
      //  type 2 pricingmode == 2  meteragetype == 1  pricingtype== 1 
      //  type 3 pricingmode == 2  meteragetype == 1  pricingtype== 2
      //  type 4 pricingmode == 2  meteragetype == 2 
      //  type 5 pricingmode == 3  meteragetype == 1  pricingtype == 1
      //  type 6 pricingmode == 3  meteragetype == 1  pricingtype == 2
      //  type 7 pricingmode == 3  meteragetype == 2 
      let valuationType = 0;
      if(this.pricingmode == 1){
        valuationType = 1
      } else if( this.pricingmode == 2 && this.meteragetype == 1 && this.pricingtype== 1 ){
        valuationType = 2
      }else if( this.pricingmode == 2 && this.meteragetype == 1 && this.pricingtype== 2 ){
        valuationType = 3
      }else if(this,pricingmode == 2  && this.meteragetype == 2 ){
        valuationType = 4
      }else if(this.pricingmode == 3  && this.meteragetype == 1  && this.pricingtype == 1){
        valuationType = 5
      }else if(this.pricingmode == 3  && this.meteragetype == 1  && this.pricingtype == 2){
        valuationType = 6
      }else if(this.pricingmode == 3 && this.meteragetype == 2 ){
        valuationType = 7
      }


      if(this.pricingmode == 1){
         let obj = [
            { 
              "price":[
                {
                  "sex":"1",
                  "countFixed":this.timeUnitprice, // 计时单价
                  "valuationType":this.valuationType // 类型
                },
                {
                  "sex":"2",
                  "countFixed": this.timeUnitprice,
                  "valuationType": this.valuationType
                }
              ],
              "settlementType": this.taskCreatedform.settlementType
            }
          ]

      }

    },
    // 地图
    infohtmlset(location) {
      if(location.city){
        this.mapConfig.keyword= `${location.city}${location.address}${location.title}`;
      } else {
        this.mapConfig.keyword= `${location.address}${location.title}`;
      }
      this.taskCreatedform.latitude = location.point.lat;
      this.taskCreatedform.longitude = location.point.lng;
      this.mapDia = false
    },
    viewMap(){
      this.mapDia = true
    },
    // 获取用户信息
    getUser(){
      this.ApiLists.getBaseInfo().then(res => {
        this.User = res.data
        // 获取合作伙伴
        let userType =  this.User.customerInfo.type == 2 ? 1 : 2;
        let params = {
          pn: 0,
          ps: 0,
          customerId: this.User.customerId,
          type : userType
        }
        this.ApiLists.getPartnerList(params).then(res =>{
          this.partnerList[0].options[0].value = this.User.customerId
          this.$set(this.partnerList[1], 'options', res.data.list)
        })
        let skillparams = {
          pageNum:0,
          pageSize:0,
          customerId:this.User.customerId,
        }
        // 获取技能标签
        this.ApiLists.customerIndustry(skillparams).then(res => {
          res.data[0].sonNode.map(res=>{
            res.sonNode.map(item=>{
              this.skillList.push(item)
            })
          })
        })

        // 单位字典
        let priceParams = {
          level: 1,
          code:'pieceUnit',
          customerId: this.User.customerId,
        }
        this.ApiLists.getByCodeAndLevel(priceParams).then(res=>{
          this.unitList = res.data
        })
      })
    },
    
    PublishingobjectsChange(){
      // 不知发布对象需要哪些字段
      let newpublishingBtn = this.Publishingobjects  ?  1 : 0 
      this.$set(this,'publishingBtn', newpublishingBtn)
    },
    // 结算模式
      // 修改单一计量的 计价单位
      modifyCompany(){
       
      },
      autoPricingunitChange(value){
        let data = this.dynamicValidateForm.domains.map(item => {return item.text})
        if(data.length > 1) {
          if(new Set(data).size != data.length){
            this.$message({
              message: '单位不能重复选择！！',
              type: 'warning'
            })
            // this.dynamicValidateForm.domains.
          }
        }
      },
      // 添加计量单位
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now(),
          title:'',
          text: ''
        });
        console.log(this.dynamicValidateForm)
      },
      // 删除
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== 0) {
          this.dynamicValidateForm.domains.splice(index, 1)
        } else  {
          this.$set(this, 'meteragetype', '1')
          this.dynamicValidateForm.domains.splice(index, 1)
        }
        console.log(index)
      },

      // 添加阶梯对象
      addTieredpricingDom(index) {
        this.step ++
        this.tieredpricingDom.domains.push({
          value: '',
          key: Date.now(),
          price: '',
          number:'',
        });
        console.log(this.tieredpricingDom)
      },
      // 删除阶梯对象
      removeTieredpricingDom(item) {
        var index = this.tieredpricingDom.domains.indexOf(item)
        if (index !== 0) {
          this.tieredpricingDom.domains.splice(index, 1)
        } else  {
          this.$set(this, 'pricingtype', '1')
          this.tieredpricingDom.domains.splice(index, 1)
        }

        console.log(index)
      },
  
    // 下一步
    next(){
      if (this.tasktStepsactive++ > 2) this.tasktStepsactive = 3;

      let unitData = this.dynamicValidateForm.domains;
      let data = []
      unitData.forEach(item => {
        this.unitList.find(obj => {
          if(obj.id == item.text) {
            console.log(item)
            data.push(
              {
                count: item.value,
                "pieceUnit":{
                  id: obj.id,
                  note: obj.note,
                  dicName: obj.dicName,
                  dicVal: obj.dicVal,
                  a: 'b'
                }
              
              }
            )
          }
        })
      })
      console.log(data)
    },
    // 上一步
    pre(){
      if (this.tasktStepsactive-- < 1) this.tasktStepsactive = 0;
    }
  }
}
</script>
<style lang="scss" scoped>
.taskCreatedstep{
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  .tbody{
    // width: calc(100vw - 560px);
    width:50rem /* 800/16 */;
    min-height: calc(100vh - 240px);
    background: #fff;
    padding: 40px;
    margin: 40px 0;
    .formbody{
      margin: 55px 120px 0 0px;
      .personnelAge{
        .personnelAgeinput{
          width:10rem /* 160/16 */;
        }
      }
      .questionItem{
        position: absolute;
        left: -20px;
        top: 13px;
      }
      // 周期
      .cycle{
        left: -70px;
      }
      .el-input,.el-select,.el-textarea{
        width:21.875rem /* 350/16 */;
      }
      .managementRequirements{
        .el-form-item{
          .el-form-item__label{
            min-width:13.125rem /* 210/16 */;
          }
        }
        .el-form-item__content{
          div{
            margin-left: 8.75rem /* 140/16 */;
          }
        }
      }
      .special{
        .el-form-item__content{
          margin-left:0;
        }
      }
    }
    .bottombtnbox{
      display: flex;
      justify-content: center;
    }
  }
}
.mapbox {
  margin: 20px 8.625rem /* 138/16 */;
  position: relative;
  z-index: 8;
  div{
    width: 20rem /* 320/16 */;
    height: 10rem /* 160/16 */;
  }
}
</style>
<style lang="scss">
.taskCreatedstep{
  .tbody{
    .el-form-item__label{
      min-width: 8.625rem;
    }
    .dynamicbox{
      .el-form-item__content{
        display: flex;
        align-items: center;
        .deletebtn{
          background-image: url(../../assets/task/minus.svg);
          background-origin: border-box;
          background-repeat: no-repeat;
          height: 15px;
          width: 15px;
          margin-left: 10px;
        }
      }
    }
    .el-form-item__content{
      margin-left: 8.625rem;
    }
    .managementRequirements{
      .el-form-item{
        .el-form-item__label{
          min-width:13.125rem /* 210/16 */;
        }
      }
    }
  }
}
</style>




