<template>
  <el-row>
    <el-col>
      <el-card>
        <el-row>
          <el-table :data="teachers">
            <el-table-column label="#" type="index" align="center" />
            <el-table-column label="Operations" align="center">
              <template #default="scope">
                <el-button
                  :type="scope.row.total > scope.row.count ? 'success' : 'info'"
                  style="padding-top: 5px; padding-bottom: 5px"
                  round
                  :disabled="!(scope.row.total > scope.row.count)"
                  @click="select(scope.row)"
                >
                  <span
                    style="
                      margin: 5px 25px;
                      display: inline-block;
                      font-size: 1.2em;
                    "
                  >
                    {{ scope.row.name }}
                  </span>
                  <br />
                  <span>{{ `${scope.row.count}/${scope.row.total}` }}</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog v-model="centerDialogVisible" title="Warning" width="40%" center>
    <span>
      您选择了
      <el-tag type="danger" effect="light" style="margin: 0 5px">
        {{ selectTeacher.name }}
      </el-tag>
      老师
      <br />
      确定后将不可更改
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { User } from '@/types/type'
import { computed, ref } from 'vue'
import { useStore } from '@/store'

const store = useStore()
store.listteachers()
let centerDialogVisible = ref(false)
let teachers = computed(() => store.teachers)
let selectTeacher = ref<User>({})

let select = (user: User) => {
  centerDialogVisible.value = true
  selectTeacher.value = user
}

let confirm = () => {
  centerDialogVisible.value = false
  selectTeacher.value.id && store.selection(selectTeacher.value.id)
}
</script>
