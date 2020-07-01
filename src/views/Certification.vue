<template>
    <div class="CertificationCon">
        <div class="CertificationHeader">
            <div class="leftPart">
                <img src="../assets/logo.png">万才企业版
            </div>
            <div class="rightPart" @click="initJump">退出登录</div>
        </div>  
        <div class="centerCon">
            <div class="simple1 commonShadow" v-show="show2">
                <div class="commonHeadCon">
                    <div class="headLeft">个人商家实名认证</div>
                    <div class="headRight">联系客服：137 5719 4423</div>
                </div>
                <el-form ref="simple1Form" :label-position="labelPosition" :model="simple1Form" :rules="simple1Rules">
                    <div>
                        <el-form-item prop="idCard" label="身份证号">
                            <el-input v-model="simple1Form.idCard" placeholder="请输入身份证号" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item prop="realName" label="真实姓名">
                            <el-input v-model="simple1Form.realName" placeholder="请输入真实姓名" type="text" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="simple1Form.mobile" placeholder="请输入手机号" type="text" autocomplete="new-password" disabled></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-button type="primary" size="small" class="simpleBtn1" :disabled="empty1" @click="submit1Now('simple1Form')">提交认证</el-button>
                    </div>
                </el-form>
            </div>
            <div class="simple2 commonShadow" v-show="show3">
                <div class="commonHeadCon">
                    <div class="headLeft">企业商家实名认证</div>
                    <div class="headRight">联系客服：137 5719 4423</div>
                </div>
                <div class="step1Con">
                    <el-steps space="300%" :active="1" finish-status="success" align-center>
                      <el-step title="企业信息"></el-step>
                      <el-step title="注册人信息"></el-step>
                    </el-steps>
                </div>
                <el-form ref="simple2Form" :label-position="labelPosition" :model="simple2Form" :rules="simple2Rules">
                    <div>
                        <el-form-item prop="idCard" label="身份证号">
                            <el-input v-model="simple2Form.idCard" placeholder="请输入身份证号" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item prop="realName" label="真实姓名">
                            <el-input v-model="simple2Form.realName" placeholder="请输入真实姓名" type="text" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item  label="手机号">
                            <el-input v-model="simple2Form.mobile" placeholder="请输入手机号" type="text" autocomplete="new-password" disabled></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-button type="primary" size="small" class="simpleBtn2" :disabled="empty2" @click="submit2Now('simple2Form')">提交认证</el-button>
                    </div>
                </el-form>                
            </div>
            <div class="complicated1 commonShadow" v-show="show1">
                <div class="commonHeadCon">
                    <div class="headLeft">企业商家实名认证</div>
                    <div class="headRight">联系客服：137 5719 4423</div>
                </div>
                <div class="step2Con">
                    <el-steps space="300%" :active="0" finish-status="success" align-center>
                      <el-step title="企业信息"></el-step>
                      <el-step title="注册人信息"></el-step>
                    </el-steps>
                </div>
                <el-form ref="complicated1Form" :label-position="labelPosition" :model="complicated1Form" :rules="complicated1Rules">
                    <div>
                        <el-form-item prop="fullName" label="公司全称">
                            <el-input v-model="complicated1Form.fullName" placeholder="请输入公司全称" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item prop="shortName" label="公司简称">
                            <el-input v-model="complicated1Form.shortName" placeholder="请输入公司简称（限制六个字）" type="text" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item prop="creditCode" label="统一社会信用代码">
                            <el-input v-model="complicated1Form.creditCode" placeholder="请输入统一社会信用代码" type="text" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item prop="legalPerson" label="公司法人">
                            <el-input v-model="complicated1Form.legalPerson" placeholder="请输入公司法人" type="text" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item prop="industry" label="所在行业">
                            <el-select size="small" class="fillWidth"  v-model.trim="complicated1Form.industry" placeholder="请选择所在行业">
                                      <el-option v-for="(item,index) in industryArr" :key="item.dicVal" :label="item.dicName" :value="item.dicVal"></el-option>
                                  </el-select> 
                            
                        </el-form-item>
                        <el-form-item prop="provience" label="公司所在地">
                            <el-cascader class="fillWidth" v-model="complicated1Form.provience" :options="addressArr" @expand-change="expandMultipleChange" @change="handleMultipleChange"></el-cascader>                             
                        </el-form-item>
                        <el-form-item prop="address" label="公司详细地址">
                            <el-input v-model="complicated1Form.address" placeholder="请输入公司详细地址" type="text" autocomplete="new-password"></el-input>
                        </el-form-item>
                        <el-form-item prop="businessLicense" label="营业执照">
                              <el-upload  class="avatar-uploader" action="//upload.qiniu.com/" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :limit="1" :on-exceed="handleExceed" :on-success="handleAvatarSuccess" :file-list="fileList" :data="upload_form">
                                  <img v-if="complicated1Form.businessLicense" :src="complicated1Form.businessLicense" class="avatar">
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                  <span slot="tip" class="el-upload__tip ml20">只支持jpg、png格式</span>
                                </el-upload>
                          </el-form-item> 
                    </div>
                    <div>
                        <el-button type="primary" size="small" class="complicatedBtn1" :disabled="empty3" @click="submit3Now('complicated1Form')">下一步</el-button>
                    </div>
                </el-form>  
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'Certification',
        data(){
             return {
                 fileList: [],
                 upload_form: {},
                 addressArr:[],
                 industryArr:[],
                 show1:false,
                 show2:false,
                 show3:false,
                 labelPosition:'top',
                 simple1Form:{
                     idCard:'',
                     realName:'',
                     mobile:'',
                 },
                 simple1Rules:{
                     idCard:[
                         { required: true, message: '请输入身份证号', trigger: 'blur' },
                     ],
                     realName:[
                         { required: true, message: '请输入真实姓名', trigger: 'blur' },
                     ],
                 },
                 simple2Form:{
                     idCard:'',
                     realName:'',
                     mobile:'',
                 },
                 simple2Rules:{
                     idCard:[
                         { required: true, message: '请输入身份证号', trigger: 'blur' },
                     ],
                     realName:[
                         { required: true, message: '请输入真实姓名', trigger: 'blur' },
                     ],
                 },
                 watermark:'',
                 bucketHost: 'http://img.10000rc.com/',
                 complicated1Form:{
                    fullName:'',
                    shortName:'',
                    creditCode:'',
                    legalPerson:'',
                    industry:'',
                    provience:'',
                    address:'',
                    businessLicense:'',
                 },
                 complicated1Rules:{
                    fullName:[
                        { required: true, message: '请输入公司全称', trigger: 'blur' },
                    ],
                    shortName:[
                        { required: true, message: '请输入公司简称', trigger: 'blur' },
                    ],
                    creditCode:[
                        { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
                    ],
                    legalPerson:[
                        { required: true, message: '请输入公司法人', trigger: 'blur' },
                    ],
                    industry:[
                        { required: true, message: '请选择所在行业', trigger: 'blur' },
                    ],
                    provience:[
                        { required: true, message: '请选择公司所在地', trigger: 'blur' },
                    ],
                    address:[
                        { required: true, message: '请输入公司详细地址', trigger: 'blur' },
                    ],
                    businessLicense:[
                        { required: true, message: '请上传营业执照', trigger: 'blur' },
                    ],
                 },
                 tempIdArr:[],
                 temAddArr:[],
                 tempTrackBridge:[],
             }
        },
        computed:{
            ...mapGetters([
                'getWebInfo',
            ]),
            empty1(){
                if(this.simple1Form.idCard && this.simple1Form.realName && this.simple1Form.mobile){
                    return false
                }else {
                    return true
                }
            },
            empty2(){
                if(this.simple2Form.idCard && this.simple2Form.realName && this.simple2Form.mobile){
                    return false
                }else {
                    return true
                }
            },
            empty3(){
                if(this.complicated1Form.fullName && this.complicated1Form.shortName && this.complicated1Form.creditCode && this.complicated1Form.legalPerson && this.complicated1Form.industry && this.complicated1Form.provience && this.complicated1Form.address && this.complicated1Form.businessLicense){
                    return false
                }else {
                    return true
                }
            },
        },
        mounted(){
            this.analyse();
            this.getToken()
            this.getWatermark();
            this.getProvience();
            this.getIndustryArr();
        },
        methods:{
            getIndustryArr(){
                let params = {
                    pId:28231
                }    
                this.ApiLists.getSonNodeByParentId(params).then(res=>{
                    let { data,respCode } = res;
                    if( respCode === 0 ){
                        this.industryArr = data
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            expandMultipleChange(value){
                let length = value.length;
                if( length && length == 1 ){
                    let params2 = {
                        code:'city',
                        value:value[0],
                    };
                    this.ApiLists.getDicList(params2).then(res=>{
                        let { data,respCode } = res;
                        if( respCode === 0 ){
                            let final = data.map(ele=>{
                                return {
                                    value:ele.dicVal,
                                    label:ele.dicName,
                                    children:[],
                                }
                            })
                            let index = this.addressArr.findIndex(ele=>{
                                return ele.value == value[0];
                            })
                            this.temAddArr = [ this.addressArr[index].label ];
                            this.addressArr[index].children = final;
                        }
                    }).catch(err=>{
                        console.log('err',err);
                    }) 
                }
                if( length && length == 2 ){
                    let params2 = {
                        code:'city',
                        value:value[1],
                    };
                    this.ApiLists.getDicList(params2).then(res=>{
                        let { data,respCode } = res;
                        if( respCode === 0 ){
                            let final = data.map(ele=>{
                                return {
                                    value:ele.dicVal,
                                    label:ele.dicName
                                }
                            })
                            let item1 = this.addressArr.find(ele=>{
                                return ele.value == value[0];
                            })
                            let index2 = item1.children.findIndex(ele=>{
                                return ele.value == value[1];
                            })
                            let bridge = Object.assign([],this.temAddArr);
                            let [track1,track2,track3] = bridge;
                            this.temAddArr = [track1,item1.children[index2].label];    
                            item1.children[index2].children = final;
                            this.tempTrackBridge = final;
                        }
                    }).catch(err=>{
                        console.log('err',err);
                    }) 
                }                   
            },
            handleMultipleChange(value){
                this.tempIdArr = value;
                let target = this.tempTrackBridge.find(ele=>{
                    return ele.value ==  value[2];
                })
                let bridge = Object.assign([],this.temAddArr);
                let [track1,track2,track3] = bridge;
                this.temAddArr= [ track1,track2,target.label];
            },
            getProvience(){
                let params = {
                    code:'city',
                    value:'0',
                };
                this.ApiLists.getDicList(params).then(res=>{
                    let { data,respCode } = res;
                    if( respCode === 0 ){
                        let final = data.map(ele=>{
                            return {
                                value:ele.dicVal,
                                label:ele.dicName,
                                children:[],
                            }
                        })
                        this.addressArr = final;
                        this.tempIdArr = [];
                        this.temAddArr = [];
                    }
                }).catch(err=>{
                    console.log('err',err);
                })  
            },
            analyse(){
                let track = this.$route.query.show ;
                this[track] = true;
                this.simple1Form.mobile = this.getWebInfo.mobile;
                this.simple2Form.mobile = this.getWebInfo.mobile;
            },
            getWatermark() {
               let params = {
                 paramName: 'watermark_param',
               }
               this.ApiLists.waterMark(params).then((res) => {
                   this.watermark = res.data
                 }).catch((err) => {
                   console.log('err', err)
                 })
             },
            getToken(){
                this.ApiLists.cowToken().then(res => {
                      let {data, respCode} = res;
                      if (respCode === 0) {
                          this.upload_form = {
                              key: data.fileName,
                              token: data.upToken,
                          };
                      }
                  }).catch(err => {
                      console.log('err', err);
                  })
            },
            handleRemove(file, fileList) {
                this.complicated1Form.businessLicense = "";
                this.fileList = [];
                this.getToken()
                this.$forceUpdate();
                this.$refs.complicated1Form.validateField('businessLicense');
            },
            beforeAvatarUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片只能是 JPG 或PNG格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isLt2M && (isPNG || isJPG);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`请删除当前文件再重新上传！`)
            },
            handleAvatarSuccess(res, file) {
              const key = res.key
              const bucketHost = this.bucketHost
              const watermark = this.watermark
              this.complicated1Form.businessLicense = `${bucketHost}${key}${watermark}`
              this.$refs.complicated1Form.validateField('businessLicense')
              this.getToken()
            },
            action3(){
                  let params = {
                      name:this.complicated1Form.fullName,
                      shortName:this.complicated1Form.shortName,
                      creditCode:this.complicated1Form.creditCode,
                      legalPerson:this.complicated1Form.legalPerson,
                      industry:this.complicated1Form.industry,
                      address:this.complicated1Form.address,
                      businessLicense:this.complicated1Form.businessLicense,
                    };
                    let [province,city,region] = this.temAddArr;
                    params.province = province;
                    params.city = city;
                    params.region = region;
                    this.ApiLists.enterpriseCustomerCheck(params).then(res=>{
                        let {data, respCode} = res;
                        if (respCode === 0) {
                            this.show1 = false;
                            let newObj = Object.assign({},params);
                            sessionStorage.setItem('forCompany',JSON.stringify(newObj));
                            this.show3 = true;
                        }
                    }).catch(err=>{
                        console.log('err',err);
                    })
                    
            },
            submit3Now(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.action3();
                    }else{
                        
                    }
                })
            },
                action2(){
                    let params = JSON.parse(  sessionStorage.getItem('forCompany') );
                    params.realName = this.simple2Form.realName ;
                    params.idCard = this.simple2Form.idCard;
                    this.ApiLists.enterpriseCustomerConfirm(params).then(res=>{
                        let {data, respCode} = res;
                        if (respCode === 0) {
                            this.$message({
                                message: '认证成功',
                                type: 'success'
                            });
                            this.getUseInfo();
                        }
                    }).catch(err=>{
                        console.log('err',err);
                    })
                },
            submit2Now(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.action2();
                    }else{
                        
                    }
                })
            },
                getUseInfo(){
                this.ApiLists.getBaseInfo().then(res=>{
                    if(res.respCode === 0){
                        this.$store.commit('setWebInfo',res.data)
                        if( res.data.isAuthenticate != null   ){
                            if( res.data.isAuthenticate ){
                                this.$router.push({
                                    path: '/main',
                                });
                            }else{
                                this.$message.error('认证状态没有发生改变');
                            }
                        }
                    }
                })
            },
                action1(){
                    let params = {
                        realName:this.simple1Form.realName ,
                        idCard:this.simple1Form.idCard,
                    };
                    this.ApiLists.personalCustomerConfirm(params).then(res=>{
                        let {data, respCode} = res;
                        if (respCode === 0) {
                            this.$message({
                                message: '认证成功',
                                type: 'success'
                            });
                            this.getUseInfo();
                        }
                    }).catch(err=>{
                        console.log('err',err);
                    })
                },
            submit1Now(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.action1();
                    }else{
                    }
                })
            },
            initJump(){
                this.$router.push({
                    name: 'login',
                });
            },
        },
    }
