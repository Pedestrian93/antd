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
import {reqCategory, reqAddCategory, reqUpdateCategory} from '../../api'

// import Modal from "antd/lib/modal/Modal.d"

const Option = Select.Option


export default class Category extends Component {

  state = {
    parentId: '0',
    parentName: '',
    categories: [],
    subCategories: [],
    isShowUpdate: false,
    addCategory: false,
    isShowDeleteCategory: false,
  }


  //get first or second level of category
  getCategory = async () => {
    const {parentId} = this.state
    const result = await reqCategory(parentId)
    if (result.status === 0) {
      const categories = result.data
      if (parentId === '0') {
        this.setState({
          categories
        })
      }
      else {
        this.setState({
          subCategories: categories
        })
      }
      console.log(categories, 'all of the categories')
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.getCategory()

  }

  showUpdateCategoryName = (category) => {

    console.log(category, '#######category')
    this.setState ({
      isShowUpdate: true
    })
    this.category = category
  }

  UpdateCategoryName = async () => {
    const {category} = this

    this.setState ({
      isShowUpdate: false
    })
    const {categoryName} = this.form.getFieldsValue()
    const result = await reqUpdateCategory(category._id, categoryName)
    if (result.status === 0) {
      this.getCategory()
    }

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

  showSubCategory = (category) => {
    this.setState ({
      parentId: category._id,
      parentName:category.name
    }, () => {
      this.getCategory()
    })

    console.log('current categories', this.state.parentId)
  }



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
      addCategory,
      parentId,
      subCategories
    } = this.state

    // console.log(categories, 'categories')
    // got the categories

    const category = this.category || {}

    const columns = [
      {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="##">{text}</a>,
      },

      {
      title: '操作',
      key: 'action',
      width: 400,
      render: (category) => (
        <span>
          <a href="##" onClick={()=>this.showUpdateCategoryName(category)}>修改分类名</a>
          &nbsp;&nbsp;

        <Divider type="vertical" />
          &nbsp;&nbsp;

          <a href="##" onClick={() => this.showSubCategory(category)}>查看子分类</a>
        </span>
      ),
      }
    ];


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
          columns={columns}
          dataSource={parentId.toString() === '0' ? categories : subCategories} />

        {/*{modal of update categoryName}*/}
        <Modal visible={this.state.isShowUpdate}
               title = '修改分类名称'
               width = {300}
               onCancel={() => {
                 this.setState({
                   isShowUpdate: false,
                 })
               }}
               onOk={() => this.UpdateCategoryName(category)}>
          <UpdateForm categoryName={category.name} setForm ={
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
              <Input placeholder={this.props.categoryName}/>
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