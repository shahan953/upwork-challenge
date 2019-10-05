// const url = 'https://www.dealstryker.com';
const url = process.env.REACT_APP_API_ENDPOINT;

export const baseURL = url + '/api';
export const endpoint = {
  cities: '/admin/cities',
  weather: '/admin/weather-info',
  city: '/admin/city-info'
}