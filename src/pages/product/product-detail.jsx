import React, {Component} from 'react'
import {reqCategoryList} from '../../api'

import {
  List,
  Icon
} from 'antd'

import {BASE_IMG_PATH} from '../../utils/constants'

export default class ProductDetail extends Component {

  state = {
    cName1: '',
    cName2: ''
  }

  getCategoryName = async () => {
    const {categoryId, pCategoryId} = this.props.location.state
    let cName1, cName2
    if (pCategoryId === '0') {
      const result = await reqCategoryList(categoryId)
      console.log('0', result)
      cName1 = result.data.name
      cName2 = ''
    } else {
      const results = await Promise.all([reqCategoryList(pCategoryId), reqCategoryList(categoryId)])
      cName1 = results[0].data.name
      cName2 = results[1].data.name
    }
    this.setState({
      cName1,
      cName2
    })
  }

  componentWillMount () {
    this.getCategoryName()
  }

  render() {

    const {name, desc, price, detail, imgs} = this.props.location.state

    const {cName1, cName2} = this.state

     return (
      <div>

        <h1>
          <Icon type="arrow-left" onClick={() => this.props.history.goBack()}/>&nbsp;&nbsp;
          商品详情
        </h1>

        <List
          bordered
        >
          <List.Item>
            <span className="left">商品名称：</span>
            <span>{name}</span>
          </List.Item>

          <List.Item>
            <span className="left">商品描述：</span>
            <span>{desc}</span>
          </List.Item>

          <List.Item>
            <span className="left">商品价格：</span>
            <span>{price + '元'}</span>
          </List.Item>

          <List.Item>
            <span className="left">所属分类：</span>
            <span>{cName1 + '-->' + cName2}</span>
          </List.Item>

          <List.Item>
            <span className="left">商品图片：</span>
            <span>{
              imgs.map( img=> (
                <img src= {BASE_IMG_PATH + img} alt="img" key={img}
                     style={{width: 150, height: 150, marginRight: 10}}/>
              ))
            }</span>
          </List.Item>

          <List.Item>
            <span className="left">商品详情：</span>
            <div dangerouslySetInnerHTML={{__html: detail}}></div>
          </List.Item>

        </List>
      </div>
    )
  }
}

