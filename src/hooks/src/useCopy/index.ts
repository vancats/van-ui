
import { ElMessage } from 'element-plus'

export function useCopy(text: string) {
  // 创建输入框
  const input = document.createElement('input')
  // 赋值
  input.value = text
  // 追加到 body
  document.body.appendChild(input)
  // 选择输入框的操作
  input.select()
  // 执行复制操作
  document.execCommand('Copy')
  // 删除
  document.body.removeChild(input)
  ElMessage.success('复制成功')
}