</script>
<style lang="scss" scoped>
    .CertificationCon {
        position: relative;
        min-height: 100vh;
        padding-bottom: 40px;
        box-sizing: border-box;
        background-image: url(../assets/loginBg.jpg);
        background-origin: border-box;
        background-repeat: no-repeat;
        background-size:cover;
        background-position: center;
        .fillWidth {
            width: 100%;
        }
        .CertificationHeader {
            display: flex;
            justify-content:space-between;
            align-items: center;
            align-content: center;
            padding-top: 20px;
            padding-bottom: 20px;
            .leftPart {
                margin-left: 40px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                align-content: center;
                font-size: 20px;
                color: #303133;
                img{
                    display: flex;
                    width: 40px;
                    height: 40px;
                    margin-right: 16px;
                }
            }
            .rightPart {
                margin-right: 40px;
                color: #409EFF;
                font-size: 14px;
                height: 40px;
                line-height: 40px;
                cursor: pointer;
            }
        }
        .centerCon {
            .commonShadow {
                width:520px;
                background-color: #fff;
                box-shadow:0px 10px 40px 0px rgba(31,34,51,0.1);
                border-radius:20px;
                margin: 0 auto;
                box-sizing: border-box;
                padding-left: 60px;
                padding-right: 60px;
                padding-top: 40px;
            }
            .commonHeadCon {
                display: flex;
                justify-content:space-between;
                align-items: center;
                align-content: center;
                margin-bottom: 35px;
                .headLeft {
                    color: #303133;
                    font-size: 24px;
                    font-weight: 500;
                    line-height: 24px;
                }
                .headRight {
                    color: #909399;
                    font-size: 14px;
                }
            }
            .simple1 {
                height:496px;
                margin-top: 72px;
                .simpleBtn1 {
                    width: 100%;
                    margin-top: 10px;
                }
            }
            .simple2 {
                height:586px;
                margin-top: 27px;
                .simpleBtn2 {
                    width: 100%;
                    margin-top: 10px;
                }
                .step1Con {
                    margin-bottom: 20px;
                }
            }
            .complicated1 {
                height:1256px;
                .complicatedBtn1 {
                    width: 100%;
                }
                .step2Con {
                    margin-bottom: 20px;
                }
            }
        }
    }
