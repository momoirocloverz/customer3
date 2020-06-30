<template>
  <div class="helpCenterDetailCon">
        <div class="centerCon">
            <div class="breadCon">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
                    <el-breadcrumb-item>问题详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="whiteBg">
                <div class="topFirst">
                    <div class="short1">{{resData.title}}</div>
                </div>
                <div class="content" v-html="resData.content"></div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  name: 'helpCenterDetail',
  data() {
    return {
        resData:{},
    }
  },
  mounted(){
      this.fetchLists();
  },
  methods: {
      fetchLists(){
        let params = {
            id:this.$route.query.id
        };
          this.ApiLists.helpQuestionDetail(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  this.resData = data;
              }
          }).catch(err=>{
              console.log('err',err);
          })          
      },
  }
}
</script>
<style lang="scss" scoped>
    .helpCenterDetailCon {
        height: 100%;
        min-height: calc( 100vh - 80px );
        padding-bottom: 40px;
        box-sizing: border-box;
        .whiteBg {
            background-color:#fff;
            box-sizing: border-box;
            padding: 30px 40px 40px;
            box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
            border-radius:8px;
        }
        .breadCon {
            margin-bottom: 30px;
        }
        .topFirst {
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            margin-bottom: 30px;
        }
        .centerCon {
            margin: 0 auto;
            width: 800px;
            padding-top: 40px;
            box-sizing: border-box;
        }
    }
</style>