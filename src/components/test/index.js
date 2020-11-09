import React, { } from 'react'
import { listToTree } from '../../utils/listToTree'
import mockjs from 'mockjs'

export default () => {
  console.log(mockjs.mock({
    date:'@date' 
  }))
  console.log(listToTree([]))
  return (
    <>
      测试页面
    </>
  )
}