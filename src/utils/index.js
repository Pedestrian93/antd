/**
 * Created by san on 2019年1月16日, 0016.
 */

export function getFormatedTime() {
  let a = Date.now()
  let b = new Date(a)
  return b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate() + ' ' + b.getHours() + ':' + b.getMinutes() + ':' + b.getSeconds()
}
