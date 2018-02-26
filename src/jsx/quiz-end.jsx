/*global localStorage*/
/*Quiz end component*/
/*User will give its username*/

import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = ({show}) => ({show});

class QuizEnd extends React.Component {

  constructor(props) {
    super(props);
    this.goToUserPage = this.goToUserPage.bind(this);
  }

  setUsername(event) {
    let user = event.target.value;

    localStorage.username = user;
  }

  saveToDB() {
    /*now save user score in db*/
    /*eslint-disable*/
    if (!localStorage.db) {
      localStorage.db = JSON.stringify([{
        'user': localStorage.username,
        'scores': [localStorage.LATEST_QUIZ_SCORE]
      }]);
    } else if(localStorage.db) {

      let db = JSON.parse(localStorage.db) || false;
      let isInDB = false;

      //if in db add score only
      db.forEach((key, value) => {
        if (key.user === localStorage.username) {
          key.scores.push(localStorage.LATEST_QUIZ_SCORE);
          isInDB = true;
        }
      });
      //if not in db add it
      if (!isInDB) {
        db.push({
          'user': localStorage.username,
          'scores': [localStorage.LATEST_QUIZ_SCORE]
        });
      }

      localStorage.db = JSON.stringify(db);
    }
    /*eslint-enable*/
  }

  goToUserPage() {
    this.props.history.push('/user');
  }

  retrieveSessionUsername() {
    return localStorage.username || false;
  }

  render() {
    return <section className="center-content quizend">
      <h1 className="line-compress">
        Your Score is
        <div className="separator30"></div>
        <span className="score">{localStorage.getItem('LATEST_QUIZ_SCORE')}</span>
      </h1>
      <div className="line">
        <input className={`${this.retrieveSessionUsername() ? 'hide' : ''}`}
          onChange={this.setUsername}
          type="text" placeholder="Your name..." />
        <button className="line fixed bottom left" type="button"
          onFocus={this.saveToDB}
          onClick={this.goToUserPage}>
          Save
        </button>
      </div>
    </section>;
  }
}

export default connect(mapStateToProps)(QuizEnd);
