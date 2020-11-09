import React, { memo, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    '&>h3': {

    },
    '&>form': {

    }
  }
})

const init = () => {
  return {
    name: '',
    class: '',
    school: '',
    star: '',
    age: '',
    date: ''
  }
}

const StudentForm = memo(function StudentForm({ title = '学生表单', studentData, onSubmit, onCancel }) {
  const classes = useStyles()
  const [student, setStudent] = useState(init)

  const handleChange = (e) => {
    setStudent(state => (
      {
        ...state,
        [e.target.name]: ['age', 'star'].some(v => v === e.target.name) ? Number(e.target.value) : e.target.value
      }
    ))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit(student)
    setStudent(init)
    if (onCancel) {
      onCancel()
    }
  }
  //注意这里可以能会造成死循环，如果给参数studentData一个对象类型的默认值（引用类型），当组件重渲染时，都会产生新的值（如果父组件未传值或值为undefined）
  useEffect(() => {
    if (studentData === undefined) {
      return
    }
    setStudent(studentData)
  }, [studentData])

  console.log(student)
  return (
    <div className={classes.root}>
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            姓名
          <input type='text' name='name' value={student.name} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            班级
          <input type='text' name='class' value={student.class} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            学校
          <input type='text' name='school' value={student.school} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            星级
           <select name='star' value={student.star} onChange={handleChange} required>
              <option value=''></option>
              <option value='1'>❤</option>
              <option value='2'>❤❤</option>
              <option value='3'>❤❤❤</option>
              <option value='4'>❤❤❤❤</option>
              <option value='5'>❤❤❤❤❤</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            年龄
            <input type='number' name='age' value={student.age} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            入学日期
            <input type='date' name='date' value={student.date} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <button type='submit' >确认</button>
          <button type='button' onClick={() => { setStudent(init) }}>重置</button>
        </div>
      </form>
    </div>
  )
})

export default StudentForm