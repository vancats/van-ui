<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import type { FormInstance, FormOptions } from '../../component/form/src/types/types'
const visible = ref<boolean>(false)
const open = () => {
  visible.value = true
}

const options: FormOptions[] = [
  {
    type: 'input',
    value: 'admin',
    label: '用户名',
    prop: 'username',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 6,
        message: '用户名在 2-6 位之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '123456',
    label: '密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
      {
        min: 6,
        max: 15,
        message: '密码在 6-15 位之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: 'select',
    value: '2',
    prop: 'role',
    placeholder: '请选择职位',
    label: '职位',
    attrs: {
      style: {
        width: '100%',
      },
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change',
      },
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1',
      },
      {
        type: 'option',
        label: '主管',
        value: '2',
      },
      {
        type: 'option',
        label: '员工',
        value: '3',
      },
    ],
  },
  {
    type: 'checkbox-group',
    value: ['足球', '篮球'],
    prop: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change',
      },
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
      },
      {
        type: 'checkbox',
        label: '篮球',
      },
      {
        type: 'checkbox',
        label: '排球',
      },
    ],
  },
  {
    type: 'radio-group',
    value: '男',
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change',
      },
    ],
    children: [
      {
        type: 'radio',
        label: '男',
      },
      {
        type: 'radio',
        label: '女',
      },
      {
        type: 'radio',
        label: '保密',
      },
    ],
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 2,
    },
    rules: [
      {
        required: true,
        message: '上传文件不能为空',
        trigger: 'change',
      },
    ],
  },
  {
    type: 'editor',
    value: '描述',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur',
      },
    ],
  },
]

const confirm = (form: any) => {
  const validate = form.validate()
  const model = form.getFormData()
  console.log('validate: ', validate)
  validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('验证成功')
      console.log(model)
    }

    else { ElMessage.error('验证失败') }
  })
}

const cancel = (form: FormInstance) => {
  visible.value = false
}
const handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}
const handleRemove = (val: any) => {
  console.log('handleRemove ')
  console.log(val)
}
const handleBeforeRemove = (val: any) => {
  console.log('beforeRemove')
  console.log(val)
  return ElMessageBox.confirm(
    `Cancel the transfert of ${val.file.name} ?`,
  ).then(
    () => true,
    () => false,
  )
}
const handleExceed = (val: any) => {
  console.log('handleExceed')
  console.log('val: ', val)
  ElMessage.warning(
    `The limit is 2, you selected ${val.file.length} files this time, add up to ${
      val.file.length + val.fileList.length
    } totally`,
  )
}
const handleSuccess = (val: any) => {
  console.log('handleSuccess')
  console.log(val)
}
const handleChange = (val: any) => {
  console.log('handleChange')
  console.log(val)
}
const handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
  console.log(val)
}

</script>

<template>
  <el-button type="primary" @click="open">
    打开
  </el-button>
  <van-modal-form
    v-model="visible"
    title="编辑用户"
    width="50%"
    is-scroll
    :options="options"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :on-exceed="handleExceed"
    :before-remove="handleBeforeRemove"
    :before-upload="handleBeforeUpload"
  >
    <template #uploadArea>
      <el-button size="small" type="primary">
        Click to upload
      </el-button>
    </template>
    <template #uploadTip>
      <div style="color: #ccc; font-size: 12px">
        我是 tips
      </div>
    </template>
    <template #footer="{form}">
      <el-button type="primary" @click="confirm(form)">
        确定
      </el-button>
      <el-button @click="cancel(form)">
        取消
      </el-button>
    </template>
  </van-modal-form>
</template>

<style lang="less" scoped>

</style>
