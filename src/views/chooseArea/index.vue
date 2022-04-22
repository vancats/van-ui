<script setup lang="ts">
function changeArea(val: any) {
  val.id = 1
}

</script>

<template>
  <van-area @change="changeArea" />
</template>

<style scoped>

</style>
