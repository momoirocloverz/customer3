<template>
  <div class="accountMaPictureCon">
        <div class="leftPart">
            <div class="hugeTitle">LOGO上传</div>
            <el-upload class="upload-demo" action="//upload.qiniu.com/" :on-remove="handleRemove1" :before-upload="beforeAvatarUpload1" :limit="1" :on-exceed="handleExceed1" :on-success="handleAvatarScucess1" :file-list="fileList1" :data="upload_form1">
                <div class="imgBlock1" v-if="imageUrl1">
                    <img v-if="imageUrl1" :src="imageUrl1" class="avatar1">
                    <div class="changeIndex">
                        <i class="el-icon-edit"></i>
                        <span class="overWrite">编辑</span>
                    </div>
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">宽高比1:1，建议尺寸240*240px以上，<br/>支持格式：jpg、png，图片大小限2M以内</div>
            </el-upload>
        </div>
        <div class="rightPart">
            <div class="hugeTitle">背景图片上传<span class="rightDes">此图片将展示在企业版-企业中心、个人版-个人中心</span>
            </div>
            <el-upload class="upload-demo" action="//upload.qiniu.com/" :on-remove="handleRemove2" :before-upload="beforeAvatarUpload2" :limit="1" :on-exceed="handleExceed2" :on-success="handleAvatarScucess2" :file-list="fileList2" :data="upload_form2">
                <div class="imgBlock2" v-if="imageUrl2">
                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar2">
                    <div class="changeIndex">
                        <i class="el-icon-edit"></i>
                        <span class="overWrite">编辑</span>
                    </div>
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">建议尺寸750*320px，<br/>支持格式：jpg、png，图片大小限2M以内</div>
            </el-upload>
        </div>
      <el-dialog title="剪切图片"  :visible.sync="cropVisible" width="700px"
                   :close-on-click-modal="false" center :before-close="handleClose">
          <div>
              <div class="cropperCon">
                  <VueCropper v-if="cropVisible" :aspect-ratio="dynamicRatio" :viewMode="1" ref="cropper"  :src="imgSrc" @ready="ready" />
                </div>
              <div class="cropBtnCon">
                  <el-button size="small" type="primary"  @click="cropAction">裁切图片</el-button>
                </div>
                <div class="saveCropCon">
                    <el-button size="small" type="info" :disabled="!saveCropAble"  @click="saveCropToTarget">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'accountMaPicture',
  data() {
    return {
        imgSrc:'',
        upload_form2:{
            key:'',
            token:'',
        },
        fileList2:[],
        fileList1:[],
        upload_form1:{},
        imageUrl1:'',
        imageUrl2:'',
        dynamicRatio:1,
        cropVisible:false,
        cropImg:'',
        saveCropAble:false,
        clickSource:1,
        storePicData:{},
    }
  },
    computed:{
        ...mapGetters([
            'getWebInfo',
        ]),
    },
  mounted(){
      this.getToken();
      this.fetchPics();
  },
  methods: {
      getToken() {
          this.ApiLists.cowToken().then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.upload_form1 = {
                      key: data.fileName,
                      token: data.upToken,
                  };
                  this.upload_form2 = {
                      key: data.fileName,
                      token: data.upToken,
                  };
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      handleRemove1(){
          this.imageUrl1 = '';
          this.getToken();
          this.$forceUpdate();
      },
      beforeAvatarUpload1(file){
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG && !isPNG) {
              this.$message.error('上传logo只能是 JPG 或PNG格式!');
          }
          if (!isLt2M) {
              this.$message.error('上传logo大小不能超过 2MB!');
          }
          return isLt2M && (isPNG || isJPG);
      },
      handleExceed1(){
          this.$message.warning(`请删除当前文件再重新上传！`);
      },
      handleAvatarScucess1(res,file){
          const key = res.key;
          this.imageUrl1 = `http://${this.bucketHost}/${key}`;
          this.cropVisible = true;
          this.saveCropAble = false;
          this.clickSource = 1;
          this.dynamicRatio = 1;
          this.getToken()
          this.$nextTick(()=>{
              this.$refs.cropper.replace(this.imageUrl1);
          });
      },
      handleRemove2(){
          this.imageUrl2 = '';
          this.getToken();
          this.$forceUpdate();
      },
      beforeAvatarUpload2(file){
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG && !isPNG) {
              this.$message.error('上传背景图片只能是 JPG 或PNG格式!');
          }
          if (!isLt2M) {
              this.$message.error('上传背景图片大小不能超过 2MB!');
          }
          return isLt2M && (isPNG || isJPG);
      },
      handleExceed2(){
          this.$message.warning(`请删除当前文件再重新上传！`);
      },
      handleAvatarScucess2(res,file){
          const key = res.key;
          this.imageUrl2 = `http://${this.bucketHost}/${key}`;
          this.cropVisible = true;
          this.clickSource = 2;
          this.dynamicRatio = 75/32;
          this.saveCropAble = false;
          this.getToken()
          this.$nextTick(()=>{
              this.$refs.cropper.replace(this.imageUrl2);
          });
      },
      handleClose(){
          if( this.clickSource == 1 ){
              this.imageUrl1 = this.storePicData.logo;
          }
          if( this.clickSource == 2 ){
              this.imageUrl2 = this.storePicData.background;
          }
          this.fileList1 = [];
          this.fileList2 = [];
          this.cropVisible = false;
      },
      saveCropToTarget(){
          this.uploadAction();
      },
      cropAction(){
          this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
          this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
              const formData = new FormData();
              formData.append('file',blob);
              formData.append('key',this.upload_form1.key);
              formData.append('token',this.upload_form1.token);
              this.ApiLists.uploadQiniu(formData).then(res=>{
                  let { status,data } = res;
                  if( status == 200 ){
                      this.saveCropAble = true;
                      if(this.clickSource == 2){
                          this.imageUrl2 = `http://${this.bucketHost}/${data.key}`;
                      }
                      if(this.clickSource == 1){
                          this.imageUrl1 = `http://${this.bucketHost}/${data.key}`;
                      }
                  }
                  this.getToken();
              }).catch(err=>{
                  console.log('err',err);
              })
          })
      },
      ready(){},
      fetchPics(){
          let params = {
              id: this.getWebInfo.customerId,
          }
          this.ApiLists.businessCustomerDetail(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.imageUrl1 = data.logo;
                  this.imageUrl2 = data.background;
                  this.storePicData = {
                      logo:data.logo,
                      background:data.background,
                  }
              }else{
                  
              }
          }).catch(err=>{
              console.log('err',err);
          })
      },
      uploadAction(){
          let params = {
              customerId:this.getWebInfo.customerId,
          }
          switch(this.clickSource){
              case 1:
                  params.logo = this.imageUrl1;
                  this.ApiLists.setLogoAndBg(params).then(res=>{
                      let { data,respCode } = res;
                      if( respCode === 0 ){
                          this.fileList1 = [];
                          this.fetchPics();
                          this.cropVisible = false;
                      }else{

                      }
                  }).catch(err=>{
                      console.log('err',err);
                  })
                  break;
              case 2:
                  params.background = this.imageUrl2;
                  this.ApiLists.setLogoAndBg(params).then(res=>{
                      let { data,respCode } = res;
                      if( respCode === 0 ){
                          this.fileList2 = [];
                          this.fetchPics();
                          this.cropVisible = false;
                      }else{

                      }
                  }).catch(err=>{
                      console.log('err',err);
                  })
                  break;
          }
      },
  }
}
</script>
<style lang="scss" scoped>
    .accountMaPictureCon {
        padding: 40px;
        box-sizing: border-box;
        box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
        border-radius:8px;
        background-color: #fff;
        display:flex;
        justify-content: space-between;
        align-content:center;
        align-items: flex-start;
        .cropBtnCon {
            text-align: center;
            margin-bottom: 20px;
            margin-top: 20px;
        }
        .saveCropCon {
            text-align: center;
        }
        .leftPart {
            width: 240px;
            .changeIndex {
                background-color: rgba(0,0,0,0.5);
                opacity: 0;
                width: 240px;
                height: 240px;
                font-size: 20px;
                line-height: 240px;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .hugeTitle {
            color: #303133;
            font-size: 20px;
            line-height: 20px;
            margin-bottom: 20px;
        }
        .rightPart {
            width: 500px;
            .rightDes {
                color: #909399;
                font-size: 14px;
                margin-left: 10px;
            }
            .changeIndex {
                background-color: rgba(0,0,0,0.5);
                opacity: 0;
                width: 500px;
                height: 240px;
                font-size: 20px;
                line-height: 240px;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .imgBlock1:hover {
            .changeIndex {
                opacity: 1;
                z-index: 3;
            }
        }
        .imgBlock2:hover {
            .changeIndex {
                opacity: 1;
                z-index: 3;
            }
        }
        .overWrite {
            color: #fff;
        }
    }
</style>
<style lang="scss">
    .accountMaPictureCon {
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
        .leftPart {
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 240px;
                height: 240px;
                line-height: 240px;
                text-align: center;
            }
        }
        .rightPart {
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 500px;
                height: 240px;
                line-height: 240px;
                text-align: center;
            }
        }
        .upload-demo {
            text-align: center;
        }
        .imgBlock2 {
            width: 500px;
            height: 240px;
/*            padding-top: 55px;*/
            box-sizing: border-box;
        }
        .avatar2 {
            width: 500px;
            height: 240px;
            display: block;
        }
        .imgBlock1 {
            width: 240px;
            height: 240px;
            position: relative;
        }
        .avatar1 {
            width: 240px;
            height: 240px;
            display: block;
        }
        .el-upload__tip {
            text-align: left;
            margin-top: 15px;
            color: #909399;
            font-size: 12px;
        }
        .el-icon-edit {
            color: #fff !important;
        }
    }
</style>