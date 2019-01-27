import React, {Component} from 'react'

import {reqProducts, reqSearchProducts, reqUpOrDownProduct} from '../../api/index'

import {
  Card,
  Select,
  Input,
  Button,
  Table,
  Icon,
  message,
} from 'antd'

const Option = Select.Option

export default class ProductIndex extends Component {

  state = {
    total: 0,
    products: [],
    searchType: 'productName',
    searchName: ''
  }

  //初始化table数组
  initColumns = () => {
    this.columns = [
        {
          title: '商品名称',
          dataIndex: 'name'
        },
        {
          title: '商品描述',
          dataIndex: 'desc'
        },
        {
          title: '价格',
          dataIndex: 'price',
          render: (price) => <span>¥{price}</span>
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: (status, product) => {
            let statusText = '在售'
            let optionText = '下架'
            if (status !== 1) {
              statusText = '已下架'
              optionText = '上架'
            }
            return (
              <span>
            <Button type='primary' onClick={() => this.downOrUpProduct(product)}>{optionText}</Button>
            <span>{statusText}</span>
          </span>)
          }
        },
        {
          title: '操作',
          render: (product) => (
            <span>
            <a href="javascript:" onClick={() => this.showDetail(product)}>详情</a>
              &nbsp;&nbsp;&nbsp;
              <a href="javascript:" onClick={() => this.showUpdate(product)}>修改</a>
          </span>
          )
        },

      ]
  }

  downOrUpProduct = async(product) => {
    const productId = product._id
    const status = product.status === 1 ? 2 : 1
    const result = await reqUpOrDownProduct(productId, status)
    if (result.status === 0) {
      product.status = status
      this.setState({
        products: this.state.products
      })
      message.success('更新商品状态成功')
    } else {
      message.error('操作失败: ' + result.msg)
    }
  }

  showUpdate = (product) => {
    this.props.history.push('/product/saveupdate', product)
  }

  getProducts = async (pageNum) => {
    const{searchType, searchName} = this.state
    let result
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize: 6, searchType, searchName})
    } else {
      result = await reqProducts(pageNum, 5)
    }


    if (result.status === 0) {
      const{total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }


  }

  //Show detail
  showDetail = (product) => {
    this.props.history.push('/product/detail', product)
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getProducts(1)
  }

  render() {

    const {products, total,searchType} = this.state

    return (
      <div>
        <Card style={{width:'100%'}}>
          <Select
            value={searchType}
            onChange={value => this.setState({searchType:value})}
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >

            <Option key="productName" value="productName">按照商品名称</Option>
            <Option key="productDesc" value="productDesc">按照商品描述</Option>

          </Select>

          <Input style={{width: 250, marginLeft: 30}}
                 placeholder = '请输入关键字'
                 onChange = {(e) => this.setState({searchName: e.target.value})}
          />

          <Button type = 'primary' style = {{marginLeft: 30}} onClick={()=>this.getProducts(1)}>搜索</Button>
          <Button type = 'primary' style = {{float: 'right'}} onClick={() => this.props.history.push('/product/saveupdate')}>
            <Icon type = 'plus'/>
            添加分类
          </Button>

        </Card>


        <Table
          bordered
          dataSource={products}
          rowkey='_id'
          columns={this.columns}
          pagination = {{defaultPageSize: 4, total,  showQuickJumper: true, hideOnSinglePage: true,
          onChange: this.getProducts}}
        />



      </div>
    )



  }
}


