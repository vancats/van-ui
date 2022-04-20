<script setup lang="ts">
const props = defineProps<{
  collapse: boolean
}>()
const emits = defineEmits(['update:collapse'])

const toggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>

<template>
  <div class="header">
    <span @click="toggle">
      <el-icon>
        <Expand v-if="collapse" />
        <Fold v-else />
      </el-icon>
    </span>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
</style>
