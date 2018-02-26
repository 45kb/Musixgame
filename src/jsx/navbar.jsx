/*Navbar console*/
/*simply menu buttons*/

import React from 'react';
import {connect} from 'react-redux';
/*eslint-disable*/
import { NavLink } from 'react-router-dom';
/*eslint-enable*/
/*maps the redux state properties into component props --see reducers/index.js */
const mapStateToProps = ({show}) => ({show});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <section className="center-content line menu fixed top left layer2">
      <NavLink to="/scores" activeClassName="active" className="col3 center-content">
        <i className="fa fa-star-o"></i>
      </NavLink>

      <NavLink exact to="/" activeClassName="active" className="col4 center-content">
        <i className="fa fa-play-circle"></i>
      </NavLink>

      <NavLink to="/user" activeClassName="active" className="col3 center-content">
        <i className="fa fa-smile-o"></i>
      </NavLink>
    </section>;
  }
}

export default connect(mapStateToProps)(Navbar);
