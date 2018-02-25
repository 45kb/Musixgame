/*global localStorage*/
import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

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
      <Route path="/user" component={User}/>
      <Route path="/" exact component={Quiz}/>
      <Route path="/quizend" component={QuizEnd}/>
      <Route path="/scores" component={Scores}/>
    </div>
    </BrowserRouter>;
  }
}

export default App;
