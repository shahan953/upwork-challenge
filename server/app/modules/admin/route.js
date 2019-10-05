import {
  GetCities, InitData, GetCityInfo, GetWeatherInfo
} from './controller';


export const routers = {
  baseUrl: '/api/admin',
  routes: [
    {
      method: 'GET',
      route: '/cities',
      handlers: [
        GetCities
      ]
    },
    {
      method: 'GET',
      route: '/city-info',
      handlers: [
        GetCityInfo
      ]
    },
    {
      method: 'GET',
      route: '/weather-info',
      handlers: [
        GetWeatherInfo
      ]
    },
    {
      method: 'GET',
      route: '/init-data',
      handlers: [
        InitData
      ]
    },
  ]
};
