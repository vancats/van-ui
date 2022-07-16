<script setup lang="ts">
function changeArea(val: any) {
  // eslint-disable-next-line no-console
  console.log('val: ', val)
}

</script>

<template>
  <van-area @change="changeArea" />
</template>

<style scoped>

</style>
