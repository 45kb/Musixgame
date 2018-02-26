/*global console fetch localStorage*/
/*Quiz component*/
/*The game starts here*/

import React from 'react';
import _ from 'underscore';
import configs from '../../config.json';
/*eslint-disable*/
import {Router} from 'react-router-dom';
/*eslint-enable*/

const WS_URL = configs.WS_URL;

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      'song': false
    };
  }

  componentWillReceiveProps() {
    this.init();
  }

  init() {
    this.QUIZ_ANSWERS = 0;
    this.QUIZ_MAX_ANSWERS = Number(configs.QUIZ_MAX_ANSWERS);
    this.QUIZ_CORRECT_ANSWER_POINTS = Number(configs.QUIZ_CORRECT_ANSWER_POINTS);
    this.QUIZ_POINTS = 0;
    this.launchQuiz();
  }

  launchQuiz() {
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
          , resp4 = await getLyric.json()
          , snippet = JSON.parse(resp4).message.body.snippet.snippet_body;

        if (!snippet ||
          snippet && snippet.length <= 0) {
          throw 'Snippet arrived but is empty :/ :O';
        }
        //GOT SONG LYRIC
        return snippet;
    };

    console.info('Starting quiz');
    this.artists = _.sample(configs.artists, 3);
    this.artist = _.sample(this.artists, 1)[0];

    console.info('Random artists are', this.artists);
    console.info('Correct Answer is ----->', this.artist);

    getSong(this.artist).then(song => {
      this.setState({
        song
      });
      console.info('Song Snippet Lyric is ---->', this.state.song);
    }).catch(err => {
      this.launchQuiz();
      console.warn(err);
    });
  }

  answerQuiz(artist) {
    //increment answers to reach quiz end
    this.setState({
      'song': false
    });

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
      this.props.history.push('/quizend');
    } else {
    //continue quiz
      this.launchQuiz();
    }
  }

  render() {
    return <div>
      <div className={`loading center-content line hide
        ${this.state.song === false ? 'show' : ''}`}>
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
        <h1 className={`col8 offset-left1 animated fadeInDown song hide
            ${this.state.song && this.state.song.length > 0 ? 'show' : ''}`}>
          {this.state.song}...
        </h1>
        <div className="line fixed bottom left">
          <div className={`line animated fadeInUp hide
           ${this.state.song && this.state.song.length > 0 ? 'show' : ''}`}>
        {this.artists.map((artist, index) => {
        return (
          <a className={`line answer-${index}`} key={artist}
            onClick={() => {
              this.answerQuiz(artist);
            }}>
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

export default Quiz;
