<template>
  <div class="contactsMasterCon">
      <mixCon/>
  </div>
</template>
<script>
    import mixCon from './subs/mixCon.vue';
export default {
  name: 'contactsMaster',
    components:{
        mixCon,
    },
}
</script>
<style lang="scss" scoped>
    .contactsMasterCon {
        height: 100%;
        min-height: calc( 100vh - 80px );
    }
</style>