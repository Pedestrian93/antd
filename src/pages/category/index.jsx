import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Table,
  Form,
  Card,
  Tag,
  Divider,
  Input,
  Modal,
  Select,
  message
} from 'antd'

import './index'
import {reqCategory, reqAddCategory} from '../../api'

// import Modal from "antd/lib/modal/Modal.d"

const Option = Select.Option


export default class Category extends Component {

  state = {
    parentId: 0,
    categories: [],
    isShowUpdate: false,
    addCategory: false,
    isShowDeleteCategory: false,
  }

  getCategory = async () => {
    const result = await reqCategory(this.state.parentId)
    if (result.status === 0) {
      const categories = result.data
      this.setState({
        categories
      })
    }
  }

  componentWillMount () {
    this.getCategory()
    // console.log(this.state.categories)
  }

  showUpdateCategoryName = () => {
    this.setState ({
      isShowUpdate: true
    })
  }

  UpdateCategoryName = () => {
    this.setState ({
      isShowUpdate: false
    })
    const a = this.form.getFieldsValue()
    console.log(a)
  }



  showAddModal = () => {
    this.setState({
      addCategory: true
    })
  }

  addCategoryShow = () => {
    this.setState ({
      addCategory: true
    })
  }

  //TODO



  addCategory = async () => {
    //get the input info
    const{parentId, categoryName} = this.form.getFieldsValue()
    this.setState({
      addCategory: false
    })
    this.form.resetFields()

    const result = await reqAddCategory(parentId, categoryName)
    if (result.status ===0) {
      message.success('已成功新增分类！')
      if(+parentId === this.state.parentId) {
        this.getCategory()
      }
    } else {
      message.error('添加失败！')
    }

  }

  render() {
    const {
      categories,
      isShowUpdate,
      addCategory
    } = this.state

    const columns = [{
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
      },
      {
      title: '操作',
      key: 'action',
      width: 400,
      render: (text, record) => (
        <span>
      <a href="javascript:;" onClick={this.showUpdateCategoryName}>修改分类名 </a>
          &nbsp;&nbsp;
      <Divider type="vertical" />
          &nbsp;&nbsp;
          <a href="javascript:;" onClick={this.deleteCategory}>查看子分类</a>
    </span>
      ),
    }];
    // console.log(categories)

    return (
      <div>

        <Card style={ {width: '100%' }}>
          <span style = {{fontSize: '25px'}}>列表名字</span>
          <Button className='ant-btn-primary' style = {{float: 'right'}} onClick={this.addCategoryShow}>
            +添加品类
          </Button>
        </Card>

        <Table
          loading={!categories.length}
          pagination = {
            {defaultPageSize: 4, showQuickJumper: true, hideOnSinglePage: true}
          }
          columns={columns} dataSource={categories} />

        {/*{modal of update categoryName}*/}
        <Modal visible={this.state.isShowUpdate}
               title = '修改分类名称'
               width = {300}
               onCancel={() => {
                 this.setState({
                   isShowUpdate: false,
                 })
               }}
               onOk={this.UpdateCategoryName}>
          <UpdateForm categoryName={categories.name} setForm ={
            form => this.form = form
          }/>
        </Modal>

        {/*Modal of add category*/}
        <Modal visible={addCategory}
               title = '添加品类'
               width = {500}
               onCancel={() => {
                 this.setState({
                   addCategory: false,
                 })
               }}

               onOk={this.addCategory}

        >
          <AddForm categories = {categories} setForm ={
            form => this.form = form
          } />
        </Modal>


      </div>
    )
  }
}


class UpdateForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount () {
    const form = this.props.form
    this.props.setForm(form)
  }
//TODO
  render() {

    const {getFieldDecorator} = this.props.form

    return(
      <Form>
        <Form.Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: ''
            })(
              <Input placeholder={'name'}/>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}
UpdateForm = Form.create()(UpdateForm)


class AddForm extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount () {
    const form = this.props.form
    this.props.setForm(form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {categories} = this.props

    const options = categories.map(item => (
      <Option key = {item._id} value={item._id}>
        {item.name}
      </Option>
    ))

    return(
      <Form>
        <Form.Item label = '所属分类'>
          {
            getFieldDecorator('parentId', {
              initialValue: '0'
            })(
              <Select>
                <Option value='0'> 一级分类 </Option>
                {options}
              </Select>
            )
          }
        </Form.Item>


        <Form.Item label="分类名称">
          {
            getFieldDecorator('categoryName', {
              initialValue: ''
            })(
              <Input placeholder='输入分类名称'/>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}
AddForm = Form.create()(AddForm)