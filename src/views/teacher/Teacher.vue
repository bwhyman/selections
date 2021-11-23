<template>
  <!-- <el-row v-if="!(user?.total - user?.count == 0)">
    <el-col :span="24">
      <el-card style="margin-bottom: 15px">
        <p>
          如学生已与教师提前沟通，可录入学生信息。录入的学生无需使用系统选择。
        </p>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="student.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="student.number" placeholder="学号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              icon="el-icon-check"
              :disabled="!student.number && !student.name"
              @click="selectStudent"
            ></el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row> -->
  <unselected />
  <el-row>
    <el-col :span="24">
      <el-card>
        总数：
        <el-tag type="danger" effect="light">
          {{ user?.total }}
        </el-tag>
        ； 已选：
        <el-tag type="danger" effect="light">
          {{ user?.count }}
        </el-tag>
        <el-table :data="students" style="width: 100%">
          <el-table-column label="#" type="index" />
          <el-table-column label="Name" prop="name" />
          <el-table-column label="Time">
            <template #default="scope">
              {{ dateC(scope.row) }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { State } from '@/store'
import { User } from '@/types/type'
import { computed, ref, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
const unselected = defineAsyncComponent(() => import('./Unselected.vue'))
const store = useStore<State>()
store.dispatch('listteacherstudents')
let user = computed(() => store.state.user)
let students = computed(() => store.state.students)
let dateC = computed(() => (u: User) => u.selectTime?.replace('T', ' '))

let student = ref<User>({})
let selectStudent = () => {
  store.dispatch('selectstudent', {
    name: student.value.name,
    number: student.value.number,
  } as User)
  store.state.exception = '学生已录入'
  student.value = {}
}
</script>
