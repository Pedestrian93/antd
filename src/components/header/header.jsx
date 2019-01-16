import React, {Component} from 'react'
import './header.less'
import {withRouter} from 'react-router-dom'


import {Row, Col, Modal} from 'antd'
import menuList from '../../configs/menuConfig'
import MemoryUtils from '../../utils/MemoryUtils'
import storageUtils from '../../utils/storageUtils'
import {getFormatedTime} from '../../utils'

class Header extends Component {

  state = {
    nowTime:'',
    weatherPicUrl: 'https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png',
    weatherStatus: '多云',
    path: '',
    currentMenuName: ''
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
      let a = new Date().getTime()
      let nowTime = getFormatedTime(a)
      this.setState({
        nowTime
        }
      )
    }, 1000)
  }

  getWeatherPicUrl = () => {

  }

  getWeatherStatus = () => {

  }

  getCurrentPath = () => {
    this.state.path = this.props.location.pathname
  }

  getCurrentMenuName = (path) => {
    let currentMenuName
    for (let i = 0; i < menuList.length; i++) {
      let item = menuList[i]
      if (item.key == path) {
        currentMenuName = menuList[i].title
        break
      }
      else if (item.children) {
        for (let j = 0; j < item.children.length; j++) {
          let item2 = menuList[j]
          if (item2.key == path) {
            currentMenuName = menuList[i].title
            break
          }
        }
      }
    }
    this.state.currentMenuName = currentMenuName
  }

  componentWillUnmount () {
    clearInterval(this.intevalId)
  }

  componentDidMount() {
    this.getTime()

    this.getCurrentPath()

    this.getCurrentMenuName(this.state.path)

  }

  render() {

    // const username = MemoryUtils.user.data.username
    // const path = this.props.location.pathname
    // const menuName = this.getMenuName(path)
    // console.log(this.state.path)

    return (
      <div className="header">
        <Row className='header-top'>
          <span>欢迎, {this.state.path} </span>
          <a href="##" onClick={this.logout}>登出</a>
        </Row>


        <Row className='breadcrumb'>
          <Col span = {8} className='breadcrumb-title'>
            {this.state.currentMenuName}
          </Col>
          <Col span = {16} className='weather'>
            <span className="date">{this.state.nowTime}</span>
            &nbsp; &nbsp;
            <span className="weather-img">
              <img className="weather-pic" src={this.state.weatherPicUrl} alt="weather info"/>
            </span>&nbsp;
            <span className="weather-detail">
              {this.state.weatherStatus}
            </span>
          </Col>

        </Row>
      </div>


    )
  }
}

export default withRouter(Header)