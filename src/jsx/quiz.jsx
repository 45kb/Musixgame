/*global console fetch localStorage*/
/*Quiz component*/
/*The game starts here*/

import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import configs from '../../config.json';
/*eslint-disable*/
import {Router} from 'react-router-dom';
/*eslint-enable*/

const WS_URL = configs.WS_URL
  , mapStateToProps = ({show, start, artists}) => ({show, start, artists})
  , mapDispatchToProps = {
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
    this.init(true);
    this.state = {
      'song': false
    }
  }

  componentWillReceiveProps() {
    this.init();
  }

  init(fromScratch) {
    this.QUIZ_ANSWERS = 0;
    this.QUIZ_MAX_ANSWERS = Number(configs.QUIZ_MAX_ANSWERS);
    this.QUIZ_CORRECT_ANSWER_POINTS = Number(configs.QUIZ_CORRECT_ANSWER_POINTS);
    this.QUIZ_POINTS = 0;
    this.launchQuiz(fromScratch);
  }

  launchQuiz(fromScratch) {
    const getSong = async artist => {
      let getArtist = await fetch(`${WS_URL}artist?name=${artist}`)
        , resp1 = await getArtist.json()
        , artistID = JSON.parse(resp1).message.body.artist_list[0].artist.artist_id;

      console.info('Artist ID is:', artistID);

      let getArtistAlbumID = await fetch(`${WS_URL}artist/albums/?artist_id=${artistID}`)
        , resp2 = await getArtistAlbumID.json()
        , albums = JSON.parse(resp2).message.body.album_list
        , randomAlbum = albums[Math.floor(Math.random() * albums.length)]
        , albumID = randomAlbum.album.album_id;

      console.info('Album ID is:', albumID);

      let getAlbumSongID = await fetch(`${WS_URL}artist/album/song?album_id=${albumID}`)
        , resp3 = await getAlbumSongID.json()
        , tracks = JSON.parse(resp3).message.body.track_list
        , randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
        , trackID = randomTrack.track.track_id;

      console.info('Track ID is:', trackID);

      let getLyric = await fetch(`${WS_URL}artist/song/snippet?track_id=${trackID}`)
        , resp4 = await getLyric.json();

      //GOT SONG LYRIC
      return JSON.parse(resp4).message.body.snippet.snippet_body;
    };

    console.info('Starting quiz');
    this.artists = _.sample(this.props.artists, 3);
    this.artist = _.sample(this.artists, 1)[0];

    console.info('Random artists are', this.artists);
    console.info('Correct Answer is ----->', this.artist);

    getSong(this.artist).then(song => {
      if (fromScratch) {
        this.state = {song};
      } else {
        this.setState({
          song
        });
      }
      this.props.startQuiz();
      console.info('Song Snippet Lyric is ---->', this.state.song);
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
    console.log(this.QUIZ_ANSWERS);
    if (this.QUIZ_ANSWERS === this.QUIZ_MAX_ANSWERS) {
      this.QUIZ_ANSWERS = 0;
      localStorage.setItem('LATEST_QUIZ_SCORE', this.QUIZ_POINTS);
      console.log('Your score is ---->', this.QUIZ_POINTS, this.artist);
      //this.props.showQuizEnd();
      this.props.history.push('/quizend');
    } else {
    //continue quiz
      this.props.stopQuiz();
      this.launchQuiz();
    }
  }

  render() {
    return <div>
      <div className="loading center-content line">
      <div className="separator50"></div>
      <div className="separator50"></div>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
      <section className="center-content quiz">
      <div className="line">
        <h1 className="col8 offset-left1 animated fadeInDown song">
          {this.state.song}...
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
