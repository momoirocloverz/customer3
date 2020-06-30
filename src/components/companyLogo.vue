<template>
  <div class="companyLogCon">
      <img :src="roleArr[0].src"><span>{{roleArr[0].title}}</span>
  </div>
</template>
<script>
export default {
  name: 'companyLog',
  data() {
    return {
        roleArr:[
            {
                src:require('@/assets/role_company.svg'),
                title:"企业商家",
            }
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
    .companyLogCon {
        width:70px;
        height:20px;
        background:rgba(230,238,255,1);
        border-radius:24px;
        border:1px solid rgba(205,221,255,1);
        font-size: 12px;
        color: #4183FF;
        padding-left: 3px;
        box-sizing: border-box;
        img {
            height: 10px;
            width: 10px;
            margin-right: 4px;
        }
    }
</style>