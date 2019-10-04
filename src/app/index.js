import React from 'react';
import AppRouter from './routes';
import { Provider } from 'react-redux';
import store from './redux'
import Vendor from './Vendor';

class App extends Vendor {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}
export default App;