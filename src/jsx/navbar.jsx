/*Navbar console*/
/*simply menu buttons*/

import React from 'react';
import {connect} from 'react-redux';
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

      <a onClick={this.props.showScores} className={`col3 center-content
           ${this.props.show === 'scores' ? 'active' : ''}`}>
        <i className="fa fa-star-o"></i>
      </a>

      <a onClick={this.props.showQuiz} className={`col4 center-content
           ${this.props.show === 'quiz' || this.props.show === 'quiz-end' ? 'active' : ''}`}>
        <i className="fa fa-play-circle"></i>
      </a>

      <a onClick={this.props.showUser} className={`col3 center-content
            ${this.props.show === 'user' ? 'active' : ''}`}>
        <i className="fa fa-smile-o"></i>
      </a>
    </section>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
