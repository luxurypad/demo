import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import CssBaseline from './components/common/CssBaseline'
import Student from './components/student'
import Test from './components/test'

export default () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <nav>
          <Link to='/xuexi'>学习</Link>
          <Link to='/test'>测试</Link>
        </nav>
        <Switch>
          <Route exact path='/xuexi'>
            <Student />
          </Route>
          <Route exact path='/test'>
            <Test />
          </Route>
          <Route>
            默认页面
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}