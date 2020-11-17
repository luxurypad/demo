import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*,*::before,*::after': {
      boxSizing: 'inherit',
    },
    '*': {
      margin: 0,
      padding: 0
    },
    'ul,ol':{
      listStyle: 'none',
    }
  }
})

export default () => {
  useStyles()
  return (
    <>
    </>
  )
}