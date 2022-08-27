<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import type { TableOptions } from './types'
import TableColumn from './tableColumn.vue'

const props = defineProps({
  // 表格配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  // 表格数据
  data: {
    type: Array as PropType<any []>,
    required: true,
  },
  // 加载文案
  elementLoadingText: {
    type: String,
    default: '加载中...',
  },
  // 加载图标名
  elementLoadingSpinner: {
    type: String,
  },
  elementLoadingBackground: {
    type: String,
  },
  elementLoadingSvg: {
    type: String,
  },
  elementLoadingSvgViewBox: {
    type: String,
  },
  editIcon: {
    type: String,
    default: 'Edit',
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑按钮的标识
  editRowIndex: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    required: false,
  },
})

const emits = defineEmits(['confirm', 'cancel', 'update:edit-row-index'])
const currentEdit = ref<string>('')

// 点击勾
const confirm = (scope: any) => {
  emits('confirm', scope)
}
// 点击叉
const cancel = (scope: any, prop: string, tempCell: any) => {
  scope.row[prop] = tempCell
  emits('cancel', scope)
}

// 拷贝表格数据
const tableData = ref<any[]>(cloneDeep(props.data))
// 拷贝按钮标识
const cloneEditRowIdex = ref<string>('edit')

watch(() => props.data, val => {
  tableData.value = cloneDeep(val)
  tableData.value.map(item => {
    // 当前是否可编辑
    return item.rowEdit = false
  })
}, { deep: true })

onMounted(() => {
  tableData.value.forEach(item => {
    // 当前是否可编辑
    item.rowEdit = false
  })
})

// 过滤操作项
const tableOptions = computed(() => props.options.filter(item => !item.action))
// 操作项
const actionOptions = computed(() => props.options.find(item => item.action))
// 加载中
const isLoading = computed(() => !props.data || props.data.length === 0)

// 点击每一行
const rowClick = (row: any, column: any) => {
  if (column.label === actionOptions.value?.label) {
    if (props.isEditRow && props.editRowIndex === 'edit') {
      row.rowEdit = !row.rowEdit

      // 重置其他数据
      tableData.value.forEach(item => {
        if (item !== row) item.rowEdit = false
      })
      if (!row.rowEdit) emits('update:edit-row-index', '')
    }
  }
}
</script>

<template>
  <el-table
    v-loading="isLoading"
    :data="tableData"
    :height="height"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    @row-click="rowClick"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <TableColumn v-model:current-edit="currentEdit" :item="item" :edit-icon="editIcon" @confirm="confirm" @cancel="cancel">
        <template v-if="item.slot" #[item.slot!]="{scope}">
          <slot :name="item.slot" :scope="scope" />
        </template>
        <template v-if="$slots.editCell" #editCell="{scope}">
          <slot name="editCell" :scope="scope" />
        </template>
      </TableColumn>
    </template>
    <!-- 操作栏 -->
    <el-table-column
      :label="actionOptions?.label"
      :align="actionOptions?.align"
      :width="actionOptions?.width"
      :fixed="actionOptions?.fixed"
    >
      <template #default="scope">
        <slot v-if="scope.row.rowEdit" name="editRow" :scope="scope" />
        <slot v-else name="action" :scope="scope" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="less" scoped>
</style>
