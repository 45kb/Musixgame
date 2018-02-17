/*global localStorage*/
/*Highest scores component*/
/*List of all the user's highscores*/

import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

const mapStateToProps = ({show}) => ({show});

class Scores extends React.Component {
  constructor(props) {
    super(props);
    //must do this to rerender localStorage data
    //for sure there is a better way but i c an't find one atm
    this.init = () => {
      this.db = JSON.parse(localStorage.db || []);
      this.scores = [];
      this.scores = this.db
      .map(({user, scores}) => ({
        user,
        'bestScore': scores.sort((first, second) => Number(first) < Number(second)).reduce(prev => Number(prev))
      }))
      .sort((first, second) => first.maxScore < second.maxScore);

      this.scores = _.uniq(this.scores);
    };

    this.init();
  }

  render() {
    return <section onLoad={this.init()} className={`center-content scores hide
         ${this.props.show === 'scores' ? 'show' : '' }`}>
      <h1 className="line-compress">
        Highest Scores
      </h1>
      <ul>
      {this.scores.map(item => {
        return (
          <li key={item.user}>
            {item.user}
            <div>{item.bestScore}</div>
          </li>
          );
      })}
      </ul>
    </section>;
  }
}

export default connect(mapStateToProps)(Scores);
