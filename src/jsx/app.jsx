/*global localStorage */
import React from 'react';
/*eslint-disable*/
import {BrowserRouter, Route} from 'react-router-dom';
/*eslint-enable*/

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
    return <BrowserRouter>
      <div className="line">
      <Navbar></Navbar>
      <Route path="/user" exact component={User}/>
      <Route path="/" exact component={Quiz}/>
      <Route path="/quizend" exact component={QuizEnd}/>
      <Route path="/scores" exact component={Scores}/>
    </div>
    </BrowserRouter>;
  }
}

export default App;
