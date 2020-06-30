<template>
  <div class="personalLogoCon">
      <img :src="roleArr[0].src"><span>{{roleArr[0].title}}</span>
  </div>
</template>
<script>
export default {
  name: 'personalLogo',
  data() {
    return {
        roleArr:[
            { 
                src:require('@/assets/role_person.svg'),
                title:"个人商家",
            }
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
    .personalLogoCon {
        width:70px;
        height:20px;
        background:rgba(255,240,230,1);
        border-radius:24px;
        border:1px solid rgba(255,225,205,1);
        font-size: 12px;
        color: #FF882A;
        padding-left: 3px;
        box-sizing: border-box;
        img {
            height: 10px;
            width: 10px;
            margin-right: 4px;
        }
    }
</style>