import axios from '@/axios'
import { ResultVO, User } from '@/types/type'
import { MutationTree, ActionTree, createStore } from 'vuex'
import * as consty from '@/types/Const'
import router from '@/router'

export interface State {
  exception?: string
  user?: User | null
  showResetPassword: boolean
  teachers?: User[]
  students?: User[]
  unSelectedStudents?: User[]
  startTime?: string
}
const myState: State = {
  exception: '',
  showResetPassword: false,
}

const myMutations: MutationTree<State> = {
  serteachers: (state, data: User[]) => (state.teachers = data),
}

const myActions: ActionTree<State, State> = {
  login: async ({ state }, data: User) => {
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
  getInfo: async ({ state }) => {
    let url = ''
    const role = sessionStorage.getItem('role')
    switch (role) {
      case consty.STUDENT:
        url = 'info'
        break
      case consty.TEACHER:
        url = 'info'
        break
      case consty.ADMIN:
        url = 'info'
        break
    }
    const resp = await axios.get<ResultVO>(url)
    state.user = resp.data.data.user
    state.startTime = resp.data.data.starttime
  },
  checkadmin: async ({ state }) => {
    await axios.get('admin/checkadmin')
  },
  resetpwd: async ({ state }, data) => {
    const resp = await axios.put(`password/${data}`)
    state.showResetPassword = false
  },

  listteachers: async ({ state }) => {
    const resp = await axios.get('teachers')
    state.teachers = resp.data.data.teachers
  },
  resetuserpwd: async ({ state }, tid) => {
    const resp = await axios.put(`admin/password/${tid}`)
    state.exception = '重置用户密码'
  },

  addteacher: async ({ commit, state }, user: User) => {
    const resp = await axios.post<ResultVO>('admin/teachers', user)

    commit('serteachers', resp.data.data.teachers)
    state.teachers = resp.data.data.teachers
  },
  selection: async ({ state, dispatch }, tid: string) => {
    await axios
      .put<ResultVO>(`teachers/${tid}`)
      .then((resp) => {
        state.user = resp.data.data.user
      })
      .catch((e) => {
        dispatch('listteachers')
      })
  },

  listteacherstudents: async ({ state }) => {
    const resp = await axios.get<ResultVO>(`teacher/students`)
    state.students = resp.data.data.students
  },

  // 教师添加内定学生，已取消
  // selectstudent: async ({ state }, student: User) => {
  //   const resp = await axios.post<ResultVO>("/teacher/students", student);
  //   state.students = resp.data.data.students;
  //   state.user = resp.data.data.teacher;
  // },

  addstudents: async ({ state }, students: User[]) => {
    const resp = await axios.post<ResultVO>('admin/students', students)
  },

  listunselected: async ({ state }) => {
    const resp = await axios.get<ResultVO>('teacher/unselected')
    state.unSelectedStudents = resp.data.data.students
  },
  addstarttime: async ({ state }, time: string) => {
    const resp = await axios.put<ResultVO>(`admin/starttime/${time}`)
    state.startTime = resp.data.data.time
  },
  resetuserpassword: async ({ state }, number: string) => {
    const resp = await axios.put<ResultVO>(`admin/password/${number}`)
    state.exception = '重置用户密码'
  },
  allstudents: async () => {
    const resp = await axios.get<ResultVO>('teacher/allstudents')
    return Promise.resolve(resp.data.data.students)
  },
}
export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {},
})
