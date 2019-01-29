import {Upload, Icon, Modal, message} from 'antd'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {reqDeleteImg} from '../../api'
const BASE_IMG_PATH = 'http://localhost:5000/upload/'

//管理商品图片的组件
export default class PicturesWall extends Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = async ({file, fileList, event}) => {
    console.log(file,fileList)
    const result = file.response


    if(file.status === 'done') {
      const {name, url} = result.data
      const
      file = fileList[fileList.length-1]
      file.url = url
      file.name = name
    } else if(file.status === 'removed') {
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('删除成功')
      }

    }


    this.setState({fileList})

  }

  //render上传图标
  uploadButton = () => {return(
    <div>
  <Icon type="plus"/>
    <div className="ant-upload-text">Upload</div>
    </div>
    )
  }

  //获取全部图片文件名数组
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  componentWillMount() {
    const imgs = this.props.imgs
    if (imgs && imgs.length > 0) {
      const fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: BASE_IMG_PATH + img,
      }))
      this.state.fileList = fileList
    }
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state

    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          accept='image/*'
          name = 'image'
        >
          {fileList.length >= 4 ? null : this.uploadButton()}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    )
  }
}