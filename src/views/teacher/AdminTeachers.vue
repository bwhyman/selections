<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-table :data="teachers" style="width: 100%">
          <el-table-column label="#" type="index" />
          <el-table-column label="Name" prop="name" />
          <el-table-column label="Count">
            <template #default="scope">
              {{ count(scope.row) }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { User } from '@/types/type'
import { useStore } from '@/store'

const store = useStore()
store.listteachers()
let teachers = computed(() => store.teachers)
let count = computed(() => (u: User) => `${u.count}/${u.total}`)
</script>
