<script setup lang="ts">
import type { PropType } from 'vue'
import { nextTick, onMounted, ref, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import E from 'wangeditor'
import type { FormInstance, FormOptions } from './types/types'

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  httpRequest: {
    type: Function,
  },
})

const model = ref<any>(null)
const rules = ref<any>(null)
const form = ref<FormInstance[]>()
const edit = ref()

const initForm = () => {
  if (props.options && props.options.length) {
    const m: any = {}
    const r: any = {}
    props.options.forEach((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
      if (item.type === 'editor') {
        nextTick(() => {
          if (document.getElementById('editor')) {
            const editor = new E('#editor')
            editor.config.placeholder = item.placeholder!
            editor.create()
            // 初始化富文本编辑器
            editor.txt.html(item.value)
            editor.config.onchange = (newHtml: string) => {
              console.log(newHtml)
              model.value[item.prop!] = newHtml
            }
            edit.value = editor
          }
        })
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

// 重置表单与富文本编辑器内容
const resetFields = () => {
  form.value!.resetFields()
  if (props.options && props.options.length) {
    const editorItem = props.options.find(item => item.type === 'editor')
    edit.value.txt.html(editorItem?.value)
  }
}

// 表单验证
const validate = () => {
  return form.value!.validate
}

const getFormData = () => {
  return model.value
}

// 分发事件到实例上
defineExpose({
  resetFields,
  validate,
  getFormData,
})

onMounted(() => {
  initForm()
})
// 监听父组件修改 options
watch(() => props.options, () => {
  initForm()
})

const emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'on-exceed'])
const onPreview = (file: File) => {
  emits('on-preview', file)
}
const onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
const onSuccess = (response: any, file: File, fileList: FileList) => {
  const uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
const onError = (error: any, file: File, fileList: FileList) => {
  emits('on-error', { error, file, fileList })
}
const onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
const onChange = (file: File, fileList: FileList) => {
  const uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { file, fileList }
  emits('on-change', { file, fileList })
}
const beforeUpload = (file: File) => {
  emits('before-upload', file)
}
const beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
const onExceed = (file: File, fileList: FileList) => {
  emits('on-exceed', { file, fileList })
}
</script>

<template>
  <el-form
    v-if="model"
    ref="form"
    :validate-on-rule-change="false"
    :model="model"
    :rules="rules"
  >
    <template v-for="(item, index) in options" :key="index">
      <!-- 没有子元素 -->
      <el-form-item
        v-if="!item.children || !item.children?.length"
        v-bind="$attrs"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder"
        />
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :on-change="onChange"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <slot name="uploadArea" />
          <slot name="uploadTip" />
        </el-upload>
        <div v-if="item.type === 'editor'" id="editor" />
      </el-form-item>
      <!-- 有子元素 -->
      <el-form-item
        v-if="item.children && item.children.length"
        v-bind="$attrs"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder"
        >
          <!-- 子元素 -->
          <component
            :is="`el-${child.type}`"
            v-for="(child, i) in item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
          />
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model" />
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
