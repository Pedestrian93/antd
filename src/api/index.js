/**
 * Created by san on 2019年1月15日, 0015.
 */
import ajax from './ajax'
import jsonp from 'jsonp'


export const reqLogin = (username, password) =>
  ajax('/login', {username, password}, 'POST')


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