</style>
<style lang="scss">
    .CertificationCon {
        .el-form--label-top .el-form-item__label{
            line-height: 34px;
            padding: 0;
            color: #909399;
            font-size: 14px;
            font-weight: 400;
        }
        .el-input__prefix {
            left: 0px;
        }
        .el-input__icon {
            text-align: left;
            color: #606266;
        }
        .el-input--prefix .el-input__inner  {
            padding-left: 20px;
        }
        .el-input__inner {
            border-width: 0;
            border-radius: 0;
            box-sizing: border-box;
            padding-left:0;
            text-indent: 10px;
            border-bottom-color: #DCDFE6;
            border-bottom-width: 1px;
            &:focus {
                border-bottom-color: #303133;
                border-bottom-width: 1px;
            }
        }
        .el-form-item.is-error .el-input__inner {
            border-bottom-width: 1px;
        }
        .el-form-item {
            margin-bottom: 30px;
        }
        .el-cascader .el-input .el-input__inner:focus, .el-cascader .el-input.is-focus .el-input__inner {
            border-color: #303133;
        }
        .simple1 .el-form-item__label:before {
            content: '' !important;
        }
        .simple2 .el-form-item__label:before {
            content: '' !important;
        }
        .complicated1 .el-form-item__label:before {
            content: '' !important;
        }
        .el-input.is-disabled .el-input__inner {
            background-color: #fff;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
    }
</style>