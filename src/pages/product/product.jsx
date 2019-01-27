import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import ProductIndex from './index'
import ProductDetail from './product-detail'
import ProductSaveUpdate from './save-update'
import './product.less'


export default class Product extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path='/product/index' component={ProductIndex}/>
          <Route path='/product/detail' component={ProductDetail}/>
          <Route path='/product/saveupdate' component={ProductSaveUpdate}/>
          <Redirect to="/product/index"/>
        </Switch>
      </div>)
  }
}

