import { User } from '@/types/type'
import XLSX from 'xlsx'

export function readStudentFile(file: Blob) {
  return new Promise<User[]>((resolve) => {
    const reader = new FileReader()
    const students: User[] = []
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result
      const wb = XLSX.read(data, { type: 'binary' })
      const sheet = wb.Sheets[wb.SheetNames[0]]
      XLSX.utils.sheet_to_json(sheet, { header: 1 }).forEach((r: any) => {
        const n = parseInt(r[0])
        if (!isNaN(n)) {
          students.push({ name: r[2], number: r[1].toString() })
        }
      })
    }
    reader.onloadend = () => {
      resolve(students)
    }
    reader.readAsBinaryString(file)
  })
}

export function readTeacherFile(file: Blob) {
  return new Promise<User[]>((resolve) => {
    const reader = new FileReader()
    const teachers: User[] = []
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result
      const wb = XLSX.read(data, { type: 'binary' })
      const sheet = wb.Sheets[wb.SheetNames[0]]
      XLSX.utils.sheet_to_json(sheet, { header: 1 }).forEach((r: any) => {
        const n = parseInt(r[0])
        if (!isNaN(n)) {
          teachers.push({
            number: r[1].toString(),
            name: r[2],
            total: r[3].toString(),
          })
        }
      })
    }
    reader.onloadend = () => {
      resolve(teachers)
    }
    reader.readAsBinaryString(file)
  })
}

export function exportExcelFile(
  array: any[],
  sheetName = 'students',
  fileName = '学生表格.xlsx'
) {
  const jsonWorkSheet = XLSX.utils.json_to_sheet(array)
  const workBook: XLSX.WorkBook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: jsonWorkSheet,
    },
  }
  return XLSX.writeFile(workBook, fileName)
}
