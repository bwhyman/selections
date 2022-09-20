<template>
  <!-- start time -->
  <el-row>
    <el-col :span="24">
      <el-card style="margin-bottom: 15px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-date-picker
              value-format="YYYY-MM-DDTHH:mm:ss"
              v-model="startTime"
              type="datetime"
              placeholder="Select date and time"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              :icon="Check"
              :disabled="!startTime"
              @click="addStartTime"
            ></el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
  <!-- read student excel -->
  <el-row>
    <el-col :span="24">
      <el-card style="margin-bottom: 15px">
        读取学生表格：
        <input type="file" @change="readStu" />
        <el-button
          type="success"
          :icon="Check"
          @click="addStudents"
          :disabled="students.length == 0"
        ></el-button>
        <br />
        {{ students[0] }} / {{ students?.length }}
      </el-card>
    </el-col>
  </el-row>
  <!-- read teacher excel -->
  <el-row>
    <el-col :span="24">
      <el-card style="margin-bottom: 15px">
        读取导师表格：
        <input type="file" @change="readTeacher" />
        <el-button
          type="success"
          :icon="Check"
          @click="addTeachers"
          :disabled="teachers.length == 0"
        ></el-button>
        <br />
        {{ teachers[0] }} / {{ teachers?.length }}
      </el-card>
    </el-col>
  </el-row>

  <unselected />
  <!-- add teacher -->
  <!-- <el-row>
    <el-col :span="24">
      <el-card style="margin-bottom: 15px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="user.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="user.number" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="user.total" placeholder="数量"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              :icon="Check"
              @click="addUser"
              :disabled="user.total == null"
            ></el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row> -->
  <el-row>
    <el-col :span="24">
      <el-card style="margin-bottom: 15px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="number" placeholder="账号重置密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              :icon="Check"
              @click="resetpassword"
              :disabled="number == null"
            ></el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

  <ts />
</template>
<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'
import { User } from '@/types/type'
import { State } from '@/store'
import { useStore } from 'vuex'
import { readStudentFile, readTeacherFile } from '@/utils/ExcelUtils'
import { Check } from '@element-plus/icons'
import ts from './AdminTeachers.vue'
const unselected = defineAsyncComponent(() => import('./Unselected.vue'))

const store = useStore<State>()
store.dispatch('checkadmin')
let students = ref<User[]>([])
let teachers = ref<User[]>([])
// add teacher
//let user = ref<User>({})
// let addUser = () => {
//   store.dispatch('addteacher', {
//     name: user.value.name,
//     number: user.value.number,
//     total: user.value.total,
//   } as User)
//   user.value = {}
// }
// read student excel
let readStu = (event: Event) => {
  const element = event.target as HTMLInputElement
  if (!element || !element.files) {
    return
  }
  readStudentFile(element.files[0]).then((sts: User[]) => {
    students.value = sts
  })
}
let addStudents = () => {
  store.dispatch('addstudents', students.value)
}

// read teacher excel
let readTeacher = (event: Event) => {
  const element = event.target as HTMLInputElement
  if (!element || !element.files) {
    return
  }
  readTeacherFile(element.files[0]).then((ts: User[]) => {
    teachers.value = ts
  })
}

let addTeachers = () => {
  store.dispatch('addteachers', teachers.value)
}
// set starttime
let startTime = ref<string>()
let addStartTime = () => {
  store.state.exception = '日期设置完成'
  let time = startTime.value
  store.dispatch('addstarttime', time)
  startTime.value = ''
}

let number = ref<string>()
let resetpassword = () => {
  let n = number.value
  store.dispatch('resetuserpassword', n)
  number.value = ''
}
</script>
