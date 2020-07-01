<template>
    <div class="emptyProtecter">
        <router-view/>
    </div>
</template>
<script>
export default {
  name: 'emptyProtecter',
}
</script>
<style lang="scss">
  .emptyProtecter{
      width: 100%;
      min-height: calc(100% - 80px);
      background: #f2f6fc;
      padding: 40px;
      box-sizing: border-box;
  }
</style>