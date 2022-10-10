<template>
  <el-button type="success" :icon="Files" @click="exportE">
    生成毕设学生表格
  </el-button>
</template>
<script lang="ts" setup>
import { User } from '@/types/type'
import { useStore } from '@/store'
import { exportExcelFile } from '@/utils/ExcelUtils'

import { Files } from '@element-plus/icons'
import { onMounted } from 'vue'

const store = useStore()
let exportE = () => {
  store.allstudents().then((students: User[]) => {
    let i = 0
    let result = students.map((s) => {
      return {
        序号: (i += 1),
        学号: s.number,
        学生姓名: s.name,
        指导教师: s.teacherName,
      }
    })
    exportExcelFile(result)
  })
}

onMounted(() => {
  let script = document.createElement('script')
  script.src = '//unpkg.com/xlsx@0.17.4/dist/xlsx.full.min.js'
  document.body.appendChild(script)
})
</script>
