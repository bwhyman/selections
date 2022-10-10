<template>
  <el-row>
    <el-col :span="24">
      <el-card style="margin-bottom: 15px">
        <el-alert
          :title="startTime"
          error
          alert
          type="error"
          :closable="false"
          style="margin-bottom: 10px"
        />
        <el-button type="primary" @click="listStudents" :icon="Search">
          获取当前未选导师学生列表
        </el-button>
        <exporte />
        <br />
        <br />
        <span v-for="(st, index) of students" :key="index">
          {{ index + 1 }} {{ st.name }};
        </span>
        <br />
        <br />
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
import { computed } from 'vue'
import exporte from './ExportExcel.vue'
import { Search } from '@element-plus/icons'

const store = useStore()
let students = computed(() => store.unSelectedStudents)
let startTime = computed(() => {
  let t = store.startTime?.replace('T', ' ')
  return `开始时间：${t}`
})
let listStudents = () => {
  store.listunselected()
}
</script>
