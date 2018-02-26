/*global localStorage*/
/*User component*/
/*** User can logout ***/

import React from 'react';
import _ from 'underscore';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.goToQuizPage = this.goToQuizPage.bind(this);
    //must do this to rerender localStorage data
    //for sure there is a better way but i c an't find one atm
    this.init = () => {

      this.scores = [];
      this.db = JSON.parse(localStorage.db) || false;

      if (this.db &&
      this.db.length > 0) {

        this.db.forEach(key => {
          if (key.user === localStorage.username &&
            key.scores.length > 0) {
            key.scores.forEach(score => {
              this.scores.push(Number(score));
            });
          }
        });
      }

      this.scores = _.uniq(this.scores);

      this.scores.sort((a, b) => {
        return b - a;
      });
    };

    this.init();
  }

  retrieveSessionUsername() {
    return localStorage.username || false;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('LATEST_QUIZ_SCORE');
    this.props.history.push('/');
  }

  goToQuizPage() {
    this.props.history.push('/');
  }

  render() {
    return <section onLoad={this.init()} className="center-content user">
      <h1 className="line-compress">
        {this.retrieveSessionUsername() || 'Hey Anonymous!'}
      </h1>
      <ul>
        {this.scores.map(score => {
          return (
            <li key={score}>{score}</li>
            );
        })}
      </ul>
      <div className={`line fixed bottom left
          ${this.retrieveSessionUsername() ? '' : 'hide'}`}>
          <button onClick={this.logout}>
            Logout
          </button>
      </div>
      <div className={`line fixed bottom left
          ${this.retrieveSessionUsername() ? 'hide' : ''}`}>
          <button onClick={this.goToQuizPage}>
            Take the quiz
          </button>
      </div>
    </section>;
  }
}

export default User;
