<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { TableOptions } from './types'
const props = defineProps({
  // 表格配置
  item: {
    type: Object as PropType<TableOptions>,
    required: true,
  },
  editIcon: {
    type: String,
    default: 'Edit',
  },
  currentEdit: {
    type: String,
    require: false,
  },
})

const emits = defineEmits(['confirm', 'cancel', 'update:current-edit'])
// 当前点击的单元格
// 临时单元格变量
let tempCell = ref<string>('')
// 编辑图标
const clickEdit = (scope: any, prop: string) => {
  tempCell = scope.row[prop]
  emits('update:current-edit', scope.$index + scope.column.id)
}
const restoreCell = () => {
  emits('update:current-edit', '')
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
</script>

<template>
  <el-table-column
    :label="item.label"
    :prop="item.prop"
    :align="item.align"
    :width="item.width"
    :fixed="item.fixed"
    :sortable="item.sortable"
  >
    <template #default="scope">
      <template v-if="item.children && item.children.length > 0">
        <template v-for="child in item.children" :key="child.prop">
          <TableColumn :item="child" :edit-icon="editIcon" @confirm="confirm" @cancel="cancel">
            <template v-if="item.slot" #[item.slot!]="{scope}">
              <slot :name="item.slot" :scope="scope" />
            </template>
            <template v-if="$slots.editCell" #editCell="{scope}">
              <slot name="editCell" :scope="scope" />
            </template>
          </TableColumn>
        </template>
      </template>
      <template v-if="item.prop">
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
                  <el-icon @click="cancel(scope, item.prop!)">
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
            <el-icon v-if="item.editable" @click.stop="clickEdit(scope, item.prop!)">
              <component :is="editIcon" class="edit" />
            </el-icon>
          </template>
        </template>
      </template>
    </template>
  </el-table-column>
</template>

<style lang="less" scoped>
.edit {
  position: relative;
  top: 2px;
  left: 4px;
  height: 1em;
  width: 1em;
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
