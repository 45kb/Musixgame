/*Navbar console*/
/*simply menu buttons*/

import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
/*maps the redux state properties into component props --see reducers/index.js */
const mapStateToProps = ({show}) => ({show})
/*maps the redux actions to dispatch into component props --see reducers/index.js */
  , mapDispatchToProps = {
    'showQuiz': () => {
      return {
        'type': 'SHOW_QUIZ'
      };
    },
    'showUser': () => {
      return {
        'type': 'SHOW_USER'
      };
    },
    'showScores': () => {
      return {
        'type': 'SHOW_SCORES'
      };
    }
  };

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <section className="center-content line menu fixed top left layer2">
      <Link to="/scores" className="col3 center-content">
        <i className="fa fa-star-o"></i>
      </Link>

      <Link to="/" className="col4 center-content">
        <i className="fa fa-play-circle"></i>
      </Link>

      <Link to="/user" className="col3 center-content">
        <i className="fa fa-smile-o"></i>
      </Link>
    </section>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
