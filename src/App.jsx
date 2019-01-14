import React, {Component} from 'react'
import {Button, message} from 'antd'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'


export default class App extends Component {
  handleClick = () => {
    message.info('点了')
  }

  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>
    )
  }
}











