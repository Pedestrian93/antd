import React, {Component} from 'react'
import {Form, Input, Button, Icon} from 'antd'
import PropTypes from 'prop-types'
import MemoryUtils from '../../utils/MemoryUtils'

import logo from '../../assets/images/logo.png'
import './index.less'
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils'


export default class Login extends Component {

  login = async (username, password) => {
    const user = await reqLogin(username, password)
    if (user.status === 0) {
      //save the data
      storageUtils.saveUser(user)
      MemoryUtils.user = user

      this.props.history.replace('/')
    }

    else if (user.status === 1) {

    }
  }

  render() {
    return (
      <div className='login'>
        <div className="login-header">
          <img src={logo} alt="硅谷后台管理系统"/>
          React项目: 后台管理系统
        </div>
        <div className="login-content">
          <div className="login-box">
            <div className="title">用户登陆</div>
            <LoginForm login = {this.login}/>
          </div>
        </div>
      </div>
    )

  }
}

class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
     e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {

        this.props.login(values.username, values.password)
      }
      else {
        this.props.form.resetFields()
      }
    })
  }

  validator (rule,value,callback) {
  if(!value) {
    callback('请输入用户名')
  }
  else if (value.length < 4) {
    callback('用户名长度不得小于4')
  }
  else if (value.length > 8) {
    callback('用户名长度不得大于8')
  }
  else {
    callback()
  }
  }

    render () {

    const {getFieldDecorator} = this.props.form

    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {validator: this.validator},
            ],

            initialValue:'admin'
          })(
            <Input placeholder="用户名" prefix={<Icon type="user"/>}/>
          )}

        </Form.Item>


        <Form.Item>

          {getFieldDecorator('password', {
            rules: [
              {required: true, message: 'Please input your password!'},
              {min:4, message: '密码长度不得小于4位'},
              {max:10, message: '密码长度不得大于10位'}
            ],
            whitespace:true
          })(
            <Input type="password" placeholder="密码" prefix={<Icon type="safety"/>}/>
          )}

        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

LoginForm = Form.create({})(LoginForm);


