<script setup lang="ts">
const props = defineProps<{
  collapse: boolean
}>()

</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="collapse"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>首页</span>
      </template>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>图标选择器</span>
      </template>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>趋势标记</span>
      </template>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
