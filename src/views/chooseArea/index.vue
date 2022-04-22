<script setup lang="ts">
import ChooseArea from '../../component/area/src/index.vue'

function changeArea(val: any) {
  val.id = 1
}

</script>

<template>
  <choose-area @change="changeArea" />
</template>

<style scoped>

</style>
