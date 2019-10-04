import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <h1>Hello</h1>
    )
  }
}

export default connect()(Home)