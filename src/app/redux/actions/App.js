import api from '../../../core/api';
import Axios from 'axios';
import actions from '../constants';
import { endpoint } from '../../../config';


export const GetContries = () => {
  return dispatch => {
    let url = 'https://restcountries.eu/rest/v2/all';
    Axios.get(url).then((res) => {
      dispatch({
        type: actions.GET_COUNTRIES,
        payload: res.data,
        success: true
      })
    }, error => {
      console.log(error)
    })
  }
}

export const GetCities = (city) => {
  return dispatch => {
    let url = endpoint.cities + '?city=' + city;
    api.get(url).then((res) => {
      dispatch({
        type: actions.GET_CITIES,
        payload: res,
        success: true
      })
    }, error => {
      console.log(error)
    })
  }
}

export const getCityInfo = (city = '') => {
  return dispatch => {
    let url = endpoint.city + '?city=' + city.toLowerCase();
    return new Promise((resolve, reject) => {
      api.get(url).then((res) => {
        dispatch({
          type: actions.GET_CITY_INFO,
          payload: res,
          success: true
        })
        resolve(res)
      }, error => {
        console.log(error)
        reject(error)
      })
    })
  }
}

export const GetWeather = (query) => {
  console.log(query)
  return (dispatch) => {
    let url = endpoint.weather + '?' + query;
    api.get(url).then((res) => {
      dispatch({
        type: actions.GET_WEATHER,
        payload: res,
        success: true
      })
    }, error => {
      console.log(error)
    })
  }
}
