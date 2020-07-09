<template>
  <div class="contactsBlockCon" v-loading="loading">
      <div class="breadCon">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item @click.native="clickHere">通讯录</el-breadcrumb-item>
              <el-breadcrumb-item>{{$route.query.attributeName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="searchCon" v-if="$route.query.attributeId">
            <div class="firstSearch">
                <div class="firstLeft">
                    <el-select v-model="gender" placeholder="性别" class="setInputWidth" @change="commonFetch">
                        <el-option v-for="(item,index) in options1" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="skill" placeholder="标签" class="setInputWidth" @change="commonFetch">
                        <el-option v-for="(item,index) in options2" :key="item.skillValue"  :label="item.skillName"  :value="item.skillValue"></el-option>
                    </el-select>
                    <el-select v-model="settlementType" placeholder="结算周期" class="setInputWidth" @change="commonFetch">
                        <el-option v-for="(item,index) in options3" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="firstRight" @keyup.enter="commonFetch">
                    <el-input v-model.trim="name" size="small" class="lockItemInput" placeholder="请输入姓名进行搜索" maxLength="30" clearable><el-button slot="append" icon="el-icon-search" @click="commonFetch"></el-button></el-input>
                </div>
            </div>
            <div class="secondSearch">
                <div>
                    <el-select v-model="firstAge" placeholder="最小年龄" class="setInputWidth" @change="ageFirstChange(firstAge)">
                        <el-option v-for="(item,index) in options4" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                    <span class="chinese">至</span> 
                    <el-select v-model="secAge" placeholder="最大年龄" class="ml20 setInputWidth" @change="ageSecChange(secAge)">
                        <el-option v-for="(item,index) in options5" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="listCon">
            <div v-if="$route.query.notPartner == 1">
                <template v-for="(item,index) in resultArr">
                    <div class="resItemCon">
                        <div>    
                            <div class="type1Con" @click.stop="jumpToDetail(item)">
                                <div class="type1Upper">
                                    <div class="type1UpperFirst">
                                        <div class="type1DeatailCon">
                                            <div class="type1RealName">{{item.realNameAlias}}</div>
                                            <Gender :item="item" class="ageBlock" />
                                            
                                            <div class="type1Block" v-if="getWebInfo.customerInfo.type == 2">{{item.attributeName}}</div>
                                            <div class="settleBlock" v-if="getWebInfo.customerInfo.type == 2">{{item.settlementTypeName}}</div>
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
                                            <el-button type="danger" size="mini" @click="unbindAction(item)" >确定</el-button>
                                        </div>
                                        <el-button type="info" size="small"  slot="reference">解绑</el-button>
                                    </el-popover> 
                                    <el-button class="ml20" type="info" size="small" @click.stop="editCurrentItem(item)"  slot="reference">修改</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="nothing" v-if="!resultArr.length">暂无</div>
            </div>
            <div v-else>
                <template v-for="(item,index) in resultSpArr">
                    <div class="resItemCon">
                        <div >
                            <div class="type0Con">
                                <div class="type0First">
                                    <div class="itemForHead" :style=" 'backgroundImage: url('+ item.avatar +')' "></div>
                                    <div class="type0DeatailCon">
                                        <div class="type0PhoneCon">
                                            <div class="type0PartnerCon">
                                                <div class="type0RealName">{{item.customerName}}</div>
                                                <div class="type0Block">合作伙伴</div>
                                            </div>
                                            <div class="type0PhoneOuter" v-if="getWebInfo.customerInfo.type == 2"><i class="el-icon-phone mr10"></i>{{item.mobile}}</div>
                                        </div>
                                        <div class="type0bindTime">
                                            <span class="mr20">绑定时间</span>
                                            <span>{{item.createdAt | stableDatefilter3}} </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="type0Sec" v-if="getWebInfo.customerInfo.type == 2">
                                    <el-popover placement="left"  width="100" trigger="hover">
                                        <div style="margin-top:10px;text-align:center">确定删除“{{item.customerName}}”?</div>
                                        <div style="margin-top:10px;text-align:center">
                                            <el-button type="danger" size="mini" @click="delPartner(item)" >确定</el-button>
                                        </div>
                                        <el-button size="small" type="danger" plain @click=""  slot="reference">删除</el-button>
                                    </el-popover>                                  
                                </div>
                            </div>                        
                        </div>
                    </div>
                </template>
                <div class="nothing" v-if="!resultSpArr.length">您暂无合作伙伴</div>                
            </div>
        </div>
        <div class="pagCon" v-if="total">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="current"
              :page-sizes="[20, 200, 300, 400]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div>
        <div class="pagCon" v-if="totalSp">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="current"
              :page-sizes="[20, 200, 300, 400]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalSp">
            </el-pagination>
        </div>


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
      <el-dialog title="修改"  class="setRoot8CopyScoped setMiddleDialog" :visible.sync="editCopyVisible"  width="480px" :close-on-click-modal="false" border>
        <div class="editUpperConCopy">
        <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="140px">
            <div class="subEditUpper">
            <el-form-item label="姓名">
                <div>{{editForm.name}}</div>
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
  name: 'contactsBlock',
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
        editCopyVisible:false,
        loading:true,
        props: { 
            multiple: true
        },
        optionsCopy8:[],
        editVisible:false,
        totalSp:0,
        total:0,
        name:'',
        current:1,
        pageSize:20,
        gender:'',
        options1:[
            { label:'性别',value:'' },
            { label:'男',value:1 },
            { label:'女',value:2 }
        ],
        skill:'',
        options2:[],
        settlementType:'',
        options3:[
            { label:'结算周期',value:'' },
            { label:'日结',value:1 },
            { label:'月结',value:2 },
            { label:'周结',value:4 },
        ],
        firstAge:'',
        options4:[],
        secAge:'',
        options5:[],
        resultArr:[],
        resultSpArr:[],
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
    }
  },
    computed:{
        ...mapGetters([
            'getWebInfo',
        ]),
    },
    filters:{
        customerFilter(value){
            if( value ){
                let arr1 = value.map(ele=>{
                    return ele.skillName;
                })
                let str = arr1.join('/')
                return str;
            }
        },
    },
  mounted(){
      this.initFetch();
      this.initOptions4();
      this.initOptions2();
  },
  methods: {
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
          if(this.getWebInfo.customerInfo.type  == 2){
              this.ApiLists.talentUpdateAttr(params).then(res=>{
                  let { data,respCode } = res;
                  if( respCode === 0 ){
                      this.$message({
                          message: '修改成功',
                          type: 'success'
                      });
                      this.editVisible = false;
                      this.initFetch();
                  }
              }).catch(err=>{
                  console.log('err',err);
              })
          }
          if(this.getWebInfo.customerInfo.type  == 1){
              this.ApiLists.talentUpdateSkill(params).then(res=>{
                  let { data,respCode } = res;
                  if( respCode === 0 ){
                      this.$message({
                          message: '修改成功',
                          type: 'success'
                      });
                      this.editCopyVisible = false;
                      this.initFetch();
                  }
              }).catch(err=>{
                  console.log('err',err);
              })
          } 
      },
      submitEditForm(formName){
          this.$refs[formName].validate(valid => {
              if (valid) {
                  this.submitEditAction();
              }else{
                  
              }
          })
      },
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
      editCurrentItem(item){
          clearTimeout(window.mixContimer2);
          if( this.getWebInfo.customerInfo.type == 1 ){
              this.editCopyVisible = true;
          }
          if( this.getWebInfo.customerInfo.type == 2 ){
              this.editVisible = true;
          }
          this.setOption2();
          this.editForm.bindId = item.bindId;
          this.editForm.talentId = item.talentId;
          this.editForm.name = item.realNameAlias;
          this.editForm.settlementType = item.settlementType;
          this.editForm.attributeId = item.attributeId;
          this.getIndustryArr();
          window.mixContimer2 = setTimeout(()=>{
              let temp = [];
              item.empCustomerVOS && item.empCustomerVOS.forEach(ele=>{
                  temp.push([ele.parentSkillVlaue,ele.skillValue])
              })
              this.$nextTick(()=>{
                  this.editForm.skill  =  temp;
              });
          },600);   
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
      jumpToDetail(item){
          const { href } = this.$router.resolve({
              name: 'contactsBlankDetail',
              query:{
                  talentId:item.talentId,
                  name:this.$route.query.attributeName
              }
          });
          window.open(href);
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
                 this.commonFetch();
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      clickHere(){
          this.$store.commit('changeMenuActiveIndex', '3')
          this.$router.push({
              path: '/main/contacts',
          })
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
                 this.commonFetch();
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      initOptions2(){
          this.ApiLists.fetchTalentSkills().then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  if( data ){
                      let bridge = data || [];
                      this.options2 = [{ skillName: "标签",skillValue: "" },...bridge];
                  }
              }
          }).catch(err=>{
              console.log('err',err);
          })
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
      commonFetch(){
          this.current = 1;
          this.initFetch();
      },
      ageSecChange(age){
          this.current = 1;
          this.initFetch();
      },
      normalFetch(){
          let params = {
              pageNum:this.current,
              pageSize:this.pageSize,
              attributeId:this.$route.query.attributeId,
              firstAge:this.firstAge,
              secAge:this.secAge,
              sex:this.gender,
              settlementType:this.settlementType,
              skill:this.skill,
              talentName:this.name
          };
          this.loading = true;
          this.ApiLists.fetchContactsTalents(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  if( data ){
                      this.resultArr = data.list || [];
                      this.total = data.total;
                  }
              }
          }).catch(err=>{
              console.log('err',err);
          }).finally(() => {
              this.loading = false
          })
      },
      partnerFetch(){
          let params = {
              pn:this.current,
              ps:this.pageSize,             
              customerId:this.getWebInfo.customerId,
              type:this.getWebInfo.customerInfo.type == 1 ? 2 : 1,
          };
          this.loading = true;
          this.ApiLists.getPartnerList(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  if( data ){
                      this.resultSpArr = data.list || [];
                      this.totalSp = data.total;
                  }
              }
          }).catch(err=>{
              console.log('err',err);
          }).finally(() => {
              this.loading = false
          })
      },
      initFetch(){
          if( this.$route.query.notPartner == '1' ){
              this.normalFetch();
          }else{
              this.partnerFetch();
          }
      },
      handleSizeChange(val){
          this.current = 1;
          this.pageSize = val;
          this.initFetch();
      },
      handleCurrentChange(val){
          this.current = val;
          this.initFetch();
      },
  }
}
</script>
<style lang="scss" scoped>
    .contactsBlockCon {
        padding: 30px 40px;
        box-sizing: border-box;
        height: 100%;
        min-height: calc(100vh - 80px);
        .editUpperCon {
            height: 300px;
            .subEditUpper {
                height: 280px;
                width: 460px;
                overflow-x: hidden;
                overflow-y: scroll;
            }
        }
        .spFlexBtn2 {
            display: flex;
            justify-content: flex-end;
            align-content: center;
            align-items: center;
        }
        .setInput1Width {
            width: 300px;
        }
        .breadCon {
            margin-bottom: 30px;
        }
        .pagCon {
            display: flex;
            justify-content: center;
        }
        .nothing {
            text-align: center;
            font-size: 14px;
            color: #909399;
            margin-top: 40px;
            margin-bottom: 40px;
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
                        box-sizing: border-box;
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
                border-top: 1px solid #E4E7ED;
                box-sizing: border-box;
                margin-top: 20px;
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
                        box-sizing: border-box;
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
                    }
                    .settleBlock {
                        box-sizing: border-box;
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
        .setInputWidth {
            margin-right: 20px;
            width: 135px;
        }
        .searchCon {
            margin-bottom: 40px;
            .lockItemInput {
                width: 220px;
            }
            .firstSearch {
                display: flex;
                justify-content: space-between;
                align-content: center;
                align-items: center;
                margin-bottom: 20px;
            }
            .secondSearch {
                .chinese {
                    color: #303133;
                    font-size: 14px;
                }
            }
        }
        .listCon {
            
        }
    }
</style>
<style lang="scss">
    .contactsBlockCon { 
        .setRoot8Scoped {
            .el-dialog {
                border-radius: 10px;
                height: 430px;
            }
        }
        .setRoot8CopyScoped {
            .el-dialog {
                border-radius: 10px;
                height: 280px;
            }
        }
    }     
</style>