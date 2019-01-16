/**
 * Created by san on 2019年1月15日, 0015.
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    if (method === 'GET') {
      //register
      promise = axios.get(url, {params: data})
    }
    else if (method === 'POST') {
      //login
      promise = axios.post(url, data)
    }

    promise
      .then((response) => {
        resolve(response.data)
    })
      .catch(error => {
        message.error('请求错误：' + error.message)
    })


  })
}