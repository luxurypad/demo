import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    '& pre': {
      backgroundColor: '#ecf0f1',
      padding: '1rem',
      borderRadius: '.5rem'
    },
    '& code': {
      backgroundColor: '#ecf0f1',
    },
    '& blockquote': {
      backgroundColor: 'rgba(0,0,0,0.06)',
      marginLeft: '1rem',
      marginBottom: '.3rem',
      borderLeft: '.3rem solid #3498db'
    },
    '& p':{
      margin: '1rem 0',
    },
    '& ul':{
      paddingLeft: '2rem',
      listStyle: 'disc',
    },
    '& ol':{
      paddingLeft:'2rem',
      listStyle:'decimal'
    },
    '& h1,h2,h3,h4,h5,h6':{
      margin:'1rem 0'
    }
  }
})

export default () => {
  const [data, setData] = useState('')
  const classes = useStyles()
  useEffect(() => {
    fetch('http://localhost:5000/笔记.md', {
      method: 'GET'
    })
      .then(response => {
        return response.text()
      })
      .then(data => {
        setData(data)
      })
  }, [data])

  return (
    <div className={classes.root}>
      
      <ReactMarkdown plugins={[gfm]}>
        {data}
      </ReactMarkdown>
    </div>
  )
}