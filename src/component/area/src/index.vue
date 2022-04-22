<script setup lang="ts">
import { ar } from 'element-plus/lib/locale'
import { ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'

export interface AreaItem {
  name: string
  code: string
  children?: AreaItem[]
}

export interface Data {
  name: string
  code: string
}

// 所有省份的数据
const areas = ref(allAreas)
// 当前选择的省份
const province = ref<string>('')
// 当前选择的城市
const city = ref<string>('')
// 当前选择的区域
const area = ref<string>('')

// 城市下拉框的所有值
const selectCity = ref<AreaItem[]>([])
// 区域下拉框的所有值
const selectArea = ref<AreaItem[]>([])

// 监听选择省份
watch(() => province.value, val => {
  if (val)
    selectCity.value = areas.value.find(item => item.code === province.value)!.children

  city.value = ''
  area.value = ''
})

// 监听选择城市
watch(() => city.value, val => {
  if (val)
    selectArea.value = selectCity.value.find(item => item.code === city.value)!.children!
  area.value = ''
})

// 分发事件给父组件
const emits = defineEmits(['change'])
watch(() => area.value, val => {
  if (val) {
    const provinceData: Data = {
      code: province.value,
      name: allAreas.find(item => item.code === province.value)!.name,
    }
    const cityData: Data = {
      code: city.value,
      name: selectCity.value.find(item => item.code === city.value)!.name,
    }
    const areaData: Data = {
      code: val,
      name: selectArea.value.find(item => item.code === val)!.name,
    }
    emits('change', {
      province: provinceData,
      city: cityData,
      area: areaData,
    })
  }
})
</script>

<template>
  <div>
    <el-select v-model="province" placeholder="请选择省份">
      <el-option v-for="item in areas" :key="item.code" :label="item.name" :value="item.code" />
    </el-select>
    <el-select v-model="city" :disabled="!province" style="margin: 0 10px" placeholder="请选择城市">
      <el-option v-for="item in selectCity" :key="item.code" :label="item.name" :value="item.code" />
    </el-select>
    <el-select v-model="area" :disabled="!city" placeholder="请选择区域">
      <el-option v-for="item in selectArea" :key="item.code" :label="item.name" :value="item.code" />
    </el-select>
  </div>
</template>

<style lang="less" scoped>

</style>
