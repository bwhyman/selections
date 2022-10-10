<template>
  <el-row>
    <el-col :span="24">
      <el-card style="">
        <el-steps :active="-1" finish-status="success" style="width: 100%">
          <el-step title="Login"></el-step>
          <el-step title="Wait"></el-step>
          <el-step title="Choose"></el-step>
          <el-step title="Confirm"></el-step>
        </el-steps>
      </el-card>
    </el-col>
  </el-row>

  <el-row v-if="selected == 'teacher'">
    <el-col>
      <el-card>
        <div style="margin: auto" align="center">
          请尽快与指导教师：
          <el-tag type="danger" effect="light">
            {{ user?.teacherName }}
          </el-tag>
          老师联系
        </div>
      </el-card>
    </el-col>
  </el-row>
  <teacherlist v-if="selected == 'list'" />
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
import { computed, defineAsyncComponent, ref, watch } from 'vue'
const teacherlist = defineAsyncComponent(
  () => import('@/views/student/SelectionList.vue')
)

const store = useStore()
let selected = ref('')
let user = computed(() => store.user)
watch(user, () => {
  if (user.value?.teacherName && user.value?.teacherName?.length > 0) {
    selected.value = 'teacher'
  } else {
    selected.value = 'list'
  }
})
</script>
