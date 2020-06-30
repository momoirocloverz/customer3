<template>
  <div class="helpCenterItemListsCon">
        <div class="centerCon">
            <div class="breadCon">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
                    <el-breadcrumb-item>分类问题</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="whiteBg">
                <div class="topFirst">
                    <div class="short1">问题分类</div>
                </div>
                <div class="">
                    <template v-for="(item,index) in flexResArr">
                        <div class="itemSelf" @click="checkDetail(item)">
                            <div class="leftPart">
                                <div>{{index+1}}、</div>
                                <div>{{item.title}}</div>
                            </div>
                            <div><i class="el-icon-arrow-right"></i></div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  name: 'helpCenterLists',
  data() {
    return {
        flexResArr:[],
    }
  },
  mounted(){
      this.fetchLists();
  },
  methods: {
      checkDetail(item){
          this.$router.push({
              name: 'helpConTargetDetail',
              query:{
                  id:item.id
              }
          })
      },
      fetchLists(){
        let params = {
            pageNum:1,
            pageSize:100000,
            rangeId:this.$route.query.id
        };
          this.ApiLists.helpQuestionList(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  let bridge = data.list || [];
                  this.flexResArr = bridge ;
              }
          }).catch(err=>{
              console.log('err',err);
          })          
      },
  }
}
</script>
<style lang="scss" scoped>
    .helpCenterItemListsCon {
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
        .itemSelf {
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
            color: #909399;
            font-size: 12px;
            .leftPart {
                display: flex;
                justify-content:flex-start;
                align-content: center;
                align-items: center;
                color: #303133;
                font-size: 14px;
                line-height: 14px;
            }
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
        .topFlexCon {
            display: flex;
            justify-content:flex-start;
            align-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
    }
</style>