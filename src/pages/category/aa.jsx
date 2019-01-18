import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon
} from 'antd'

import {reqCategorys} from '../../api'



/*
管理的分类管理路由组件
 */
export default class Category extends Component {
  state = {
    categorys: []
  }

  /*
  获取一级分类列表
   */
  getCategorys = async () => {
    const result = await reqCategorys('0')
    if(result.status===0) {
      const categorys = result.data
      // 更新状态
      this.setState({
        categorys
      })
    }
  }

  componentDidMount () {
    this.getCategorys()
  }

  componentWillMount () {
    // 所有列的数组
    this.columns = [{
      title: '分类名称',
      dataIndex: 'name',
      // render: (value) => <a href='javascript:'>{value}</a>
    },

      {
      title: '操作',
      width: 300,
      render: (category) => {
        return (
          <span>
            <a href="javascript:">修改分类</a>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:">查看子分类</a>
          </span>
        )
      }
    }, ];
  }

  render() {
    // 得到列的数组
    const columns = this.columns
    // 得到分类的数组
    const {categorys} = this.state
    // console.log('categorys', categorys)

    return (
      <div>
        <Card>
          <span style={{fontSize: 20}}>一级分类列表</span>
          <Button type='primary' style={{float: 'right'}}>
            <Icon type='plus'/>
            添加分类
          </Button>
        </Card>

        <Table
          bordered
          rowKey='_id'
          columns={columns}
          dataSource={categorys}
          loading={!categorys || categorys.length===0}
          pagination={{defaultPageSize: 10, showSizeChanger: true, showQuickJumper: true}}
        />
      </div>
    )
  }
}