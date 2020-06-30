<template>
    <div class="blank">
        <router-view/>
    </div>
</template>

<script>
// import { Navbar, Sidebar, AppMain } from '@/views/layout/components'

export default {
  name: 'empty',
  // components: {
  //   Navbar,
  //   Sidebar,
  //   AppMain
  // },
  computed: {
  
  }
}
</script>
<style lang="scss">
  .blank{
      width: 100%;
      // height: calc(100% - 80px);
      background: #f2f6fc;
  }
</style>


