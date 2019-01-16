import React, {Component} from 'react'
import './header.less'
import {withRouter} from 'react-router-dom'


import {Row, Col, Modal} from 'antd'

import MemoryUtils from '../../utils/MemoryUtils'
import storageUtils from '../../utils/storageUtils'
import {getFormatedTime} from '../../utils'

class Header extends Component {

  state = {
    nowTime:''
  }


  logout = () => {
    Modal.confirm({
      content: '确认退出吗？',
      onOk: () => {
        MemoryUtils.user = {}
        storageUtils.removeUser()
        this.props.history.replace('./login')
      }
    })
  }

  getTime = () => {
    this.intevalId = setInterval(()=> {
      let nowTime = getFormatedTime()
      this.setState({
        nowTime
        }
      )
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.intevalId)
  }

  render() {
    this.getTime()
    const weatherUrl = ''
    const weatherDetails = 231


    const username = MemoryUtils.user.data.username


    return (
      <div className="header">
        <Row className='header-top'>
          <span>欢迎, {username} </span>
          <a href="##" onClick={this.logout}>登出</a>
        </Row>


        <Row className='breadcrumb'>
          <Col span = {8} className='breadcrumb-title'>
            title
          </Col>
          <Col span = {16} className='weather'>
            <span className="date">{this.state.nowTime}</span>
            <span className="weather-img">
              <img src={weatherUrl} alt="weather info"/>
            </span>
            <span className="weather-detail">
              {weatherDetails}
            </span>
          </Col>

        </Row>
      </div>


    )
  }
}

export default withRouter(Header)