<template>
  <div class="accountMaFirstCon">
        <div class="shadowCon">
            <div class="leftPart">
                <div>
                    <img class="avatar" :src="getWebInfo.avatar">
                </div>
                <div>
                    <div class="himSelf">
                        <span v-if="getWebInfo.customerInfo.type == '2' ">{{ getWebInfo.roleName == 'admin' ? getWebInfo.roleName : getWebInfo.customerInfo.realName}}</span>
                        <span v-else>{{getWebInfo.customerInfo.realName}}</span>
                    </div>
                    <div class="desc" v-if="getWebInfo.customerInfo.type == '2' ">{{getWebInfo.customerInfo.name}}<span v-if="getWebInfo.roleName != 'admin'">（{{getWebInfo.roleName}}）</span></div>
                </div>
            </div>
            <div>
                <div v-if="getWebInfo.customerInfo.type == '2' "><CompanyLogo/></div>
                <div v-else><PersonalLogo/></div>
            </div>
        </div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'accountMaFirst',
  data() {
    return {
    }
  },
    computed:{
        ...mapGetters([
            'getWebInfo',
        ]),
    },
  mounted(){
      this.initAction();
  },
  methods: {
      initAction(){
      },
  }
}
</script>
<style lang="scss" scoped>
    .accountMaFirstCon {
        .shadowCon {
            height: 120px;
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
            border-radius:8px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 30px 40px;
        }
        .leftPart {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
        }
        .avatar {
            width:60px;
            height:60px;
            border-radius:4px;
            border:1px solid rgba(0,0,0,0.15);
            margin-right: 20px;
        }
        .himSelf {
            font-size: 20px;
            color: #303133;
            line-height: 20px;
        }
        .desc {
            margin-top: 10px;
            color: #909399;
            font-size: 14px;
            line-height: 14px;
        }
    }
</style>