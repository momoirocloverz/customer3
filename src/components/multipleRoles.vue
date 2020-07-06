<template>
  <div class="multipleRolesCon">
      <div class="simple3 commonShadow">
          <div class="simpleTitle">
              <div class="bolderHere">请选择角色</div>
              <i class="el-icon-close shutIcon" @click="shutCurrent"></i>
            </div>
          <div class="roleScrollCon">
              <template v-for="(item,index) in rolesList">
                  <div class="roleItemCon" :class="[clickTrackId ==item.customerId ? `roleBreak${item.cusType}` :'' , `roleHover${item.cusType}`]" @click="selectItem(item)">
                      <div class="leftPart">
                          <div class="mb10 BlackHere">
                            <div  v-if="item.cusType == 2">{{item.cusShortName}}（{{item.roleName}}）</div>
                            <div v-else>{{item.realName}}</div>
                        </div>
                      <div>
                          <CompanyLogo v-if="item.cusType == 2"></CompanyLogo>
                          <PersonalLogo v-else></PersonalLogo>
                        </div>
                        </div>
                      <div class="rightPart">
                          <div class="iconActive" :class=" clickTrackId ==item.customerId ? `iconActive${item.cusType}` :'' "></div>
                        </div>
                    </div>
                </template>
            </div>
        <div>
            <el-button type="primary" size="small" class="simpleBtn3" :disabled="empty4" @click="submit4Now">进入</el-button>
        </div>
    </div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'multipleRoles',
    props:{
        rolesList:Array,
        closeAction:Function,
    },
    data() {
        return {
            empty4:false,
            clickTrackId:'',
            itemBridge:{},
        }
    },
    computed:{
        ...mapGetters([
            'getWebInfo',
        ]),
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.clickTrackId = this.getWebInfo.customerId; 
            if( this.clickTrackId ){
                this.empty4 = false;
            }else{
                this.empty4 = true;
            }
        },
        shutCurrent(){
            this.$emit('closeAction');
        },
        submit4Now(){
            if( this.clickTrackId == this.getWebInfo.customerId ){
                this.shutCurrent();
            }else{
                this.special2Step(this.itemBridge.loginName);
            }
        },
        selectItem(item){
            this.clickTrackId = item.customerId;
            this.itemBridge = item;
        },
        special2Step(name){
            let params1 = {
                loginName:name,
            };
            this.ApiLists.loginNintendoSwitch(params1).then(res=>{
                let { respCode } = res;
                if( respCode == 0 ){
                    this.getUseInfo();
                }   
            }).catch(err=>{
                console.log('err',err);
            })
        },  
        getUseInfo(){
            this.ApiLists.getBaseInfo().then(res=>{
                if(res.respCode === 0){
                    this.$store.commit('setWebInfo',res.data)
                    this.shutCurrent();
                    if( res.data.isAuthenticate != null   ){
                        if( res.data.isAuthenticate ){
                            this.$router.replace({
                                path: '/main',
                            }).catch(err=>{
                                console.log(err);
                            });
                            this.$store.commit('changeMenuActiveIndex', '1')
                            this.$forceUpdate();
                        }
                    }
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    .multipleRolesCon {
        .iconActive {
            height: 20px;
            width: 20px;
            background-origin: border-box;
            background-repeat: no-repeat;
            background-size:cover;
            background-position: center;
            background-image: url(../assets/detail_grey.svg);
        }
        .iconActive2 {
            background-image: url(../assets/detail_blue.svg);
        }
        .iconActive1 {
            background-image: url(../assets/detail_orange.svg);
        }
        .roleBreak2 {
            background:rgba(64,158,255,0.1);
            border-radius:8px;
            color: #409EFF;
        }
        .roleHover2 {
            &:hover {
                background:rgba(64,158,255,0.1);
                border-radius:8px;
                color: #409EFF;
            }
        }
        .roleHover1 {
            &:hover {
                background:rgba(230,162,60,0.1);
                border-radius:8px;
                color: #E6A23C;
            }
        }
        .roleBreak1 {
            background:rgba(230,162,60,0.1);
            border-radius:8px;
            color: #E6A23C;
        }
        .BlackHere {
            color: #303133;
            font-size: 16px;
            line-height: 16px;
        }
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
        .simple3 {
            height:586px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto !important;
            .simpleTitle {
                .bolderHere {
                    color: #303133;
                    font-size: 24px;
                    font-weight: 500;
                }
                .shutIcon {
                    color: #909399;
                    cursor: pointer;
                    &:hover {
                        color: #409EFF;
                    }
                }
                display: flex;
                justify-content: space-between;
                align-content: center;
                align-items: center;
                margin-bottom: 40px;
            }
            .simpleBtn3 {
                width: 100%;
                margin-top: 40px;
            }
            .roleScrollCon {
                overflow-y: scroll;
                height: 350px;
            }
            .roleItemCon {
                height: 86px;
                margin-bottom: 20px;
                cursor: pointer;
                display: flex;
                padding-left: 20px;
                padding-right: 20px;
                box-sizing: border-box;
                justify-content: space-between;
                align-content: center;
                align-items:center;
                .leftPart {
                    
                }
                .rightPart {
                    
                }
            }
        }
    }
</style>