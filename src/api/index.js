/**
 * Created by san on 2019年1月15日, 0015.
 */
import ajax from './ajax'
import jsonp from 'jsonp'

//login
export const reqLogin = (username, password) =>
  ajax('/login', {username, password}, 'POST')

//request weather data
export const getWeatherPicUrl = (city) => {
  const url = `https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png`

  return new Promise((resolve, reject) => {
    jsonp(url, {}, (error, response) => {
      if (!error && response.status == 'success') {
        const {dayPictureUrl, weather} = response.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        alert('请求天气信息失败！')
      }
    })
  })
}

//get parent category & category
// export const reqCategory = (parentId ='0') =>
// ajax('/manage/category/list', {parentId})

// 获取一级或某个二级分类列表
export const reqCategory = (parentId) =>
  ajax('/manage/category/list', {parentId})


// 根据分类ID获取分类
export const reqCategoryList = (categoryId) => ajax('/manage/category/info', {categoryId})


//add category
export const reqAddCategory = (parentId, categoryName) =>
  ajax('/manage/category/add', {parentId, categoryName}, 'POST')

//update categoryName
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

//get Products list
export const reqProducts = (pageNum, pageSize) =>
  ajax('/manage/product/list', {pageNum, pageSize})

// 搜索商品分页列表
// searchType: productDesc/ productName
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax('/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})


export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')


export const reqAddUpdateCategory = (product) => ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')


// 对商品进行上架/下架处理
export const reqUpOrDownProduct = (productId, status) => ajax('/manage/product/updateStatus', {
  productId,
  status
}, 'POST')


// 获取角色列表
export const reqRoles = () => ajax('/manage/role/list')

//添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')