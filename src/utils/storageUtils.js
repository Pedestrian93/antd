/**
 * Created by san on 2019年1月15日, 0015.
 */
import store from 'store'

const USER_KEY = 'user_key'

function setStorage(name, value) {
  if (value && typeof value !== 'function') {
    store.set(name, value)
  } else {
    alert('不支持此类型数据')
  }
}

function getStorage(name) {
  return store.get(name) || ''
}

function removeStorage(name) {
  store.remove(name)
}



export default {
  saveUser (user) {
    setStorage(USER_KEY, user)
  },

  getUser () {
    return getStorage(USER_KEY)
  },

  removeUser () {
    removeStorage(USER_KEY)
  }
}