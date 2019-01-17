import React, {Component} from 'react'
import {Redirect,Switch, Route,} from 'react-router-dom'
import {Row, Col, Menu, Icon} from 'antd'

import MemoryUtils from '../../utils/MemoryUtils'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import LeftNav from '../left-nav/left-nav.jsx'

import Home from '../home/index'
import Category from '../category'


import './admin.less'

// import Form from "antd/lib/form/Form.d"

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


export default class Admin extends Component {

  render() {

    //validate the authenticity
    const user = MemoryUtils.user
    if (!user) {
      return <Redirect to="/login"/>
    }




    return (

      <Row className="container">

        <Col span = {4}>
          <LeftNav/>
        </Col>

        <Col span = {20} className='main'>
          <Header/>
          <div className="content">
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>

              <Redirect to='/home'/>
            </Switch>

          </div>
          <Footer/>
        </Col>

      </Row>


    )
  }
}

