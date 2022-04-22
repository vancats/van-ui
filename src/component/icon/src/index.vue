<script setup lang="ts">
import { ref, watch } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import { useCopy } from '../../../hooks/src/useCopy'

const props = defineProps<{
  title: string
  visible: boolean
  type: string
}>()

const emits = defineEmits(['update:visible'])
// 拷贝一份父组件传入的数据
const dialogVisible = ref<boolean>(props.visible)
const handleClick = () => {
  emits('update:visible', !props.visible)
}

// 两次监听
watch(() => props.visible, val => {
  dialogVisible.value = val
})
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})

const clickItem = (str: string) => {
  const text = `<el-icon><${str} /></el-icon>`
  useCopy(text)
  dialogVisible.value = false
}
</script>

<template>
  <el-button :type="type" @click="handleClick">
    <slot />
  </el-button>
  <div class="choose-icon-dialog-body-height">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
    >
      <div class="container">
        <div v-for="(item, index) in Object.keys(ElIcons)" :key="index" class="item" @click="clickItem(item)">
          <!-- 使用 component 加载所有组件 -->
          <el-icon><component :is="item" /></el-icon>
          {{ item }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  height: 70px;
}

.el-icon {
  font-size: 28px;
}
</style>
