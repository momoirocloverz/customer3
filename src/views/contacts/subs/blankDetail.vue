<template>
  <div class="contactsBlankCon">
      <div class="breadCon">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item @click.native="clickHere">通讯录</el-breadcrumb-item>
              <el-breadcrumb-item v-if="$route.query.name">{{$route.query.name}}</el-breadcrumb-item>
              <el-breadcrumb-item>人员详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detailCon">
            <div class="firstLine">
                <div class="itemForHead" :style=" 'backgroundImage: url('+ mainData.avatar +')' "></div>
                <div class="name">{{mainData.realNameAlias}}</div>
            </div>            
            <div class="whiteCon">
                <div class="name">个人信息</div>
                <div class="infoFirst leftFlex">
                    <div class="commonLeft leftFlex">
                        <div class="mr20">身份证号</div>
                        <div>{{mainData.idCard}}</div>
                    </div>
                    <div class="leftFlex">
                        <div class="mr20">性别</div>
                        <div>{{mainData.sex == 1 ? '男': '女' }}</div>
                    </div>
                </div>
                <div class="infoSec leftFlex">
                    <div class="commonLeft leftFlex">
                        <div class="mr20">手机号码</div>
                        <div>{{mainData.mobile}}</div>
                    </div>
                    <div class="leftFlex">
                        <div class="mr20">出生日期</div>
                        <div>{{mainData.birthday}}</div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'contactsBlank',
  data() {
    return {
        mainData:{},
        showBottom:false,
    }
  },
    computed:{
        ...mapGetters([
            'getWebInfo',
        ]),
    },
  mounted(){
      this.initFetch()
  },
  methods: {
      clickHere(){
          this.$store.commit('changeMenuActiveIndex', '3')
          this.$router.push({
              path: '/main/contacts',
          })
      },
      initFetch(){
          if( this.getWebInfo.customerInfo.type == 1 ){
              this.showBottom = true;
          }
          if( this.getWebInfo.customerInfo.type == 2 ){
              this.showBottom = false;
          }
          
          
          let params = {
              talentId:this.$route.query.talentId
          };
          this.ApiLists.getTalentDetails(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.mainData = data;
              }
          }).catch(err=>{
              console.log('err',err);
          })
      }
  }
}
</script>
<style lang="scss" scoped>
    .contactsBlankCon {
        padding: 30px 40px;
        box-sizing: border-box;
        height: 100%;
        min-height: calc(100vh - 80px);
        .breadCon {
            margin-bottom: 30px;
        }
        .detailCon {
            .itemForHead {
                width: 56px;
                height: 56px;
                background-origin: border-box;
                background-repeat: no-repeat;
                background-size:cover;
                background-position: center;
                margin-right: 20px;
            }
            .firstLine {
                display: flex;
                justify-content: flex-start;
                align-content: center;
                align-items: center;
                margin-bottom: 30px;
            }
            .name {
                color: #303133;
                font-size: 20px;
                font-weight: 500;
            }
            .whiteCon {
                background:rgba(255,255,255,1);
                box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
                border-radius:8px;
                box-sizing: border-box;
                padding: 30px 40px;
                .infoFirst {
                    color: #606266;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 14px;
                    margin-top: 40px;
                    margin-bottom: 40px;
                }
                .leftFlex {
                    display: flex;
                    justify-content: flex-start;
                    align-content: center;
                    align-items: center;
                }
                .infoSec {
                    color: #606266;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 14px;
                }
                .commonLeft {
                    width: 380px;
                }
            }
        }
    }
</style>