import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import StudentForm from './StudentForm'
import Modal from '../common/Modal'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '&>table': {
      flexGrow: 1,
      borderCollapse: 'collapse',
      fontSize: '1.5rem',
      '& td,th': {
        border: '1px solid'
      },
      '&>tbody>tr': {
        '&::after': {
          content: '""',
        }
      },
    }
  },
  sort: {
    '&::after': {
      content: props => {
        switch (props.sortState.order) {
          case '':
            return '""'
          case 'asc':
            return '"▲"'
          case 'desc':
            return '"▼"'
          default:
            throw new Error()
        }
      }
    }
  },
  menu: {
    position: 'fixed',
    left: (props) => {
      return props.menuLocation.left
    },
    top: (props) => {
      return props.menuLocation.top
    },
    display: (props) => {
      return props.menuLocation.display
    },
    '& button': {
      fontSize: '1rem',
      padding: '.2rem .5rem',
    }
  },
  contextMenu: {
    display: 'none',
    position: 'fixed',
    background: '#DCDCDC',
    '&>ul>li': {
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      fontSize: '.8rem',
      border: '1px solid',
    }
  },
  contextMenuShow: {

    left: (props) => {
      return props.menuLocation.left
    },
    top: (props) => {
      return props.menuLocation.top
    },
    display: (props) => {
      return props.menuLocation.display
    },
  },
})

function reducer(state, action) {
  //如果排序名称相同，则变化顺序
  if (action.sort === state.sort) {
    switch (state.order) {
      case '':
        return {
          sort: action.sort,
          order: 'asc'
        }
      case 'asc': {
        return {
          sort: action.sort,
          order: 'desc'
        }
      }
      case 'desc': {
        return {
          sort: '',
          order: ''
        }
      }
      default:
        throw new Error()
    }
    //如果排序名称相同，则按照首次升序排序
  } else {
    return {
      sort: action.sort,
      order: action.order
    }
  }


}


export default ({ tableData = [], onDelete, onPut, onSort }) => {
  const [selectStudent, setSelectStudent] = useState(
    {
      id: 0,
      name: '',
      class: '',
      school: '',
      star: 0,
      age: 0,
      date: ''
    }
  )
  const [visible, setVisible] = useState(false)
  const [menuLocation, setMenuLocation] = useState({ left: 0, top: 0, display: 'none' })
  const [sortState, sortDispath] = useReducer(reducer, { sort: '', order: '' })
  const initRef = useRef(true)

  const classes = useStyles({ menuLocation, sortState })

  const handlePut = (item) => {
    setMenuLocation({ left: 0, top: 0, display: 'none' })
    setSelectStudent(item)
    // setShowModal(true)
    setVisible(true)
  }
  const handleDelete = (item) => {
    setMenuLocation({ left: 0, top: 0, display: 'none' })
    onDelete(item.id)
  }

  const handleCancel = useCallback(() => {
    setVisible(false)
  }, [])

  const handleRightClick = (e, item) => {
    //右键事件处理
    if (e.button === 2) {
      //添加点击菜单以外区域关闭菜单
      document.onclick = () => {
        setMenuLocation({ left: 0, top: 0, display: 'none' })

      }
      //显示菜单

      setSelectStudent(item)
      setMenuLocation({ left: e.clientX, top: e.clientY, display: 'block' })
    }
  }

  const handleSort = (sort, order) => {
    sortDispath({ sort: sort, order: order })
  }
  useEffect(() => {
    if (initRef.current === true) {
      initRef.current = false
    } else {
      onSort(sortState)
    }
  }, [sortState, onSort])

  return (
    <div className={classes.root}>
      <table >
        <caption>
          学生表
      </caption>
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>班级</th>
            <th>学校</th>
            <th className={sortState.sort === 'star' ? classes.sort : undefined} onClick={() => { handleSort('star', 'asc') }}>星级</th>
            <th className={sortState.sort === 'age' ? classes.sort : undefined} onClick={() => { handleSort('age', 'asc') }}>年龄</th>
            <th className={sortState.sort === 'date' ? classes.sort : undefined} onClick={() => { handleSort('date', 'asc') }}>出生年月</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData.map(item => (
              <tr key={item.id} onMouseDown={(e) => { handleRightClick(e, item) }} onContextMenu={e => { e.preventDefault() }}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.class}</td>
                <td>{item.school}</td>
                <td>{Array.from(new Array(item.star), () => '♥').join('')}</td>
                <td>{item.age}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={() => { handlePut({ ...item }) }} >编辑</button>
                  <button onClick={() => { handleDelete({ ...item }) }} >删除</button>
                  <div className={classes.contextMenu + ' ' + (selectStudent.id === item.id ? classes.contextMenuShow : '')} onClick={e => { e.stopPropagation() }}>
                    <ul>
                      <li>
                        <div onClick={() => { handlePut({ ...item }) }}>编辑</div>
                      </li>
                      <li>
                        <div onClick={() => { handleDelete({ ...item }) }} >删除</div>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
        </tfoot>
      </table>
      <Modal visible={visible} onCancel={handleCancel}>
        <StudentForm title={'编辑学生'} studentData={selectStudent} onSubmit={onPut} onCancel={handleCancel} />
      </Modal>
    </div >
  )
}