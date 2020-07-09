<template>
  <div class="genderCon" :class=" 'gender'+item.sex ">
      <img :src="src1" v-if=" item.sex == '1' "><img :src="src2" v-else><span>{{item.age}}岁</span>
  </div>
</template>
<script>
export default {
    name: 'gender',
    props:{
        item:Object,
    },
    data() {
        return {
            src2:require('@/assets/female.svg'),
            src1:require('@/assets/male.svg'),
        }
    },
}
</script>
<style lang="scss" scoped>
    .gender1 {
        background:rgba(65,131,255,0.1);
        border:1px solid rgba(64,158,255,0.1);
        color: #409EFF;
    }
    .gender2 {
        background:rgba(245,108,108,0.1);
        border:1px solid rgba(245,108,108,0.1);
        color: #EE4F46;
    }
    .genderCon {
        width:63px;
        height:24px;
        border-radius:4px;
        font-size: 12px;
        text-align: center;
        box-sizing: border-box;
        line-height: 24px;
        img {
            height: 10px;
            width: 10px;
            margin-right: 4px;
        }
    }
</style>