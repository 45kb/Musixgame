/*global console require*/
  const express = require('express')
    , request = require('request')
    , cors = require('cors')
    , app = express()
    , API_KEY = 'bf40802cb625030eaa5e7d73148cf5fc'
    , API_URL = 'http://api.musixmatch.com/ws/1.1/';

  app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));

  app.get('/', (req, res) => {
    res.send('it works');
  });

  app.get('/artist', (req, res) => {

    const url = `${API_URL}artist.search?apikey=${API_KEY}&q_artist=${req.query.name}&page_size=3`;

    console.log('-', url);
    request(url,
      (err, response) => {
      if (!err && response && response.body) {
        res.json(response.body);
      } else {
        res.send(err);
      }
    });
  });

  app.get('/artist/albums', (req, res) => {

    const url = `${API_URL}artist.albums.get?apikey=${API_KEY}&artist_id=${req.query.artist_id}`;

    console.log('-', url);
    request(url,
      (err, response) => {
      if (!err && response && response.body) {
        res.json(response.body);
      } else {
        res.send(err);
      }
    });
  });

  app.get('/artist/album/song', (req, res) => {

    const url = `${API_URL}album.tracks.get?apikey=${API_KEY}&album_id=${req.query.album_id}`;

    console.log('-', url);
    request(url,
      (err, response) => {
      if (!err && response && response.body) {
        res.json(response.body);
      } else {
        res.send(err);
      }
    });
  });

  app.get('/artist/song/snippet', (req, res) => {

    const url = `${API_URL}track.snippet.get?apikey=${API_KEY}&track_id=${req.query.track_id}`;

    console.log('-', url);
    request(url,
      (err, response) => {
      if (!err && response && response.body) {
        res.json(response.body);
      } else {
        res.send(err);
      }
    });
  });

  app.listen(3000, () => {
    console.log('API server listening on port 3000!');
  });
