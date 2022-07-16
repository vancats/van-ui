<script setup lang="ts">
import { useSlots } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'up',
  },
  text: {
    type: String,
    default: '文字',
  },
  upIconColor: {
    type: String,
    default: '#f5222d',
  },
  downIconColor: {
    type: String,
    default: '#52c41a',
  },
})

const slots = useSlots()
</script>

<template>
  <div class="trend">
    <div class="text">
      <slot v-if="slots.default" />
      <div v-else>
        {{ text }}
      </div>
    </div>
    <el-icon v-if="type === 'up'">
      <ArrowUp :style="{ color: upIconColor }" />
    </el-icon>
    <el-icon v-else>
      <ArrowDown :style="{ color: downIconColor }" />
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 14px;
    margin-right: 4px;
  }
}
</style>
