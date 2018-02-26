/*Navbar console*/
/*simply menu buttons*/

import React from 'react';
/*eslint-disable*/
import { NavLink } from 'react-router-dom';
/*eslint-enable*/
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <section className="center-content line menu fixed top left layer2">
      <NavLink exact to="/scores" activeClassName="active" className="col3 center-content">
        <i className="fa fa-star-o"></i>
      </NavLink>

      <NavLink exact to="/" activeClassName="active" className="col4 center-content">
        <i className="fa fa-play-circle"></i>
      </NavLink>

      <NavLink exact to="/user" activeClassName="active" className="col3 center-content">
        <i className="fa fa-smile-o"></i>
      </NavLink>
    </section>;
  }
}

export default Navbar
