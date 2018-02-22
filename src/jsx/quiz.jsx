/*global console fetch localStorage*/
/*Quiz component*/
/*The game starts here*/

import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import configs from '../../config.json';

const WS_URL = configs.WS_URL
  , mapStateToProps = ({show, start, artists}) => ({show, start, artists})
  , mapDispatchToProps = {
    'showQuiz': () => {
      return {
        'type': 'SHOW_QUIZ'
      };
    },
    'showQuizEnd': () => {
      return {
        'type': 'SHOW_QUIZEND'
      };
    },
    'startQuiz': () => {
      return {
        'type': 'START_QUIZ'
      };
    },
    'stopQuiz': () => {
      return {
        'type': 'STOP_QUIZ'
      };
    }
  };

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.QUIZ_ANSWERS = 0;
    this.QUIZ_MAX_ANSWERS = Number(configs.QUIZ_MAX_ANSWERS);
    this.QUIZ_CORRECT_ANSWER_POINTS = Number(configs.QUIZ_CORRECT_ANSWER_POINTS);
    this.QUIZ_POINTS = 0;

    this.launchQuiz();
  }

  launchQuiz() {
    const getSong = async artist => {
      let getArtist = await fetch(`${WS_URL}artist?name=${artist}`);
      let resp1 = await getArtist.json();
      let artistID = JSON.parse(resp1).message.body.artist_list[0].artist.artist_id;

      console.info('Artist ID is:', artistID);

      let getArtistAlbumID = await fetch(`${WS_URL}artist/albums/?artist_id=${artistID}`);
      let resp2 = await getArtistAlbumID.json();
      let albumID = JSON.parse(resp2).message.body.album_list[0].album.album_id;

      console.info('Album ID is:', albumID);

      let getAlbumSongID = await fetch(`${WS_URL}artist/album/song?album_id=${albumID}`);
      let resp3 = await getAlbumSongID.json();
      let trackID = JSON.parse(resp3).message.body.track_list[0].track.track_id;

      console.info('Track ID is:', trackID);

      let getLyric = await fetch(`${WS_URL}artist/song/snippet?track_id=${trackID}`);
      let resp4 = await getLyric.json();

      //GOT SONG LYRIC
      return JSON.parse(resp4).message.body.snippet.snippet_body;
    };

    console.info('Starting quiz');
    this.artists = _.sample(this.props.artists, 3);
    this.artist = _.sample(this.artists, 1)[0];
    this.song = false;
    console.info('Random artists are', this.artists);
    console.info('Correct Answer is ----->', this.artist);

    getSong(this.artist).then(song => {
      this.song = song;
      this.props.startQuiz();
      this.props.showQuiz();
      console.info('Song Snippet Lyric is ---->', this.song);
    }).catch(err => {
      this.props.stopQuiz();
      this.launchQuiz();
      console.error(err);
    });
  }

  answerQuiz(artist) {
    //increment answers to reach quiz end
    this.QUIZ_ANSWERS = this.QUIZ_ANSWERS + 1;
    //give answer points
    if (artist.toLowerCase() === this.artist.toLowerCase()) {
      this.QUIZ_POINTS = this.QUIZ_POINTS + this.QUIZ_CORRECT_ANSWER_POINTS;
    }
    //if is quiz ended
    if (this.QUIZ_ANSWERS === this.QUIZ_MAX_ANSWERS) {
      this.QUIZ_ANSWERS = 0;
      localStorage.setItem('LATEST_QUIZ_SCORE', this.QUIZ_POINTS);
      console.log('Your score is ---->', this.QUIZ_POINTS, this.artist);
      this.props.showQuizEnd();
    } else {
    //continue quiz
      this.props.stopQuiz();
      this.launchQuiz();
    }
  }

  render() {
    return <div>
      <div className={`loading center-content line hide
         ${this.props.show === 'quiz' && this.props.start === false ? 'show' : '' }`}>
      <div className="separator50"></div>
      <div className="separator50"></div>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
      <section className={`center-content quiz hide
         ${this.props.show === 'quiz' && this.props.start === true ? 'show' : '' }`}>
      <div className="line">
        <h1 className="col8 offset-left1 animated fadeInDown song">
          {this.song}...
        </h1>
        <div className="line fixed bottom left">
          <div className="line animated fadeInUp">
        {this.artists.map((artist, index) => {
        return (
          <a className={`line answer-${index}`} key={artist} onClick={() => { this.answerQuiz(artist) }} >
           {artist}
         </a>
        );
      })}
      </div>
      </div>
    </div>
    </section>
  </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
