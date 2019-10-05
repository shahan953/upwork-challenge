import actions from "../constants";

const init = {
  countries: [],
  cities: [],
  states: [],
  weather: {},
  city: {}
}

export default (state = init, action) => {
  switch (action.type) {
    case actions.GET_COUNTRIES: {
      return state = {
        ...state,
        countries: action.payload
      }
    }
    case actions.GET_CITIES: {
      return state = {
        ...state,
        cities: action.payload
      }
    }
    case actions.GET_WEATHER: {
      return state = {
        ...state,
        weather: action.payload
      }
    }
    case actions.GET_CITY_INFO: {
      return state = {
        ...state,
        city: action.payload
      }
    }
    default:
      return state;
  }
}
