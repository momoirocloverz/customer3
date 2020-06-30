<template>
  <div class="helpCenterAllCon">
        <div class="centerCon">
            <div class="breadCon">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
                    <el-breadcrumb-item>全部分类</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="whiteBg">
                <div class="topFirst">
                    <div class="short1">问题分类</div>
                </div>
                <div class="topFlexCon">
                    <template v-for="(item,index) in flexResArr">
                        <div class="itemSelf" @click="checkDetail(item)">{{ item.rangeName }}</div>
                    </template>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  name: 'helpAllList',
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
              name: 'helpConTargetLists',
              query:{
                  rangeName:item.rangeName,
                  id:item.id
              }
          })
      },
      fetchLists(){
        let params = {
            pageNum:1,
            pageSize:100000
        };
          this.ApiLists.helpRangeList(params).then(res=>{
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
    .helpCenterAllCon {
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
            width:220px;
            height:80px;
            background:rgba(64,158,255,0.1);
            border-radius:4px;
            color: #409EFF;
            font-size: 20px;
            line-height: 80px;
            text-align: center;
            margin-right: 30px;
            margin-bottom: 30px;
            cursor: pointer;
            &:nth-child(3n){
                margin-right: 0;
            }
            &:hover {
                background-color: rgba(64,158,255,0.3);
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