import fetch from 'node-fetch';
import { cityModel } from './city.model';
import citylist from 'cities.json';

const OpenWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

let cities;


export const GetCities = async (req, res) => {
  try {
    let citylistNew = citylist.filter((city) => {
      return city.name
        .toLowerCase()
        .includes(req.query.city ? req.query.city.toLowerCase() : '');
    });

    res.status(200).json(citylistNew.slice(0, 20));
  } catch (error) {
    res.status(422).json(error);
  }
};

export const GetCityInfo = async (req, res) => {
  try {
    const query = req.query.city;
    let url = 'https://www.metaweather.com/api/location/search/?query=' + query;
    let city = await fetch(url);
    let response = await city.json();
    res.status(200).json(response[0]);
  } catch (error) {
    res.status(422).json(error);
  }
};

export const GetWeatherInfo = async (req, res) => {
  try {
    const query = req.query;
    let url = `https://samples.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lng}&appid=${OpenWeatherApiKey}`;
    let city = await fetch(url);
    let response = await city.json();
    res.status(200).json(response);
  } catch (error) {
    res.status(422).json(error);
  }
};


export const InitData = async (req, res) => {
  try {
    const url = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json';
    cities = await fetch(url);
    let response = await cities.json();
    await cityModel.insertMany(response);
    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(422).json(error);
  }
};