<script setup lang="ts">
import { ref } from 'vue'
import ChooseIcon from '../../component/icon/src/index.vue'

const visible = ref<boolean>(false)
</script>

<template>
  <choose-icon v-model:visible="visible" title="选择图标" type="primary">
    选择图标
  </choose-icon>
</template>

<style scoped>

</style>
