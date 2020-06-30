<template>
  <div class="contactsMixCon">
        <div class="firstLine">
            <div class="firstLeft" @keyup.enter="searchAction">
                <el-input v-model.trim="name" size="small" class="lockItemInput" placeholder="请输入姓名进行搜索" maxLength="30" clearable><el-button slot="append" icon="el-icon-search" @click="runSearch"></el-button></el-input>
            </div>
            <div class="firstRight">
                <el-button size="small" type="primary" @click="popRecommand">推荐</el-button>
                <el-button size="small" type="primary" @click="bindPartner">绑定合作伙伴</el-button>
                <el-button size="small" type="primary" @click="popAdd">添加</el-button>
            </div>
        </div>
        <div class="yellowInfo" v-if="showYellow">
            <span class="smallArea" @click="popWait">有{{yellowNumber}}个人员待接收， <span class="yellowSp">马上确认</span><i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="flexCon" v-show="!searchClicked">
            <template v-for="(item,index) in contentArr">
                <div class="itemSelfCon" @click="normalItem(item)">
                    <div class="itemTextCon">
                        <div class="itemText">{{item.attributeName}}</div>
                        <el-tooltip class="item" effect="dark" :content="item.description" placement="top" :disabled="!!!item.description">
                            <i v-if="item.description" class="el-icon-question blueHere"></i>
                        </el-tooltip>
                    </div>
                    <div class="itemWithIcon">
                        <div class="itemCount">{{item.popNum}}</div>
                        <div class="fakeIcon"></div>
                    </div>
                </div>
            </template>
        </div>
        <div class="searchResCon"  v-show="searchClicked">
            <template v-for="(item,index) in searchResArr">
                <div class="resItemCon">
                    <div v-if="item.type == 0">
                        <div class="type0Con">
                            <div class="type0First">
                                <div class="itemForHead" :style=" 'backgroundImage: url('+ item.avatar +')' "></div>
                                <div class="type0DeatailCon">
                                    <div class="type0PhoneCon">
                                        <div class="type0PartnerCon">
                                            <div class="type0RealName">{{item.realNameAlias}}</div>
                                            <div class="type0Block">合作伙伴</div>
                                        </div>
                                        <div class="type0PhoneOuter"><i class="el-icon-phone mr10"></i>{{item.mobile}}</div>
                                    </div>
                                    <div class="type0bindTime">
                                        <span class="mr20">绑定时间</span>
                                        <span>{{item.startTime | stableDatefilter3}} </span>
                                    </div>
                                </div>
                            </div>
                            <div class="type0Sec">
                                <el-popover placement="left"  width="100" trigger="hover">
                                    <div style="margin-top:10px;text-align:center">确定删除“{{item.realNameAlias}}”?</div>
                                    <div style="margin-top:10px;text-align:center">
                                        <el-button type="danger" size="mini" @click="delPartner(item)">确定</el-button>
                                    </div>
                                    <el-button size="small" type="danger" plain slot="reference">删除</el-button>
                                </el-popover>                                  
                            </div>
                        </div>                        
                    </div>
                    <div v-else>
                        <div class="type1Con" @click.stop="jumpToDetail(item)">
                            <div class="type1Upper">
                                <div class="type1UpperFirst">
                                    <div class="type1DeatailCon">
                                        <div class="type1RealName">{{item.realNameAlias}}</div>
                                        <div class="ageBlock" :class=" 'age'+item.sex ">
                                            <div class="genderImg"  :class=" 'gender'+item.sex "></div> {{ String(item.age)+'岁'}}
                                        </div>
                                        <div class="type1Block">{{item.attributeName}}</div>
                                        <div class="settleBlock">{{item.settlementTypeName}}</div>
                                    </div>
                                    <div class="type1PhoneOuter">
                                        <i class="el-icon-phone mr10"></i>{{item.mobile}}
                                    </div>
                                </div>
                                <div class="type1UpperSec">
                                    <div class="type1SecLeft">
                                        <div class="mr20">标签</div>
                                        <div>{{ item.empCustomerVOS | customerFilter }}</div>
                                    </div>
                                    <div class="type1SecRight">
                                        <div  class="mr20">绑定时间</div>
                                        <div>{{item.startTime | stableDatefilter2}} </div>
                                    </div>
                                </div>
                            </div>
                            <div class="type1Bottom">
                                <el-popover placement="left"  width="100" trigger="hover">
                                    <div style="margin-top:10px;text-align:center">确定解绑“{{item.realNameAlias}}”?</div>
                                    <div style="margin-top:10px;text-align:center">
                                        <el-button type="danger" size="mini"  @click="unbindAction(item)" >确定</el-button>
                                    </div>
                                    <el-button size="small" type="info" slot="reference">解绑</el-button>
                                </el-popover> 
                                <el-button class="ml20" size="small" type="info" @click.stop="editCurrentItem(item)"   slot="reference">修改</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="nothing" v-if="!searchResArr.length">暂无</div>
        </div>

        <el-dialog title="待接收"  class="setRoot1Scoped setMiddleDialog" :visible.sync="waitIngVisible"  width="640px"  :close-on-click-modal="false" border >
        <div>
            <div class="firstHere1">
                <div>
                    <el-select v-model="firstAge" placeholder="最小年龄" class="setInputWidth" @change="ageFirstChange(firstAge)">
                        <el-option v-for="(item,index) in options4" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                    <span class="chinese">至</span> 
                    <el-select v-model="secAge" placeholder="最大年龄" class="ml20 setInputWidth" @change="ageSecChange(secAge)">
                        <el-option v-for="(item,index) in options5" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                </div>
                <div>
                    <el-input v-model.trim="waitName" size="small" class="lock2ItemInput" placeholder="请输入姓名" maxLength="30" clearable><el-button slot="append" icon="el-icon-search" @click="waitFetch"></el-button></el-input>
                </div>
            </div>
            <div class="firstHere2">
                <el-select v-model="partner" placeholder="合作伙伴" class="setInputWidth" @change="waitFetch">
                        <el-option v-for="(item,index) in options6" :key="item.customerId"  :label="item.customerName"  :value="item.customerId"></el-option>
                    </el-select>
                <el-select v-model="gender" placeholder="性别" class="setInputWidth" @change="waitFetch">
                        <el-option v-for="(item,index) in options7" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                <el-select v-model="skill" placeholder="标签" class="setInputWidth" @change="waitFetch">
                        <el-option v-for="(item,index) in options8" :key="item.skillValue"  :label="item.skillName"  :value="item.skillValue"></el-option>
                    </el-select>
            </div>
            <div class="waitTableCon">
                <el-table :data="waitTableData" ref="waitTable" style="width: 100%" height="250px" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column>
                        <template slot="header" slot-scope="scope">
                            已选中{{multipleSelection.length}}人
                        </template>
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column  prop="date" label=""></el-table-column>
                    <el-table-column  prop="date" label=""></el-table-column>
                    <el-table-column  prop="date" label=""></el-table-column>
                    <el-table-column  prop="date" label=""></el-table-column>
                </el-table>
            </div>
        </div>
      <div class="spFlexHere">
          <div class="spFlex1">
             <!-- <el-pagination
              @current-change="handle1CurrentChange"
              :current-page="current1"
              :page-sizes="[20, 200, 300, 400]"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total1">
            </el-pagination>-->
          </div>
          <div class="spFlexBtn1">
              <el-button type="info" size="small"  @click="refuseWait">拒绝</el-button>
              <el-button type="primary" size="small"  @click="confirmWait">确认接收</el-button>
          </div>
      </div>
    </el-dialog>
    <el-dialog title="待接收"  class="setRoot2Scoped setMiddleDialog" :visible.sync="waitIng2Visible"  width="480px"   :close-on-click-modal="false" border>
        <el-form ref="wait2Form" :model="wait2Form" :rules="wait2Rules" label-width="80px">
            <el-form-item prop="settlementType" label="结算周期">
                <el-select v-model="wait2Form.settlementType" placeholder="请选择结算周期" class="setInput1Width">
                    <el-option v-for="(item,index) in options3" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="attribute" label="属性">
                <el-select v-model="wait2Form.attribute" placeholder="请选择属性" class="setInput1Width">
                    <el-option v-for="(item,index) in options2" :key="item.id"  :label="item.attributeName"  :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <div class="spFlexBtn2">
              <el-button type="primary" size="small" @click="submitwait2Form('wait2Form')">保存</el-button>
          </div>
        </el-form>
    </el-dialog>
    <el-dialog title="推荐"  class="setRoot3Scoped setMiddleDialog" :visible.sync="recomand1Visible"  width="480px"   :close-on-click-modal="false" border>
        <el-form ref="wait3Form" :model="wait3Form" :rules="wait3Rules" label-width="80px">
            <el-form-item prop="partner" label="合作伙伴">
                <el-select v-model="wait3Form.partner" placeholder="请选择合作伙伴" class="setInput1Width">
                    <el-option v-for="(item,index) in optionsCopy6" :key="item.customerId"  :label="item.customerName"  :value="item.customerId"></el-option>
                </el-select>
            </el-form-item>
            <div class="spFlexBtn2">
              <el-button type="primary" size="small" @click="submitwait3Form('wait3Form')">下一步</el-button>
          </div>
        </el-form>
    </el-dialog>
    <el-dialog title="推荐"  class="setRoot4Scoped setMiddleDialog" :visible.sync="recomand2Visible"  width="640px"   :close-on-click-modal="false" border>
        <div>
            <div class="firstHere1">
                <div>
                    <el-select v-model="first2Age" placeholder="最小年龄" class="setInput3Width" @change="age2FirstChange(first2Age)">
                        <el-option v-for="(item,index) in option2s4" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                    <span class="chinese">至</span> 
                    <el-select v-model="sec2Age" placeholder="最大年龄" class="ml10 setInput3Width" @change="age2SecChange(sec2Age)">
                        <el-option v-for="(item,index) in option2s5" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                </div>
                <div>
                    <el-input v-model.trim="wait2Name" size="small" class="lock2ItemInput" placeholder="请输入姓名" maxLength="30" clearable><el-button slot="append" icon="el-icon-search" @click="wait2Fetch"></el-button></el-input>
                </div>
            </div>
            <div class="firstHere3">
                <el-select v-model="attribute2" placeholder="属性" class="setInput3Width" @change="wait2Fetch">
                        <el-option v-for="(item,index) in option2s9" :key="item.id"  :label="item.attributeName"  :value="item.id"></el-option>
                    </el-select>
                <el-select v-model="part2ner" placeholder="合作伙伴" class="setInput3Width" @change="wait2Fetch">
                        <el-option v-for="(item,index) in option2s6" :key="item.customerId"  :label="item.customerName"  :value="item.customerId"></el-option>
                    </el-select>
                <el-select v-model="gender2" placeholder="性别" class="setInput3Width" @change="wait2Fetch">
                        <el-option v-for="(item,index) in option2s7" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                <el-select v-model="skill2" placeholder="标签" class="setInput3Width" @change="wait2Fetch">
                        <el-option v-for="(item,index) in option2s8" :key="item.skillValue"  :label="item.skillName"  :value="item.skillValue"></el-option>
                    </el-select>
            </div>
            <div class="waitTableCon">
                <el-table :data="recommandTable" ref="recommandTable" style="width: 100%" height="250px" @selection-change="handle2SelectionChange">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column>
                        <template slot="header" slot-scope="scope">
                            已选中{{multiple2Selection.length}}人
                        </template>
                        <template slot-scope="scope">
                            {{scope.row.realNameAlias}}
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
                        技能标签 {{scope.row.empCustomerVOS | customerFilter }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
      <div class="spFlexHere">
          <div class="spFlex1">
        <!--      <el-pagination
              @current-change="handle2CurrentChange"
              :current-page="current2"
              :page-sizes="[20, 200, 300, 400]"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total2">
            </el-pagination>-->
          </div>
          <div class="spFlexBtn2">
              <el-button type="primary" size="small"  @click="confirm2Wait">提交</el-button>
          </div>
      </div>
    </el-dialog>
  <el-dialog title="添加"  class="setRoot5Scoped setMiddleDialog" :visible.sync="bind1Visible"  width="480px"   :close-on-click-modal="false" border>
        <el-form ref="bind1Form" :model="bind1Form" :rules="bind1Rules" label-width="80px">
            <el-form-item prop="settlementType" label="结算周期">
                <el-select v-model="bind1Form.settlementType" placeholder="请选择结算周期" class="setInput1Width">
                    <el-option v-for="(item,index) in options3" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="attribue" label="属性">
                <el-select v-model="bind1Form.attribue" placeholder="请选择属性" class="setInput1Width">
                    <el-option v-for="(item,index) in options2" :key="item.id"  :label="item.attributeName"  :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <div class="spFlexBtn2">
              <el-button type="primary" size="small" @click="submitbind1Form('bind1Form')">下一步</el-button>
          </div>
        </el-form>
    </el-dialog>

    <el-dialog title="添加"  class="setRoot6Scoped setMiddleDialog" :visible.sync="bind2Visible"  width="480px" :close-on-click-modal="false" border>
        <!--<el-tabs v-model="activeName1" @tab-click="handleClick1">
            <el-tab-pane label="二维码" name="first"></el-tab-pane>
            <el-tab-pane label="邀请链接" name="second"></el-tab-pane>
        </el-tabs>
        <div class="activeName1 == 'first' ">
        </div>
        <div class="activeName1 == 'second' ">
        </div>-->
        <div class="bind2ImgCon">
            <img  :src="tempSrc">
            <div class="text">万才个人用户使用个人版APP扫码即可添加</div>
        </div>
    </el-dialog>

    <el-dialog title="绑定合作伙伴"  class="setRoot7Scoped setMiddleDialog" :visible.sync="bind3Visible"  width="480px"   :close-on-click-modal="false" border>
        <div  class="codeCon">
            <div class="describe">验证码（30分钟内有效）</div>
            <div class="codeSelf">{{bindCode}}</div>
            <div class="listCon">
                <div>提示操作：</div>
                <div>1、将此验证码告知需添加的合作伙伴</div>
                <div>2、合作伙伴登录万才企业端，进入“通讯录”页面，点击[绑定合作伙伴]按钮</div>
                <div>3、输入此验证码并提交进行绑定</div>
            </div>
        </div>
    </el-dialog>
    <el-dialog title="修改"  class="setRoot8Scoped setMiddleDialog" :visible.sync="editVisible"  width="480px" :close-on-click-modal="false" border>
        <div class="editUpperCon">
        <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="140px">
            <div class="subEditUpper">
            <el-form-item label="姓名">
                <div>{{editForm.name}}</div>
            </el-form-item>
            <el-form-item label="结算周期">
                <el-select v-model="editForm.settlementType" placeholder="请选择结算周期" class="setInput1Width">
                    <el-option v-for="(item,index) in options3" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="属性">
                <el-select v-model="editForm.attributeId" placeholder="请选择属性" class="setInput1Width">
                    <el-option v-for="(item,index) in options2" :key="item.id"  :label="item.attributeName"  :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="skill" label="技能标签(最多3个)">
                <el-cascader size="small" class="setInput1Width"  v-model="editForm.skill" :props="props" @change="cascaderChange" :options="optionsCopy8" :show-all-levels="false" filterable></el-cascader>
            </el-form-item>
            </div>
            <div class="spFlexBtn2">
                <el-button type="primary" size="small" @click="submitEditForm('editForm')">确定修改</el-button>
            </div>
        </el-form>
            </div>
    </el-dialog>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'contactsMix',
  data() {
      var validateEditSkill = (rule, value, callback) => {
          if( this.editForm.skill.length ){
              if( this.editForm.skill.length>3 ){
                  callback(new Error('技能标签最多3个'));
              }else{
                  callback();
              }
          }else{
              callback(new Error('请选择技能标签'));
          }
      };
    return {
        props: { 
            multiple: true
        },
        editVisible:false,
        optionsCopy8:[],
        editForm:{
            bindId:'',
            talentId:'',
            name:'',
            settlementType:'',
            attributeId:'',
            skill:'',
        },
        editRules:{
            skill:[
                { required: true, message: '请选择技能标签', trigger: 'change' },
                { validator: validateEditSkill, trigger: 'blur' }
            ],
        },
        bindCode:0,
        bind3Visible:false,
        tempSrc:'',
        activeName1:'first',
        bind1Visible:false,
        bind2Visible:false,
        recomand1Visible:false,
        recomand2Visible:false,
        wait2Form:{
            settlementType:'',
            attribute:'',
        },
        wait2Rules:{
            settlementType:[
                { required: true, message: '请选择结算周期', trigger: 'change' },
            ],
            attribute:[
                { required: true, message: '请选择属性', trigger: 'change' },
            ],
        },
        wait3Form:{
            partner:'',
        },
        wait3Rules:{
            partner:[
                { required: true, message: '请选择合作伙伴', trigger: 'change' },
            ],
        },
        current1:1,
        pageSize:20,
        total1:0,
        waitTableData:[],
        waitName:'',
        waitCurrent:1,
        options2:[],
        options3:[
            { label:'日结',value:1 },
            { label:'月结',value:2 },
            { label:'周结',value:4 },
        ],
        options4:[],
        options5:[],
        options6:[],
        optionsCopy6:[],
        options7:[
            { label:'性别',value:'' },
            { label:'男',value:1 },
            { label:'女',value:2 }
        ],
        options8:[],
        firstAge:'',
        secAge:'',
        name:'',
        partner:'',
        gender:'',
        skill:'',
        searchClicked:false,
        searchResArr:[],
        contentArr:[],
        showPersonal:false,
        showYellow:true,
        yellowNumber:0,
        waitIngVisible:false,
        waitIng2Visible:false,
        waitTotalIds:[],
        multipleSelection: [],
        multiple2Selection:[],
        first2Age:'',
        option2s4:[],
        sec2Age:'',
        option2s5:[],
        wait2Name:'',
        attribute2:'',
        option2s9:[],
        part2ner:'',
        option2s6:[],
        gender2:'',
        option2s7:[
            { label:'性别',value:'' },
            { label:'男',value:1 },
            { label:'女',value:2 }
        ],
        skill2:'',
        option2s8:[],
        recommandTable:[],
        current2:1,
        total2:0,
        bind1Form:{
            settlementType:"",
            attribue:"",
        },
        bind1Rules:{
            settlementType:[
                { required: true, message: '请选择结算周期', trigger: 'change' },
            ],
            attribue:[
                { required: true, message: '请选择属性', trigger: 'change' },
            ],
        },
    }
  },
    filters:{
        customerFilter(value){
            let arr1 = value.map(ele=>{
                return ele.skillName;
            })
            let str = arr1.join('/')
            return str;
        },
    },
    computed:{
        ...mapGetters([
            'getWebInfo',
        ]),
    },
  mounted(){
      this.analyseCurrent();
      this.initSearch();
  },
  methods: {
      cascaderChange(value){
          if( value.length >= 3 ){
              this.optionsCopy8.forEach(ele=>{
                  ele.disabled = true;
              })
              let [first,second,third] = value;
              let track1 = this.optionsCopy8.find(ele=>{
                  return ele.value == first[0];
              })
              let track2 = this.optionsCopy8.find(ele=>{
                  return ele.value == second[0];
              })
              let track3 = this.optionsCopy8.find(ele=>{
                  return ele.value == third[0];
              })
              let trackSub1 = track1.children.find(ele=>{
                  return ele.value == first[1];
              })
              let trackSub2 = track2.children.find(ele=>{
                  return ele.value == second[1];
              })
              let trackSub3 = track3.children.find(ele=>{
                  return ele.value == third[1];
              })              
              track1.disabled = false;
              track2.disabled = false;
              track3.disabled = false;
              track1.children.forEach(ele=>{
                  ele.disabled = true;
              })
              track2.children.forEach(ele=>{
                  ele.disabled = true;
              })
              track3.children.forEach(ele=>{
                  ele.disabled = true;
              })    
              trackSub1.disabled = false;
              trackSub2.disabled = false;
              trackSub3.disabled = false;
          }else{
              this.optionsCopy8.forEach(ele=>{
                  ele.disabled = false;
                  ele.children.forEach(subEle=>{
                      subEle.disabled = false;
                  })
              })
          }
      },
      getIndustryArr(){
          let skillparams = {
              pageNum:0,
              pageSize:0,
              customerId:this.getWebInfo.customerId,
          }
          this.ApiLists.customerIndustry(skillparams).then(res => {
            let { data,respCode } = res;
              if( respCode === 0 ){
                  data[0].sonNode.forEach(ele=>{
                      ele.label = ele.dicName;
                      ele.value = ele.dicVal;
                      ele.sonNode.forEach(subele=>{
                          subele.label = subele.dicName;
                          subele.value = subele.dicVal;
                      });
                      ele.children = ele.sonNode;
                  });
                   this.optionsCopy8 = data[0].sonNode;
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      searchAction(){
          this.runSearch();
      },
      delPartner(item){
          let params = {
              partnerId:item.partnerId
          };
          this.ApiLists.removePartner(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.$message({
                      message: '删除成功',
                      type: 'success'
                  });
                 this.runSearch();
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      submitEditAction(){
          let params = {
              bindId:this.editForm.bindId,
              settlementType:this.editForm.settlementType,
              talentId:this.editForm.talentId,
              attributeId:this.editForm.attributeId,
          };
          let empty = [];
          let [first,second,third] = this.editForm.skill;
          if( first ){
              let find1 = this.optionsCopy8.find(ele=>{
                  return first[0] == ele.dicVal
              })
              let findSon1 = find1.children.find(ele=>{
                  return first[1] == ele.dicVal
              })
             empty.push({
                 skillValue:findSon1.dicVal,
                 skillName:findSon1.dicName,
              });
          }
           if( second ){
              let find2 = this.optionsCopy8.find(ele=>{
                  return second[0] == ele.dicVal
              })
              let findSon2 = find2.children.find(ele=>{
                  return second[1] == ele.dicVal
              })
               empty.push({
                 skillValue:findSon2.dicVal,
                 skillName:findSon2.dicName,
              });
          }
          if( third ){
              let find3 = this.optionsCopy8.find(ele=>{
                  return third[0] == ele.dicVal
              })
              let findSon3 = find3.children.find(ele=>{
                  return third[1] == ele.dicVal
              })
               empty.push({
                 skillValue:findSon3.dicVal,
                 skillName:findSon3.dicName,
              });
          }
          params.empCustomerSkills = empty;
          this.ApiLists.talentUpdateAttr(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.$message({
                      message: '修改成功',
                      type: 'success'
                  });
                  this.editVisible = false;
                  this.runSearch();
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      submitEditForm(formName){
          this.$refs[formName].validate(valid => {
              if (valid) {
                  this.submitEditAction();
              }else{
                  
              }
          })
      },
      editCurrentItem(item){
          clearTimeout(window.mixContimer1);
          this.editVisible = true;
          this.setOption2();
          this.assignOptions();
          this.editForm.bindId = item.bindId;
          this.editForm.talentId = item.talentId;
          this.editForm.name = item.realNameAlias;
          this.editForm.settlementType = item.settlementType;
          this.editForm.attributeId = item.attributeId;
          this.getIndustryArr();
          window.mixContimer1 = setTimeout(()=>{
              let temp = [];
              item.empCustomerVOS.forEach(ele=>{
                  temp.push([ele.parentSkillVlaue,ele.skillValue])
              })
              this.$nextTick(()=>{
                  this.editForm.skill  =  temp;
              });
          },600);          
      },
      unbindAction(item){
          let params = {
              bindId:item.bindId
          };
          this.ApiLists.talentUnbind(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.$message({
                      message: '解绑成功',
                      type: 'success'
                  });
                 this.runSearch();
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      jumpToDetail(item){
          const { href } = this.$router.resolve({
              name: 'contactsBlankDetail',
              query:{
                  talentId:item.talentId
              }
          });
          window.open(href);
      },
      generateAddCode(){
          let option = {
              version:9,
          }
          let str = '';   
          if( this.getWebInfo.customerInfo.type  == 1  ){
              let obj1 = {
                  state:{
                      id:this.getWebInfo.customerId,
                      name:this.getWebInfo.customerInfo.realName,
                      toc:1,
                  },
                  type:1,
              };
              str = JSON.stringify(obj1);
              str = window.btoa(unescape(encodeURIComponent(str)));
              this.QRCode.toDataURL(str,option, (err, url)=> {
                  this.tempSrc = url
              })
          }
          if(this.getWebInfo.customerInfo.type  == 2){
              let obj2 = {
                  state:{
                      id:this.getWebInfo.customerId,
                      name:this.getWebInfo.customerInfo.shortName,
                      toc:2,
                      attrid:this.bind1Form.attribue,
                      st:this.bind1Form.settlementType,
                  },
                  type:1,
              };
              str = JSON.stringify(obj2);
              str = window.btoa(unescape(encodeURIComponent(str)));
              this.QRCode.toDataURL(str,option, (err, url)=> {
                  this.tempSrc = url
              })
          }
      },
      handleClick1(tab){
          console.log( this.activeName1 );
      },
      showBindStep2(){
          this.bind1Visible = false;     
          this.$refs.bind1Form.resetFields();
          this.generateAddCode();
          this.bind2Visible = true;
      },
      submitbind1Form(formName){
          this.$refs[formName].validate(valid => {
              if (valid) {
                  this.showBindStep2();
              }else{
                  
              }
          })
      },
      refuseWait(){
          this.waitIngVisible = false;
      },
      fetchRecommandList(){
          let params = {
              customerId:this.wait3Form.partner,
              pageNum:0,
              pageSize:0,
          };
          let typeMap = {
              1:'talentSmallCus',
              2:'talentsCus',
          };
          this.ApiLists[typeMap[this.getWebInfo.customerInfo.type]](params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  let bridge = []; 
                  if( data && data.talentInfoPage ){
                      bridge = data.talentInfoPage.list || [];
                  }
                  this.recommandTable = bridge;
                  this.total2 = data.talentInfoPage.total;
              }
          }).catch(err=>{
              console.log('err',err);
          })  
      },
      initRecommand(){
          let params = {
              customerId:this.getWebInfo.customerId,
              pageNum:0,
              pageSize:0,
          };
          this.ApiLists.orgrimarAttributeList(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  let bridge = data.list || [];
                  this.option2s9 = [{attributeName:'属性',id:''},...bridge];
              }
          }).catch(err=>{
              console.log('err',err);
          })  
          this.assignOptions();
          this.fetchRecommandList();
      },
      handle2CurrentChange(){
          
      },
      confirm2Wait(){

      },
      wait3FormAction(){
          this.recomand1Visible = false;
          this.recomand2Visible = true;
          this.initOptions4();
          this.initRecommand();
      },
      submitwait3Form(formName){
          this.$refs[formName].validate(valid => {
              if (valid) {
                  this.wait3FormAction();
              }else{
                  
              }
          })
      },
      wait2FormAction(){
          let params = {
              status:'1',
              settlementType:this.wait2Form.settlementType,
              attributeId:this.wait2Form.attribute,
          };
          let track = this.options2.find(ele=>{
              return ele.id == this.wait2Form.attribute;
          })
          params.attributeName = track.attributeName;
          let recommand = this.multipleSelection.map(ele=>{
              return ele.id
          })          
          params.recommendIds = recommand;
          console.log( 'params',params );
       /*   this.ApiLists.switchEmpStatus(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.$message({
                      message: '设置成功',
                      type: 'success'
                  });
                  this.waitIng2Visible = false;
              }
          }).catch(err=>{
              console.log('err',err);
          })  */
      },
      submitwait2Form(formName){
          this.$refs[formName].validate(valid => {
              if (valid) {
                  this.wait2FormAction();
              }else{
                  
              }
          })
      },
      setOption2(){
          let params = {
              customerId:this.getWebInfo.customerId,
              pageNum:0,
              pageSize:0,
          };
          this.ApiLists.orgrimarAttributeList(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.options2 = data.list || [];
              }
          }).catch(err=>{
              console.log('err',err);
          })  
      },
      confirmWait(){
          this.waitIngVisible = false;
          this.wait2Form.settlementType = '';
          this.wait2Form.attribute = '';
          this.waitIng2Visible = true;
          this.setOption2();
      },
      handle1CurrentChange(){
          
      },
      handle2SelectionChange(val){
          this.multiple2Selection = val;
      },
      handleSelectionChange(val){
          this.multipleSelection = val;
      },
      age2FirstChange(age){
          let tempArr = [];
          for ( let i = age+1;i<100;i++ ){
              tempArr.push({
                  value:i,
                  label:i
              })
          }
          this.option2s5 = tempArr;
      },
      age2SecChange(age){
          this.wait2Fetch();
      },
      wait2Fetch(){
        
      },
      waitFetch(){
          this.waitCurrent = 1;
          this.fetchWaitTableData();
      },
      ageFirstChange(age){
          let tempArr = [];
          for ( let i = age+1;i<100;i++ ){
              tempArr.push({
                  value:i,
                  label:i
              })
          }
          this.options5 = tempArr;
      },
      ageSecChange(age){
          this.waitFetch();
      },
      initOptions4(){
          let tempArr = [];
          for ( let i = 10;i<100;i++ ){
              tempArr.push({
                  value:i,
                  label:i
              })
          }
          this.options4 = tempArr;
          this.option2s4 = tempArr;
      },
      fetchWaitTableData(){
          let params = {
              sex:this.gender,
              customerId:this.partner,
              skill:this.skill,
              firstAge:this.firstAge,
              secAge:this.secAge,
              talentName:this.waitName,
              pageNum:this.waitCurrent,
              pageSize:20,
          };
          this.ApiLists.waitReceiveEmp(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.waitTableData = data.talentInfoPage.list ||[];
                  this.waitTotalIds = data.talents ||[];
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      assignOptions(){
          let params = {
              pn:0,
              ps:0,             
              customerId:this.getWebInfo.customerId,
              type:this.getWebInfo.customerInfo.type == 1 ? 2 : 1,
          };
          this.ApiLists.getPartnerList(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  if( data ){
                      let bridge = data.list || [];
                      this.options6 = [{ customerName: "合作伙伴",customerId: "" },...bridge];
                      this.option2s6 = [{ customerName: "合作伙伴",customerId: "" },...bridge];
                  }
              }
          }).catch(err=>{
              console.log('err',err);
          })
          this.ApiLists.fetchTalentSkills().then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  if( data ){
                      let bridge = data || [];
                      this.options8 = [{ skillName: "标签",skillValue: "" },...bridge];
                      this.option2s8 = [{ skillName: "标签",skillValue: "" },...bridge];
                  }
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      popWait(){
          this.waitIngVisible = true;
          this.gender = '';
          this.partner = '';
          this.skill = '';
          this.firstAge = '';
          this.secAge = '';
          this.waitName = '';
          this.waitCurrent = 1;
          this.$nextTick(()=>{
              this.initOptions4();
              this.fetchWaitTableData();
              this.assignOptions();
          })
      },
      analyseCurrent(){
          if( this.getWebInfo.customerInfo.type ){
              if( this.getWebInfo.customerInfo.type == 2 ){
                  this.showPersonal = false;
                  this.fetchReceiveEmpNum();
              }
              if( this.getWebInfo.customerInfo.type == 1 ){
                  this.showPersonal = true;
              }
          }
      },
      fetchReceiveEmpNum(){
          this.ApiLists.waitReceiveEmpNum().then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  if( data ){
                      this.showYellow = true;
                      this.yellowNumber = data;
                  }else{
                      this.showYellow = false;
                      this.yellowNumber = 0;
                  }
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      normalItem(item){
          this.$router.push({
              name: 'contactsBlockDetail',
              query:item
          });
      },
      initSearch(){
          this.ApiLists.talentMailList().then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.contentArr = data || [];;
              }
          }).catch(err=>{
              console.log('err',err);
          })
          if( this.name ){
              let params = {
                  talentName:this.name
              };
              this.ApiLists.talentQueryMailList(params).then(res=>{
                  let { data,respCode } = res;
                  if( respCode === 0 ){
                      this.searchResArr = data || [];
                  }
              }).catch(err=>{
                  console.log('err',err);
              })
          }
      },
      runSearch(){
          this.searchResArr = [];
          if( this.name ){
              this.searchClicked = true;
              let params = {
                  talentName:this.name
              };
               this.ApiLists.talentQueryMailList(params).then(res=>{
                  let { data,respCode } = res;
                  if( respCode === 0 ){
                      this.searchResArr = data || [];
                  }
              }).catch(err=>{
                  console.log('err',err);
              })
          }else{
              this.searchClicked = false;
          }
      },
      popRecommand(){
          this.recomand1Visible = true;
          this.$nextTick(()=>{
              this.$refs.wait3Form.resetFields();
          });
          let params = {
              pn:0,
              ps:0,             
              customerId:this.getWebInfo.customerId,
              type:this.getWebInfo.customerInfo.type == 1 ? 2 : 1,
          };
          this.ApiLists.getPartnerList(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  if( data ){
                      this.optionsCopy6 = data.list || [];
                  }
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      bindPartner(){
          this.bind3Visible = true;
          this.ApiLists.getBindingCode().then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  if( data ){
                      this.bindCode = data;
                  }
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      popAdd(){
          this.bind1Visible = true;
          this.setOption2();
      },
  }
}
</script>
<style lang="scss" scoped>
    .contactsMixCon {
        padding: 40px;
        box-sizing: border-box;
        .editUpperCon {
            height: 300px;
            .subEditUpper {
                height: 280px;
                width: 460px;
                overflow-x: hidden;
                overflow-y: scroll;
            }
        }
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
            }
        }
        .spIconCon {
            display: flex;
            justify-content:flex-start;
            align-content: center;
            align-items: center;
        }
        .bind2ImgCon {
            text-align: center;
            .text {
                color: #909399;
                font-size: 14px;
            }
        }
        .setInputWidth {
            margin-right: 20px;
            width: 135px;
        }
        .setInput1Width {
            width: 300px;
        }
        .spFlexHere {
            width: 100%;
            margin-top: 20px;
            display: flex;
            justify-content:space-between;
            align-content: center;
            align-items: center;
            .spFlex1 {
                width: 70%;
            }
            .spFlexBtn1 {
                display: flex;
                justify-content:space-between;
                align-content: center;
                align-items: center;
                width: 180px;
            }
        }
        .lockItemInput {
            width: 480px;
        }
        .lock2ItemInput {
            width: 180px;
        }
        .firstHere1 {
            display: flex;
            justify-content:space-between;
            align-content: center;
            align-items: center;
        }
        .firstHere2 {
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .firstHere3 {
            margin-top: 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content:space-between;
            align-content: center;
            align-items: center;
        }
        .setInput3Width {
            margin-right: 10px;
            width: 135px;
            &:last-child {
                margin-right: 0;
            }
        }
        
        
        .waitTableCon {
        }
        .spFlexBtn2 {
            display: flex;
            justify-content: flex-end;
            align-content: center;
            align-items: center;
        }
        .type0Con {
            padding: 20px;
            box-sizing: border-box;
            background-color: #fff;
            margin-bottom: 20px;
            .type0First {
                display: flex;
                justify-content: flex-start;
                align-content: center;
                align-items: center;
                border-bottom: 1px solid #E4E7ED;
                padding-bottom: 20px;
                box-sizing: border-box;
            }
            .itemForHead {
                width: 56px;
                height: 56px;
                background-origin: border-box;
                background-repeat: no-repeat;
                background-size:cover;
                background-position: center;
                margin-right: 20px;
            }
            .type0DeatailCon {
                width: 100%;
                .type0PhoneCon {
                    display: flex;
                    justify-content:space-between;
                    align-content: center;
                    align-items: center;
                    margin-bottom: 16px;
                    .type0Block {
                        width:64px;
                        height:24px;
                        background:rgba(144,147,153,0.1);
                        border-radius:4px;
                        border:1px solid rgba(144,147,153,0.1);
                        color: #909399;
                        font-size: 12px;
                        text-align: center;
                        line-height: 24px;
                    }
                    .type0PhoneOuter {
                        color: #909399;
                        font-size: 20px;
                    }
                    .type0PartnerCon {
                        display: flex;
                        justify-content:flex-start;
                        align-content: center;
                        align-items: center;
                        .type0RealName {
                            font-size: 20px;
                            color: #303133;
                            line-height: 20px;
                            font-weight: 500;
                            margin-right: 20px;                            
                        }
                    }
                }
                .type0bindTime {
                    color: #606266;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 14px;
                }
            }
            .type0Sec {
                display: flex;
                justify-content: flex-end;
                align-content: center;
                align-items: center;
                padding-top: 20px;
            }
        }
        .type1Con {
            margin-bottom: 20px;
            padding: 20px;
            box-sizing: border-box;
            background-color: #fff;
            cursor: pointer;
            .type1Upper {
                border-bottom: 1px solid #E4E7ED;
                padding-bottom: 20px;
                box-sizing: border-box;
                .type1PhoneOuter {
                    color: #909399;
                    font-size: 20px;
                }
                .type1UpperFirst {
                    display: flex;
                    justify-content:space-between;
                    align-content: center;
                    align-items: center;
                    margin-bottom: 16px;
                    width: 100%;
                    .type1DeatailCon {
                        display: flex;
                        justify-content:flex-start;
                        align-content: center;
                        align-items: center;
                    }
                    .type1RealName {
                        font-size: 20px;
                        color: #303133;
                        line-height: 20px;
                        font-weight: 500;
                        margin-right: 20px;    
                    }
                    .type1Block {
                        width:64px;
                        height:24px;
                        background:rgba(144,147,153,0.1);
                        border-radius:4px;
                        border:1px solid rgba(144,147,153,0.1);
                        color: #909399;
                        font-size: 12px;
                        text-align: center;
                        line-height: 24px;
                        margin-right: 10px;
                    }
                    .ageBlock {
                        margin-right: 10px;
                        font-size: 12px;
                        text-align: center;
                        line-height: 24px;
                        .genderImg {
                            width: 12px;
                            height: 12px;
                            background-origin: border-box;
                            background-repeat: no-repeat;
                            background-size:cover;
                            background-position: center;
                            display: inline-block;
                            vertical-align:-2px;
                        }
                        .gender1 {
                            background-image: url(../../../assets/male.svg);
                        }
                        .gender2 {
                            background-image: url(../../../assets/female.svg);
                        }
                    }
                    .age1 {
                        width:63px;
                        height:24px;
                        background:rgba(65,131,255,0.1);
                        border-radius:4px;
                        border:1px solid rgba(64,158,255,0.1);
                        color: #409EFF;
                    }
                    .age2 {
                        width:63px;
                        height:24px;
                        background:rgba(245,108,108,0.1);
                        border-radius:4px;
                        border:1px solid rgba(245,108,108,0.1);
                        color: #EE4F46;
                    }
                    .settleBlock {
                        width:40px;
                        height:24px;
                        background:rgba(64,158,255,0.1);
                        border-radius:4px;
                        border:1px solid rgba(64,158,255,0.1);
                        color: #409EFF;
                        font-size: 12px;
                        text-align: center;
                        line-height: 24px;
                    }
                }
                .type1UpperSec {
                    display: flex;
                    justify-content: flex-start;
                    align-content: center;
                    align-items: center;
                    .type1SecLeft {
                        width: 400px;
                        display: flex;
                        justify-content: flex-start;
                        align-content: center;
                        align-items: center;
                        color: #606266;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 14px;
                    }
                    .type1SecRight {
                        display: flex;
                        justify-content: flex-start;
                        align-content: center;
                        align-items: center;
                        color: #606266;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 14px;
                    }
                }
            }
            .type1Bottom {
                display: flex;
                justify-content: flex-end;
                align-content: center;
                align-items: center;
                padding-top: 20px;
            }
        }
        .yellowInfo {
            text-align: center;
            line-height: 40px;
            height:40px;
            background:rgba(253,246,236,1);
            border-radius:4px;
            margin-top: 30px;
            margin-bottom: 30px;
            color: #E6A23C;
            font-size: 16px;
            .yellowSp {
                font-weight: 500;
            }
            .smallArea {
                cursor: pointer;
            }
        }
        .nothing {
            text-align: center;
            font-size: 14px;
            color: #909399;
        }
        .blueHere {
            color: #409EFF;
        }
        .firstLine {
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            .firstLeft {
                width: 480px;
            }
            .firstRight {
            }
        }
        .searchResCon {
            margin-top: 40px;
        }
        .flexCon {
            margin-top: 40px;
            display: flex;
            justify-content:flex-start;
            flex-wrap: wrap;
            align-content: center;
            align-items: center;
            .itemSelfCon {
                background-color: #fff;
                width:285px;
                height:128px;
                border-radius:8px;
                margin-right: 20px;
                margin-bottom: 20px;
                cursor: pointer;
                padding: 30px;
                box-sizing: border-box;
                &:hover {
                    box-shadow:0px 5px 20px 0px rgba(31,34,51,0.1);
                    .itemTextCon {
                        .itemText {
                            color: #409EFF;
                        }
                    }
                    .itemWithIcon{
                        .fakeIcon {
                            background-image: url(../../../assets/detail_blue.svg);
                        }
                        .itemCount {
                            color: #409EFF;
                        }
                    } 
                }
                .itemTextCon {
                    display: flex;
                    justify-content:flex-start;
                    align-content: center;
                    align-items: center;
                    .itemText {
                        color: #909399;
                        margin-right: 10px;
                    }
                }
                .itemWithIcon {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    align-items: center;
                    margin-top: 20px;
                    .itemCount {
                        color: #303133;
                        font-size: 32px;
                        line-height: 32px;
                    }
                    .fakeIcon {
                        width: 20px;
                        height: 20px;
                        background-image: url(../../../assets/detail_grey.svg);
                        background-origin: border-box;
                        background-repeat: no-repeat;
                        background-size:cover;
                        background-position: center;
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .contactsMixCon {
        .setRoot1Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 520px;
            }
        }
        .setRoot2Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 272px;
            }
        }
        .setRoot3Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 200px;
            }
        }
        .setRoot4Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 520px;
            }
        }
        .setRoot5Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 260px;
            }
        }
        .setRoot6Scoped {
            .el-dialog {
                .el-dialog__body {
                    padding-top: 10px;
                }
                border-radius: 10px;
                height: 370px;
            }
        }
        .setRoot7Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 320px;
            }
        }
        .setRoot8Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 430px;
            }
        }
    }  
</style>