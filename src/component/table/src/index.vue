<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import type { TableOptions } from './types'

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
})

const emits = defineEmits(['confirm', 'cancel', 'update:edit-row-index'])

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
// 当前点击的单元格
const currentEdit = ref<string>('')
// 临时单元格变量
let tempCell = ref<string>('')
// 编辑图标
const clickEdit = (scope: any, prop: string) => {
  tempCell = scope.row[prop]
  currentEdit.value = scope.$index + scope.column.id
}
const restoreCell = () => {
  currentEdit.value = ''
}
// 点击勾
const confirm = (scope: any) => {
  emits('confirm', scope)
}
// 点击叉
const cancel = (scope: any, prop: string) => {
  scope.row[prop] = tempCell
  emits('cancel', scope)
}
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
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    @row-click="rowClick"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input v-model="scope.row[item.prop]" />
          </template>
          <template v-else>
            <!-- 当前正在编辑的单元格 -->
            <template v-if="(scope.$index + scope.column.id) === currentEdit">
              <div style="display: flex">
                <el-input v-model="scope.row[item.prop]" size="small" />
                <!-- 后面跟着的图标 -->
                <div @click.stop="restoreCell">
                  <slot v-if="$slots.editCell" :scope="scope" name="editCell" />
                  <div v-else class="icons">
                    <el-icon @click="confirm(scope)">
                      <Check class="confirm" />
                    </el-icon>
                    <el-icon @click="cancel(scope, item.prop)">
                      <Close class="cancel" />
                    </el-icon>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- 正常显示的内容 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope" />
              <span v-else>{{ scope.row[item.prop] }}</span>
              <el-icon v-if="item.editable" @click.stop="clickEdit(scope, item.prop)">
                <component :is="editIcon" class="edit" />
              </el-icon>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <!-- 操作栏 -->
    <el-table-column
      :label="actionOptions?.label"
      :align="actionOptions?.align"
      :width="actionOptions?.width"
    >
      <template #default="scope">
        <slot v-if="scope.row.rowEdit" name="editRow" :scope="scope" />
        <slot v-else name="action" :scope="scope" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="less" scoped>
.edit {
  position: relative;
  top: 2px;
  left: 4px;
}

.icons {
  display: flex;
  position: relative;
  top: 4px;
  margin-left: 8px;
  svg {
    width: 2em;
    height: 2em;
  }
  .confirm {
    color: red;
  }
  .cancel {
    color: green;
  }
}
</style>
