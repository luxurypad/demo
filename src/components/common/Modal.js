import React, { useCallback, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    display: props => {
      return props.display
    },
    background: '#ccc',
    position: 'fixed',
    padding: '0.5rem 1rem 1rem 1rem',
    left: props => {
      return props.width / 2
    },
    top: props => {
      return props.height / 2
    },
    transform: 'translate(-50%,-50%)',
  }
})

export default ({ visible, onCancel, children }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [display, setDisplay] = useState('none')
  const classes = useStyles({ width, height, display })

  const handleResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  const handleClick = useCallback(() => {
    if (onCancel) {
      onCancel()
    }
  }, [onCancel])

  useEffect(() => {
    if (visible) {
      setDisplay('block')
      window.addEventListener('resize', handleResize)
      window.addEventListener('click', handleClick)
    } else {
      setDisplay('none')
    }
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleClick)
    }
  }, [visible, handleClick])

  return (
    <div className={classes.root} onClick={e => { e.stopPropagation() }}>
      {children}
    </div>
  )
}