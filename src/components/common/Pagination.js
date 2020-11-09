import React, { useState, useEffect, memo, useRef } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '&>li': {
      width: '1.5rem',
      height: '1.5rem',
      margin: '0.3rem',
      '&>div': {
        width: '100%',
        height: '100%',
        borderRadius: '0.2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '&:last-child': {
        width: 'auto',
        '&>select': {
          height: '100%',
          border: '1px solid #fff',
          outline: 'none',
          borderRadius: '0.2rem',
        }
      },
      '&>div:hover,select:hover': {
        border: '1px solid #3498db !important',
        cursor: 'pointer',
      }
    },

  },
  pageSelected: {
    background: '#3498db '
  },
})

function createPages(totalPages, current, PAGE_BLOCK = 9, BOUNDARY_INDENT = 2) {
  //页码块数 PAGE_BLOCK = 9
  //首位边界（首尾、省略号）BOUNDARY_INDENT = 2

  //当前页边界
  const CURRENT_INDENT = (PAGE_BLOCK - BOUNDARY_INDENT * 2 - 1) / 2

  if (totalPages <= PAGE_BLOCK) {
    //没有省略号
    return Array.from(new Array(totalPages), (v, i) => i + 1)
  } else if (current - BOUNDARY_INDENT - CURRENT_INDENT <= 1) {
    //右边的省略号，条件为current在首位边界+当前页边界内
    return [
      ...Array.from(new Array(PAGE_BLOCK - BOUNDARY_INDENT), (v, i) => i + 1),
      ...Array.from(new Array(BOUNDARY_INDENT), (v, i) => i === 0 ? '...' : i + totalPages - BOUNDARY_INDENT + 1)
    ]
  } else if (current + BOUNDARY_INDENT + CURRENT_INDENT >= totalPages) {
    //左边的省略号，条件为 current+当前页边界+尾部边界大于总页数
    return [
      ...Array.from(new Array(BOUNDARY_INDENT), (v, i) => i === BOUNDARY_INDENT - 1 ? '...' : i + 1),
      ...Array.from(new Array(PAGE_BLOCK - BOUNDARY_INDENT), (v, i) => i + totalPages - BOUNDARY_INDENT + 1 - CURRENT_INDENT * 2 - 1)
    ]
  } else {
    return [
      ...Array.from(new Array(BOUNDARY_INDENT), (v, i) => i === BOUNDARY_INDENT - 1 ? '...' : i + 1),
      ...Array.from(new Array(PAGE_BLOCK - BOUNDARY_INDENT * 2), (v, i) => i + current - CURRENT_INDENT),
      ...Array.from(new Array(BOUNDARY_INDENT), (v, i) => i === 0 ? '...' : i + totalPages - BOUNDARY_INDENT + 1)
    ]
  }
}

const Pagination = memo(function Pagination({ total, onChange, defaultCurrent, defaultLimit }) {
  const classes = useStyles()
  const [current, setCurrent] = useState(defaultCurrent || 1)
  const [limit, setLimit] = useState(defaultLimit || 10)
  //用来判断是否初次渲染
  const initRef = useRef(true)

  //计算总页数
  const totalPages = Math.ceil(total / limit)

  //处理当前页状态
  const handleCurrentClick = (current) => {
    setCurrent(current)
  }

  const handleLimitChange = e => {
    //如果当前页大于总页数，则跳转至最后一页(每页数量变化导致)
    if (current > Math.ceil(total / Number(e.target.value))) {
      setLimit(Number(e.target.value))
      setCurrent(Math.ceil(total / Number(e.target.value)))
    } else {
      setLimit(Number(e.target.value))
    }
  }

  console.log('分页组件render')

  //如果当前页大于总页数，则跳转至最后一页（总页数发生变化导致）
  useEffect(() => {
    if (current > totalPages && totalPages !== 0) {
      setCurrent(totalPages)
    }
  }, [totalPages, current])

  useEffect(() => {
    if (initRef.current === true) {
      //首次渲染时不触发onChange
      initRef.current = false
    } else {
      onChange(current, limit)
    }
  }, [current, limit, onChange])

  return (
    <ul className={classes.root} >
      {
        createPages(totalPages, current).map((v, i) => {
          return (
            typeof v === 'number'
              ?
              <li key={i}>
                <div
                  className={current === v ? classes.pageSelected : null}
                  onClick={() => { handleCurrentClick(v) }}>
                  {v}
                </div>
              </li>
              :
              <li key={i}>
                <div>...</div>
              </li>
          )
        })
      }
      <li>
        <select onChange={handleLimitChange} value={limit}>
          <option value='10'>10条/页</option>
          <option value='20'>20条/页</option>
          <option value='50'>50条/页</option>
          <option value='100'>100条/页</option>
        </select>
      </li>
    </ul>
  )
})

export default Pagination