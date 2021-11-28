<template>
  <el-dialog v-model="showD" title="Reset Password" @close="close">
    <div style="margin-bottom: 15px">
      <el-input
        type="password"
        v-model="pwdM.p1"
        placeholder="password"
        :prefix-icon="Lock"
      />
      <el-input
        type="password"
        v-model="pwdM.p2"
        placeholder="re-enter"
        :prefix-icon="Lock"
      />
    </div>
    <el-button type="primary" @click="resetPwd">Reset</el-button>
  </el-dialog>
</template>
<script lang="ts" setup>
import { State } from '@/store'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Lock } from '@element-plus/icons'
const store = useStore<State>()
let pwdM = ref({ p1: '', p2: '' })

let showD = ref(true)

let resetPwd = () => {
  if (!(pwdM.value.p1 == pwdM.value.p2)) {
    store.state.exception = '2次输入密码不同'
    return
  }
  store.dispatch('resetpwd', pwdM.value.p1)
  pwdM.value.p1 = ''
  pwdM.value.p2 = ''
  store.state.showResetPassword = false
}
let close = () => {
  store.state.showResetPassword = false
}
</script>
