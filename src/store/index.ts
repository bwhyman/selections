import axios from '@/axios'
import { ResultVO, User } from '@/types/type'
import * as consty from '@/types/Const'
import router from '@/router'
import { defineStore } from 'pinia'

export const useStore = defineStore('state', {
  state: () => ({
    exception: '',
    user: {} as User,
    showResetPassword: false,
    teachers: [] as User[],
    students: [] as User[],
    unSelectedStudents: [] as User[],
    startTime: '',
  }),
  actions: {
    async login(data: User) {
      const resp = await axios.post('login', data)
      const token = resp.headers.token
      const role = resp.headers.role
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('role', role)

      switch (role) {
        case consty.STUDENT:
          router.push('/student/selections')
          break
        case consty.TEACHER:
          router.push('/teacher/students')
          break
        case consty.ADMIN:
          router.push('/admin')
          break
      }
    },

    async getInfo() {
      const resp = await axios.get<ResultVO>('info')
      this.user = resp.data.data.user
      this.startTime = resp.data.data.starttime
    },

    async checkadmin() {
      await axios.get('admin/checkadmin')
    },

    async resetpwd(data: string) {
      await axios.put(`password/${data}`)
      this.showResetPassword = false
    },

    async listteachers() {
      const resp = await axios.get('teachers')
      this.teachers = resp.data.data.teachers
    },

    async resetuserpwd(tid: string) {
      await axios.put(`admin/password/${tid}`)
      this.exception = '重置用户密码'
    },

    async selection(tid: string) {
      await axios
        .put<ResultVO>(`teachers/${tid}`)
        .then((resp) => {
          this.user = resp.data.data.user
        })
        .catch(() => {
          this.listteachers()
        })
    },

    async listteacherstudents() {
      const resp = await axios.get<ResultVO>(`teacher/students`)
      this.students = resp.data.data.students
    },

    async addstudents(students: User[]) {
      await axios.post<ResultVO>('admin/students', students)
    },

    async addteachers(teachers: User[]) {
      const resp = await axios.post<ResultVO>('admin/teachers', teachers)
      this.teachers = resp.data.data.teachers
    },

    async listunselected() {
      const resp = await axios.get<ResultVO>('teacher/unselected')
      this.unSelectedStudents = resp.data.data.students
    },

    async addstarttime(time: string) {
      const resp = await axios.put<ResultVO>(`admin/starttime/${time}`)
      this.startTime = resp.data.data.time
    },

    async resetuserpassword(number: string) {
      await axios.put<ResultVO>(`admin/password/${number}`)
      this.exception = '重置用户密码'
    },

    async allstudents() {
      const resp = await axios.get<ResultVO>('teacher/allstudents')
      return Promise.resolve(resp.data.data.students)
    },
  },
})
