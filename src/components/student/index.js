import React, { useCallback, useEffect, useState } from 'react'
import httpRequest from '../../utils/httpRequest'
import Pagination from '../common/Pagination'
import StudentTable from './StudentTable'
import StudentCRUD from './StudentCRUD'

export default () => {
  const [query, setQuery] = useState({
    path: '/students',
    query: {
      _page: 1,
      _limit: 10
    },
    method: 'GET',
  })
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)

  //处理新增
  const handlePost = useCallback(
    async (student) => {
      await httpRequest({
        path: '/students',
        method: 'POST',
        body: student
      })
      setQuery(state => ({ ...state }))
    }
    , [])

  //处理编辑
  const handlePut = useCallback(
    async (student) => {
      await httpRequest({
        path: `/students/${student.id}`,
        method: 'PUT',
        body: student
      })
      setQuery(state => ({ ...state }))
    }
    , [])
  //处理删除
  const handleDelete = useCallback(
    async (id) => {
      await httpRequest({
        path: `/students/${id}`,
        method: 'DELETE',
      })
      setQuery(state => ({ ...state }))
    }
    , [])

  //处理翻页
  const handlePageChange = useCallback((current, limit) => {
    setQuery(state => (
      {
        ...state,
        query: {
          ...state.query,
          _page: current,
          _limit: limit
        }
      }
    ))

  }, [])

  //处理查询
  const handleQuery = useCallback((filter) => {
    const queryParm = {}

    Object.entries(filter).forEach(item => {
      if (item[1].value !== '') {
        switch (item[1].operator) {
          case '=':
            queryParm[item[0]] = item[1].value
            break;
          case '_like':
            queryParm[item[0] + '_like'] = item[1].value
            break;
          case '_gte':
            queryParm[item[0] + '_gte'] = item[1].value
            break;
          case '_lte':
            queryParm[item[0] + '_lte'] = item[1].value
            break;
          default:
            break;
        }
      }
    })

    setQuery(state => (
      {
        ...state,
        query: {
          ...queryParm,
          _page: state.query._page,
          _limit: state.query._limit,
          _sort: state.query._sort,
          _order: state.query._order
        }
      }
    ))
  }, [])

  //处理排序
  const handleSort = useCallback((sortParm) => {
    setQuery(state => (
      {
        ...state,
        query: {
          ...state.query,
          _sort: sortParm.sort ? sortParm.sort : undefined,
          _order: sortParm.order ? sortParm.order : undefined
        }
      }
    ))
  }, [])

  useEffect(() => {
    (async () => {
      const { data, totalCount } = await httpRequest(query)
      setData(data)
      setCount(Number(totalCount))
    })()
  }, [query])

  return (
    <>
      <StudentCRUD onPost={handlePost} onSubmit={handleQuery} />
      <StudentTable tableData={data} onDelete={handleDelete} onPut={handlePut} onSort={handleSort} />
      <Pagination total={count} onChange={handlePageChange} />
    </>
  )
}