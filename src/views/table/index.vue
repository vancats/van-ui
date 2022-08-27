<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue'
import type { TableOptions } from '../../component/table/src/types'

interface TableData {
  id: string,
  date: string,
  name: string,
  address: string,
  province: string,
  city: string,
  area: string,
  town: string,
  citytown: string,
  citytown2: string,
  children?: Array<TableData>
}

const tableData = ref<TableData[]>([])

setTimeout(() => {
  tableData.value = [
    {
      id: '1',
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
      children: [
        {
          id: '2',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          province: 'Zhejiang',
          city: 'Hangzhou',
          area: 'Bin',
          town: 'Jia',
          citytown: 'De',
          citytown2: 'Xin',
        },
        {
          id: '3',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          province: 'Zhejiang',
          city: 'Hangzhou',
          area: 'Bin',
          town: 'Jia',
          citytown: 'De',
          citytown2: 'Xin',
        },
      ],
    },
    {
      id: '4',
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
    },
    {
      id: '5',
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
      children: [
        {
          id: '12',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          province: 'Zhejiang',
          city: 'Hangzhou',
          area: 'Bin',
          town: 'Jia',
          citytown: 'De',
          citytown2: 'Xin',
        },
        {
          id: '13',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          province: 'Zhejiang',
          city: 'Hangzhou',
          area: 'Bin',
          town: 'Jia',
          citytown: 'De',
          citytown2: 'Xin',
        },
        {
          id: '14',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          province: 'Zhejiang',
          city: 'Hangzhou',
          area: 'Bin',
          town: 'Jia',
          citytown: 'De',
          citytown2: 'Xin',
        },

        {
          id: '15',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          province: 'Zhejiang',
          city: 'Hangzhou',
          area: 'Bin',
          town: 'Jia',
          citytown: 'De',
          citytown2: 'Xin',
        },

        {
          id: '16',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          province: 'Zhejiang',
          city: 'Hangzhou',
          area: 'Bin',
          town: 'Jia',
          citytown: 'De',
          citytown2: 'Xin',
        },

        {
          id: '17',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          province: 'Zhejiang',
          city: 'Hangzhou',
          area: 'Bin',
          town: 'Jia',
          citytown: 'De',
          citytown2: 'Xin',
        },
      ],
    },
    {
      id: '6',
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
    },
    {
      id: '7',
      date: '2016-05-05',
      name: 'Vancats',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
    },
    {
      id: '8',
      date: '2016-05-05',
      name: 'Vancats',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
    },
    {
      id: '9',
      date: '2016-05-05',
      name: 'Vancats',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
    },
    {
      id: '10',
      date: '2016-05-05',
      name: 'Vancats',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
    },
    {
      id: '11',
      date: '2016-05-05',
      name: 'Vancats',
      address: 'No. 189, Grove St, Los Angeles',
      province: 'Zhejiang',
      city: 'Hangzhou',
      area: 'Bin',
      town: 'Jia',
      citytown: 'De',
      citytown2: 'Xin',
    },
  ]
}, 200)

const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`

const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    width: 200,
    fixed: true,
    sortable: true,
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name',
    width: 200,
    editable: true,
  },
  {
    label: '地址',
    prop: 'address',
    width: 300,
    align: 'center',
    editable: true,
  },
  {
    label: '地区',
    align: 'center',
    children: [
      {
        label: '省',
        prop: 'province',
        align: 'center',
        width: '120',
        editable: true,
      },
      {
        label: '市',
        prop: 'city',
        align: 'center',
        width: '120',
        editable: true,
      },
      {
        label: '区',
        prop: 'area',
        align: 'center',
        width: '120',
        editable: true,
      },
    ],
  },
  {
    label: '操作',
    prop: 'edit',
    align: 'center',
    width: 200,
    action: true,
    fixed: 'right',
  },
]

const confirm = (scope: any) => {
  console.log('父组件', scope)
}
const cancel = (scope: any) => {
  console.log('父组件', scope)
}

// 表示编辑按钮可以操作
const editRowIndex = ref<string>('')

const edit = (scope: any) => {
  editRowIndex.value = 'edit'
}
</script>

<template>
  <van-table
    v-model:edit-row-index="editRowIndex"
    :data="tableData"
    :options="options"
    row-key="id"
    is-edit-row
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(0, 0, 0, .8)"
    @confirm="confirm"
    @cancel="cancel"
  >
    <!-- edit-icon="Bottom" -->
    <template #date="{ scope }">
      <el-icon>
        <Timer />
      </el-icon>
      {{ scope.row.date }}
    </template>
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <!-- 普通操作栏 -->
    <template #action="{ scope }">
      <el-button size="small" type="primary" @click="edit(scope)">
        编辑
      </el-button>
      <el-button size="small" type="danger">
        删除
      </el-button>
    </template>
    <!-- 编辑操作栏 -->
    <template #editRow>
      <div>
        <el-button size="small" type="primary">
          确认
        </el-button>
        <el-button size="small">
          取消
        </el-button>
      </div>
    </template>
    <!-- 单元格操作栏 -->
    <template #editCell>
      <div style="display: flex; margin-left: 8px">
        <el-button size="small" type="primary">
          确认
        </el-button>
        <el-button size="small">
          取消
        </el-button>
      </div>
    </template>
  </van-table>
</template>

<style lang="less" scoped>
</style>
