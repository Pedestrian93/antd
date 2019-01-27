import React, {Component} from 'react'
import {Icon,
  Form,
  Input,
  Select,
  message,
  Button,} from 'antd'

import {reqCategory, reqAddUpdateCategory} from '../../api/index'
import PicturesWall from './picture-wall'
import ActiveEditor from './active-editor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Item = Form.Item
const Option = Select.Option


class ProductSaveUpdate extends Component {

  state = {
    categories: [],
    subCategories: [],
    allcate: [],
    parentId: ''
  }

  getCategories = async (parentId) => {
    const result = await reqCategory(parentId)
    const categories = result.data
    if (parentId === '0') {
      this.setState ({
        categories,
        parentId,
      })
    }
    else {
      this.setState ({
        subCategories:categories
      })
    }

  }

  //生成Options
  renderOptions = () => {
    const {categories, subCategories} = this.state
    const options = categories.map(c =>(
      <Option key = {c._id} value={c._id}>{c.name}</Option>
    ))

    const subOptions = subCategories.map(c =>(
      <Option key = {c._id} value={c._id}>{c.name}</Option>
    ))
    return {options, subOptions}
  }

  getInitValue1 = (product) => {
    if (product.pCategoryId === '0') {
      return product.categoryId
    }
    else if (product.pCategoryId) {
      return product.pCategoryId
    }
  }

  getInitValue2 = (product) => {
   if (product.pCategoryId) {
      return product.categoryId
   } else {
     return '未选择'
   }
  }

  reShowSubCategory = (parentId, product) => {
    this.getCategories(parentId)
    product.categoryId = '未选择'
  }

  submit = async (event) => {
    event.preventDefault()
    const value = this.props.form.getFieldsValue()
    const {name, desc, price, category1, category2} = value

    let pCategoryId
    let categoryId
    if(category2 === '未选择') {
      pCategoryId = '0'
      categoryId = category1
    } else {
      pCategoryId = category1
      categoryId = category2
    }
    const detail = this.refs.activeEditor.getContent()
    const imgs = this.refs.pictureWall.getImgs()

    const product = {name, desc, price, pCategoryId, categoryId, detail, imgs}

    if(this.props.location.state) {
      product._id = this.props.location.state._id
    }

    const result = await reqAddUpdateCategory(product)
    console.log(product)
    if (result.status === 0){
      message.success('提交成功！')
    }

  }

  componentDidMount () {
    this.getCategories('0')
    // const product = this.props.pCategoryId!=='0'
    const product = this.props.location.state

    console.log(product)
    if(product && product.pCategoryId!=='0') {
      this.getCategories(product.pCategoryId)
    }

  }

  render() {
    const {getFieldDecorator} = this.props.form
    const{options, subOptions} = this.renderOptions()
    const product = this.props.location.state || {}
    const {imgs} = product

    return (
      <div>
        <h2>
          <a>
            <Icon type="arrow-left" onClick={() => this.props.history.goBack()}/> &nbsp;&nbsp;&nbsp;
          </a>

          <span style={{fontSize: 30}}>添加分类</span>

          <Form>

            {/*商品名称*/}
            <Item label='商品名称' labelCol={{span: 2}} wrapperCol={{span: 12}}>
              {
                getFieldDecorator('name', {
                  initialValue: 'jdskjf'
                })(
                  <Input placeholder='请输入商品名称'/>
                )
              }
            </Item>

            {/*商品描述*/}
            <Item label='商品描述' labelCol={{span: 2}} wrapperCol={{span: 12}}>
              {
                getFieldDecorator('desc', {
                  initialValue: 'ffd'
                })(
                  <Input placeholder='请输入商品名称'/>
                )
              }
            </Item>

            {/*所属分类*/}
            <Item label='商品分类' labelCol={{span: 2}} wrapperCol={{span: 12}}>

              {
                options.length > 0 ?
                  getFieldDecorator('category1', {
                     initialValue: this.getInitValue1(product)
                  })(
                    <Select style={{width: 200}} onChange={value => this.reShowSubCategory(value, product)}>
                      {options}
                    </Select>
                  )
                  : null
              }
               &nbsp; &nbsp; &nbsp;&nbsp;

              {
                subOptions.length > 0 ?
                getFieldDecorator('category2', {
                    initialValue: this.getInitValue2(product)
                  })(
                    <Select style={{width: 200}} >
                      {subOptions}
                    </Select>
                  )
                  : null
              }

            </Item>

            {/*商品价格*/}
            <Item label='商品价格' labelCol={{span: 2}} wrapperCol={{span: 3}}>
              {
                getFieldDecorator('price', {
                  initialValue: '1'
                })(
                  <Input addonAfter='元' />
                )
              }
            </Item>

            {/*商品图片*/}
            <Item label='商品图片' labelCol={{span: 2}} wrapperCol={{span: 12}}>
              {
                <PicturesWall imgs = {imgs} ref = 'pictureWall'/>
              }
            </Item>

            {/*商品详情*/}
            <Item label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 12}}>
              <ActiveEditor ref = 'activeEditor' detail = {product.detail} />
            </Item>

            {/*提交*/}
            <Item labelCol={{span: 2}} wrapperCol={{span: 12}}>
              <Button type="primary" onClick= {this.submit}>
                提交
              </Button>
            </Item>
          </Form>

        </h2>

      </div>

    )
  }
}


export default Form.create()(ProductSaveUpdate)