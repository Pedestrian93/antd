import React, {Component} from 'react'
import {Button, message} from 'antd'

export default class App extends Component {
  handleClick = () => {
    message.info('点了')
  }

  render() {
    return (
      <div className="App">
        <Button type = 'primary' onClick={this.handleClick}>
          hjkfshfhk
        </Button>
      </div>
    )
  }
}











