import React from 'react';
import { connect } from 'react-redux';
import { GetContries, GetCities, GetWeather, getCityInfo } from '../../redux';
import { Card, AutoComplete } from 'antd';
import { serialize } from '../../../core/lib';
import moment from 'moment';

const { Option } = AutoComplete;

class Home extends React.Component {
  state = {
    city: {}
  }

  filterCity = async (value) => {
    this.props.GetCities(value)
  }

  onSearch = async (value) => {
    this.props.GetCities(value)
  }

  onSelect = async (value) => {
    let city = this.props.cities.find((city) => {
      return city.name === value && city;
    })

    this.setState({ city: city })
    let params = serialize(city)
    await this.props.GetWeather(params)
  }

  renderOption = (item) => {
    return (
      <Option key={item.id} value={item.name} text={item.name}>
        {item.name}
      </Option>
    )
  }

  render() {
    const { cities, weather } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto my-3">
              <Card>
                <span className="mr-2">Select a city</span>
                <AutoComplete
                  dataSource={cities.map(this.renderOption)}
                  style={{ width: 200 }}
                  onSelect={this.onSelect}
                  onSearch={this.onSearch}
                  placeholder="input here"
                />
              </Card>
              <Card className="mt-2 weather-ui">

                {weather.main &&
                  <div className="text-center">
                    <span className="mx-1"><strong>Temp</strong>: {weather.main.temp}</span>
                    <span className="mx-1"><strong>Minimum Temp</strong>: {weather.main.temp_min}</span>
                    <span className="mx-1"><strong>Maximum Temp</strong>: {weather.main.temp_max}</span>
                    <span className="mx-1"><strong>Pressure</strong>: {weather.main.pressure}</span>
                    <span className="mx-1"><strong>Humidity</strong>: {weather.main.humidity}</span>
                    <span className="mx-1"><strong>Sea Level</strong>: {weather.main.sea_level}</span>
                    <span className="mx-1"><strong>Sea Level</strong>: {weather.main.sea_level}</span>
                  </div>
                }
                {weather.coord &&
                  <div className="text-center">
                    <span className="mx-1"><strong>Latitude</strong>: {weather.coord.lat}</span>
                    <span className="mx-1"><strong>Longitude</strong>: {weather.coord.lon}</span>
                  </div>
                }

                <div className="row">
                  <div className="col">
                    {weather.weather &&
                      <div className="mt-4  d-flex justify-content-start">
                        <div className="mr-3">
                          <img src={'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png'} alt="Icon" />
                        </div>
                        <div className="">
                          <h3>{weather.weather[0].main}</h3>
                          <h4>{weather.weather[0].description}</h4>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="col">
                    {weather.sys &&
                      <div className="mt-4 text-center">
                        <h5>Sunrise: {moment(weather.sys.sunrise).format('lll')}</h5>
                        <h5>Sunset: {moment(weather.sys.sunset).format('lll')}</h5>
                      </div>
                    }
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  cities: state.app.cities,
  city: state.app.city,
  weather: state.app.weather
})

const mapDispatchToProps = dispatch => ({
  GetContries: () => dispatch(GetContries()),
  GetCities: (city) => dispatch(GetCities(city)),
  getCityInfo: (city) => dispatch(getCityInfo(city)),
  GetWeather: (city) => dispatch(GetWeather(city))
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)