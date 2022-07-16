
export interface TableOptions {
  label: string, // 表头
  prop: string, // 字段名称
  width?: string | number,
  align?: 'left' | 'center' | 'right',
  slot?: string,
  action?: boolean, // 操作项
  editable?: boolean, // 是否可编辑单元格
}
