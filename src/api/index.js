/**
 * Created by san on 2019年1月15日, 0015.
 */
import ajax from './ajax'

export const reqLogin = (username, password) =>
  ajax('/login', {username, password}, 'POST')