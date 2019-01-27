import React, {Component} from 'react'

import {
  Card,
  Button,
  Table,
  Form,
  Input,
  Select,
  Tree,

  message,
  Modal,
} from 'antd'

import menuConfig from '../../configs/menuConfig'
import MemoryUtils from '../../utils/MemoryUtils'
import PropTypes from 'prop-types'
import {getFormatedTime} from '../../utils/index'
import {reqRoles, reqAddRole, reqAuthorizeRoles} from '../../api/index'

const TreeNode = Tree.TreeNode


export default class Role extends Component {

  state = {
    role: {}, //当前选中的角色
    roles: [],
    menus: [],
    rolesCopy:[],
    showCreateRole: false,
    showAuthorize: false
  }

  //得到角色列表
  getRoles = async () => {
    const result = await reqRoles()
    result.status === 0 &&
      this.setState({
        roles: result.data
      })
  }

  //显示创建角色弹窗
  showCreateRole = () => {
    this.setState({
      showCreateRole: true
    })
  }

  //创建角色
  createRole = async () => {

    const roleName = this.form1.getFieldValue('roleName')
    const result = await reqAddRole(roleName)
    result.status === 0 &&
      message.success('创建角色成功！')
      this.setState({
        showCreateRole: false
      })
      this.getRoles()
  }

  //显示设置角色权限
  showSetAuthority = () => {
    this.setState ({
      showAuthorize: true
    })
  }

  //设置角色权限
  setAuthority = async() => {
    const {role, menus} = this.state
    role.menus = menus
    role.auth_name = MemoryUtils.user.name || 'admin'

    const result = await reqAuthorizeRoles(role)
    result.status === 0 &&
      this.getRoles()

    this.setState ({
      showAuthorize: false,
    })

  }
  //初始化列参数
  initColumns = () => [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: getFormatedTime
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: getFormatedTime
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    }
  ]

  //初始化行选择框
  handleSelectChange = (selectedRowKeys, selectedRows) => {
    const role = selectedRows[0]
    console.log(role)
    this.setState({
      role,

    })

  }

  //点击行选中
  onRow = (role) => {
    return {
      onClick: (event) => {
        this.setState({
          role,

        })
      }
    }
  }

  //设置menus
  setRoleMenus = (menus) => {
    this.setState({menus})
  }


  componentDidMount () {
    this.getRoles()
  }

  render() {

    const {showCreateRole, showAuthorize, role, menus} = this.state

    const rowSelection = {
      type: 'radio',
      onChange: this.handleSelectChange,
      selectedRowKeys: [role._id]
    }

    return (
      <div>
        {/*头部卡片*/}
        <Card>
          <Button  type = 'primary' onClick={this.showCreateRole}>创建角色</Button>
          &nbsp;&nbsp;&nbsp;
          <Button  type = 'primary' disabled = {!role._id} onClick={this.showSetAuthority}>设置角色权限</Button>
        </Card>

        {/*表格主体*/}
        <Table
          columns={this.initColumns()}
          dataSource={this.state.roles}
          rowSelection={rowSelection}
          rowKey="_id"
          onRow = {this.onRow}
        />

        {/*创建角色弹窗*/}
        <Modal
          title='创建角色'
          visible={showCreateRole}
          onCancel={() => {
            this.setState({showCreateRole: false})
            this.form1.resetFields()
          }}
          onOk={this.createRole}
        >
          <AddRoleForm
            setAddForm = {form => {this.form1 = form}}
          />

        </Modal>

        {/*设置角色权限弹窗*/}
        <Modal
          title='权限设置'
          visible={showAuthorize}
          onCancel={() => {
            this.setState({showAuthorize: false})
            this.authForm.resetFields()
          }}
          onOk={this.setAuthority}
        >

          <AuthorizeForm
            setAuthorizeForm ={(form)=> this.authForm = form}
            role = {role}
            menus = {menus}
            setRoleMenus = {this.setRoleMenus}
          />

        </Modal>

      </div>

    )
  }
}



class AuthorizeForm extends Component {

  static propTypes = {
    setAuthorizeForm: PropTypes.func.isRequired
  }

  renderTreeNodes = (data, key = '') => {
    return data.map((item) => {
      let parentKey = key + item.key
      if (item.children) {
        return (
          <TreeNode title={item.title} key={parentKey} dataRef={item}>
            {this.renderTreeNodes(item.children, parentKey)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }

  componentWillMount() {
    this.props.setAuthorizeForm(this.props.form)
  }

  render() {

    const {role, setRoleMenus, menus} = this.props

    return(
      <Form layout='horizontal'>
        <Form.Item label="角色名称:">
          <Input disabled placeholder={role.name}/>
        </Form.Item>

        <Tree
          checkable
          defaultExpandAll
          checkedKeys={menus || []}
          oncheck={
             (checkedKeys) => setRoleMenus(checkedKeys)
           }
        >
          <TreeNode
          title="平台权限" key="platform_all"
          >
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>

        </Tree>
      </Form>
    )
  }
}

AuthorizeForm = Form.create()(AuthorizeForm)


class AddRoleForm extends Component {

  componentWillMount() {
    this.props.setAddForm(this.props.form)
  }

  render() {

    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    };

    return(
      <Form>
        <Form.Item label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: ''
            })(
              <Input type="text" placeholder="请输入角色名称"/>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

AddRoleForm = Form.create()(AddRoleForm)