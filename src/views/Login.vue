<template>
  <el-col :span="12" :offset="6" style="margin-top: 15px">
    <el-card class="box-card">
      <div style="margin-bottom: 15px">
        <el-input
          v-model="user.number"
          placeholder="账号"
          :prefix-icon="UserIco"
        />
        <el-input
          type="password"
          v-model="user.password"
          placeholder="密码"
          :prefix-icon="Lock"
        />
      </div>
      <el-button type="primary" @click="login">Login</el-button>
    </el-card>
  </el-col>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { User } from '@/types/type'
import { useStore } from '@/store'
import { Lock, User as UserIco } from '@element-plus/icons'

const store = useStore()
let user = ref<User>({})

let login = () => {
  let number = user.value.number
  let password = user.value.password
  if (number == password) {
    store.showResetPassword = true
  }
  store.login({
    number: number,
    password: password,
  })
  user.value.number = ''
  user.value.password = ''
}
</script>
