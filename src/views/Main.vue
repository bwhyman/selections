<template>
  <el-row>
    <el-col>
      <el-card :body-style="{ padding: '0px' }">
        <el-row align="middle">
          <el-col :span="6" :xs="24">
            <el-button
              type="danger"
              :icon="Setting"
              @click="showSetting = true"
            >
              {{ user?.name }}
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <router-view />
    </el-col>
  </el-row>

  <el-dialog v-model="showSetting" title="Setting" width="40%" center>
    <el-button
      type="danger"
      :icon="Lock"
      @click="shwoResetPassword"
    ></el-button>
    <br />
    <br />

    <el-button type="danger" :icon="Delete" @click="logout"></el-button>
  </el-dialog>
  <reset v-if="resetpassword" />
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
import { computed, defineAsyncComponent, ref } from 'vue'
import { Setting, Lock, Delete } from '@element-plus/icons'
const reset = defineAsyncComponent(() => import('./ResetPassword.vue'))
const store = useStore()

let resetpassword = computed(() => store.showResetPassword)

let user = computed(() => store.user)

store.getInfo()
let logout = () => {
  sessionStorage.clear()
  window.location.href = '/'
}

let showSetting = ref(false)
let shwoResetPassword = () => {
  showSetting.value = false
  store.showResetPassword = true
}
</script>
