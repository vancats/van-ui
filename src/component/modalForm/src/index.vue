<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import type { FormInstance, FormOptions } from '../../form/src/types/types'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  isScroll: {
    type: Boolean,
    default: false,
  },
  onPreview: {
    type: Function,
  },
  onRemove: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
  onError: {
    type: Function,
  },
  onProgress: {
    type: Function,
  },
  beforeUpload: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  onChange: {
    type: Function,
  },
  httpRequest: {
    type: Function,
  },
  onExceed: {
    type: Function,
  },
})

const emits = defineEmits(['update: visible'])

const dialogVisible = ref<boolean>(props.visible)
watch(() => props.visible, val => {
  dialogVisible.value = val
  emits('update: visible')
})

const form = ref<FormInstance[]>()
</script>

<template>
  <div :class="{'modal-form-dialog-body-height': isScroll}">
    <el-dialog
      v-model="dialogVisible"
      v-bind="$attrs"
    >
      <template #default>
        <van-form
          ref="form"
          :label-width="100"
          :options="options"
          @on-preview="onPreview"
          @on-remove="onRemove"
          @on-success="onSuccess"
          @on-error="onError"
          @on-progress="onProgress"
          @before-upload="beforeUpload"
          @before-remove="beforeRemove"
          @on-change="onChange"
          @http-request="httpRequest"
          @on-exceed="onExceed"
        >
          <template #uploadArea>
            <slot name="uploadArea" />
          </template>
          <template #uploadTip>
            <slot name="uploadTip" />
          </template>
        </van-form>
      </template>
      <template #footer>
        <slot name="footer" :form="form" />
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>

</style>
