/*global localStorage*/
import React from 'react';

import 'csshelper/dist/helper.min.css';
import 'roboto-fontface-woff/css/roboto/sass/roboto-fontface.scss';
import '../assets/scss/index.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css/animate.min.css';

/*eslint-disable*/
import Navbar from './navbar.jsx';
import Quiz from './quiz.jsx';
import QuizEnd from './quiz-end.jsx';
import User from './user.jsx';
import Scores from './scores.jsx';
/*eslint-enable*/

/*initialize db*/
if (!localStorage.getItem('db')) {
  localStorage.setItem('db', JSON.stringify([]));
}
class App extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return <div className="line">
      <Navbar></Navbar>
      <User></User>
      <Scores></Scores>
      <Quiz></Quiz>
      <QuizEnd></QuizEnd>
    </div>;
  }
}

export default App;
