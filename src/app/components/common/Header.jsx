import React from 'react';
import { connect } from 'react-redux';

class View extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="bg-nav fixed-top" id="header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light ">
                <a className="navbar-brand" href="/">
                  <span>Logo</span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
})

const mapDispatch = dispatch => ({
})

export const Header = connect(mapState, mapDispatch)(View);