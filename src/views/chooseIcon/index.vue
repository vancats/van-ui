<script setup lang="ts">
import { ref } from 'vue'

const visible = ref<boolean>(false)
</script>

<template>
  <van-icon v-model:visible="visible" title="选择图标" type="primary">
    选择图标
  </van-icon>
</template>

<style scoped>

</style>
