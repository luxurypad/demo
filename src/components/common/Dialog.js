import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    margin: 'auto',
    padding: '0.5rem 1rem 1rem 1rem',
    border: 'none',
    boxShadow: '0 0 0.5rem lightgray ',
    '&>div:first-child': {
      textAlign: 'right',
      '&>button': {
        background: '#fff',
        border: 0,
        outline: 0,
        cursor: 'pointer',
        fontSize: '1rem',
      }
    }
  }
})

export default ({ showModal = false, setShowModal, children }) => {
  const classes = useStyles()
  const dialogRef = useRef()
  

  useEffect(() => {
    if (showModal) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [showModal])

  return (
    <dialog className={classes.root} ref={dialogRef}>
      <div>
        <button onClick={() => { setShowModal(false) }}>
          <i className={'fa fa-close'}></i>
        </button>
      </div>
      {children}
    </dialog>
  )
}