import React, { useCallback, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Modal from '../common/Modal'
import StudentForm from './StudentForm'
const useStyles = createUseStyles({
  root: {
    '&>form': {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      '&>div': {
        margin: '0.5rem',
        display:'flex', 
        whiteSpace: 'nowrap',
      },
      '& input[name="age"]': {
        width: '5rem',
      },
      '& button': {
        padding: '0.5rem 1rem'
      }
    },
  }
})

const init = () => {
  return {
    name: { value: '', operator: '' },
    school: { value: '', operator: '' },
    class: { value: '', operator: '' },
    star: { value: '', operator: '' },
    age: { value: '', operator: '_gte' },
  }
}

export default ({ onPost, onSubmit }) => {
  const [filter, setFilter] = useState(init)
  const classes = useStyles()
  const [visible, setVisible] = useState(false)


  const handleClick = () => {
    setVisible(true)
  }
  const handleCancel = useCallback(() => {
    setVisible(false)
  }, [])

  const handleChange = (e, operator) => {
    setFilter(state => (
      {
        ...state,
        [e.target.name]: { operator: operator ? operator : state[e.target.name]['operator'], value: e.target.value }
      }
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(filter)
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} >

        <div>
          <label>学校</label>
          <select name='school' value={filter.school.value} onChange={e => { handleChange(e, '=') }} >
            <option value=''>全部</option>
            <option >高新一中</option>
            <option >高新二中</option>
          </select>
        </div>
        <div>
          <label>班级</label>
          <select name='class' value={filter.class.value} onChange={e => { handleChange(e, '=') }}>
            <option value=''>全部</option>
            <option >三年一班</option>
            <option >三年二班</option>
          </select>
        </div>
        <div>
          <label>星级</label>
          <select name='star' value={filter.star.value} onChange={e => { handleChange(e, '=') }} >
            <option value='' >全部</option>
            <option value='1' >❤</option>
            <option value='2' >❤❤</option>
            <option value='3' >❤❤❤</option>
            <option value='4' >❤❤❤❤</option>
            <option value='5' >❤❤❤❤❤</option>
          </select>
        </div>
        <div>
          <label>年龄</label>
          <select value={filter.age.operator} onChange={(e) => {
            setFilter(state => {
              return {
                ...state,
                age: {
                  ...state.age,
                  operator: e.target.value
                }
              }
            })
          }}>
            <option value='_gte'>大于等于</option>
            <option value='_lte'>小于等于</option>
          </select>
          <input type='number' name='age' size='4' value={filter.age.value} onChange={e => { handleChange(e) }} />
        </div>
        <div>
          <label>姓名</label>
          <input type='search' name='name' value={filter.name.value} onChange={e => { handleChange(e, '_like') }} />
        </div>

        <div>
          <button type='button' onClick={() => { setFilter(init) }}>重置</button>
          <button type='submit'>查询</button>
          <button type='button' onClick={handleClick} >新增</button>
        </div>
      </form>
      <Modal visible={visible} onCancel={handleCancel}>
        <StudentForm title={'新增学生'} onSubmit={onPost} onCancel={handleCancel} />
      </Modal>
    </div>
  )
}