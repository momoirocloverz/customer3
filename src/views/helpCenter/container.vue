<template>
  <div class="helpCenterCon">
      <div class="centerCon">
          <div class="upperCon">
                <div class="upperLeft">
                    <div class="short1">帮助中心</div>
                    <div class="short2">联系客服：137 5719 4423</div>
                </div>
                <div class="upperRight" @keyup.enter="searchNow">
                    <el-input v-model.trim="keyWords" size="small" class="lockItemInput" placeholder="请输入问题关键词" maxLength="30" clearable><el-button slot="append" icon="el-icon-search" @click="searchNow"></el-button></el-input>
                </div>
            </div>
            <div v-if="commonShow">
                <div class="topWhite">
                    <div class="topFirst">
                        <div class="short1">问题分类</div>
                        <div class="spShort2" @click="checkAll">全部分类<i class="el-icon-arrow-right"></i></div>
                    </div>
                    <div class="topFlexCon">
                        <template v-for="(item,index) in flexResArr">
                            <div class="itemSelf" @click="checkDetail(item)">{{ item.rangeName }}</div>
                        </template>
                    </div>
                </div>
                <div class="bottomWhite">
                    <div class="bottomFirst">
                        <div class="short1">热点问题</div>
                    </div>
                    <div class="">
                        <template v-for="(item,index) in anotherArr">
                            <div class="itemCopySelf" @click="checkItemDetail(item)">
                                <div class="leftPart">
                                    <div class="fakeIcon"></div>
                                    <div>【{{item.range}}】</div>
                                    <div>{{item.title}}</div>
                                </div>
                                <div><i class="el-icon-arrow-right"></i></div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="bottomWhite">
                    <div class="hiddenFirst">
                        <div class="short3">共{{hiddenArr.length}}条搜索结果</div>
                    </div>
                    <div class="">
                        <template v-for="(item,index) in hiddenArr">
                            <div class="itemCopySelf" @click="checkItemDetail(item)">
                                <div class="leftPart">
                                    <div>【{{item.range}}】</div>
                                    <div>{{item.title}}</div>
                                </div>
                                <div><i class="el-icon-arrow-right"></i></div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  name: 'helpCon',
  data() {
    return {
        keyWords:'',
        commonShow:true,
        flexResArr:[],
        anotherArr:[],
        searchFlag:false,
        hiddenArr:[],
    }
  },
  mounted(){
      this.fetchLists();
  },
  methods: {
      searchNow(){
          if( this.keyWords ){
              this.commonShow = false;
              let params1 = {
                  pageNum:1,
                  pageSize:20,
                  title:this.keyWords,
              };
              this.ApiLists.helpQuestionList(params1).then(res=>{
                  let { data,respCode } = res;
                  if( respCode === 0 ){
                      let bridge = data.list || [];
                      this.hiddenArr = bridge;
                  }
              }).catch(err=>{
                  console.log('err',err);
              }) 
          }else{
              this.commonShow = true;
          }
      },
      checkItemDetail(item){
          this.$router.push({
              name: 'helpConTargetDetail',
              query:{
                  id:item.id
              }
          })
      },
      checkAll(){
          this.$router.push({
              name: 'helpConAllLists',
          });
      },
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
              pageSize:10
          };
          this.ApiLists.helpRangeList(params).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  let bridge = data.list.slice(0,6)|| [];
                  this.flexResArr = bridge ;
              }
          }).catch(err=>{
              console.log('err',err);
          })   
          let params1 = {
              pageNum:1,
              pageSize:20,
              position:1,
          };
          this.ApiLists.helpQuestionList(params1).then(res=>{
              let { data,respCode } = res;
              if( respCode === 0 ){
                  let bridge = data.list || [];
                  this.anotherArr = bridge;
              }
          }).catch(err=>{
              console.log('err',err);
          }) 
      },
  }
}
</script>
<style lang="scss" scoped>
    .helpCenterCon {
        height: 100%;
        min-height: calc( 100vh - 80px );
        padding-bottom: 40px;
        box-sizing: border-box;
        .hiddenFirst {
            border-bottom: 1px solid #F5F5F5;
            .short3 {
                color: #909399;
                font-size: 14px;
                line-height: 14px;
                margin-bottom: 30px;
            }
        }
        .itemCopySelf {
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
                .fakeIcon {
                    height: 16px;
                    width: 16px;
                    background-origin: border-box;
                    background-repeat: no-repeat;
                    background-size:cover;
                    background-position: center;
                    background-image: url(../../assets/fire.svg)
                }
            }
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
        .topWhite {
            background-color:#fff;
            height: 310px;
            box-sizing: border-box;
            padding: 30px 40px 40px;
            box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
            border-radius:8px;
            margin-bottom: 20px;
            .topFlexCon {
                display: flex;
                justify-content:flex-start;
                align-content: center;
                align-items: center;
                flex-wrap: wrap;
            }
            .topFirst {
                display: flex;
                justify-content: space-between;
                align-content: center;
                align-items: center;
                margin-bottom: 30px;
            }
        }
        .bottomWhite {
            background-color:#fff;
            box-sizing: border-box;
            padding: 30px 40px 40px;
            box-shadow:0px 4px 8px -2px rgba(0,0,0,0.05);
            border-radius:8px;
            .bottomFirst {
                .short1 {
                    margin-bottom: 30px;
                }
            }
        }
        .short1 {
            color: #303133;
            font-size: 20px;
            line-height: 20px;
            margin-right: 10px;
        }
        .spShort2 {
            color: #909399;
            font-size: 14px;
            cursor: pointer;
        }
        .centerCon {
            margin: 0 auto;
            width: 800px;
            padding-top: 40px;
            box-sizing: border-box;
            .upperCon {
                display: flex;
                justify-content: space-between;
                align-content: center;
                align-items: center;
                margin-bottom: 40px;
                .upperRight {
                    width: 320px;
                }
                .upperLeft {
                    display: flex;
                    justify-content:flex-start;
                    align-content: center;
                    align-items: center;
                    
                    .short2 {
                        color: #909399;
                        font-size: 14px;
                        line-height: 14px;
                    }
                }
            }
            
        }
    }
</style>