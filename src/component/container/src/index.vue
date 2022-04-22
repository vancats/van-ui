<script setup lang="ts">
import { ref } from 'vue'
import ContainerHeader from './Header/index.vue'
import ContainerSide from './Side/index.vue'
const isCollapse = ref(false)

</script>

<template>
  <el-container>
    <el-aside width="auto">
      <container-side v-model:collapse="isCollapse" />
    </el-aside>

    <el-container>
      <el-header>
        <container-header v-model:collapse="isCollapse" />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
