# Musixgame
### It's a WebApp

> Guess who sings the song.

JS major libraries in use:
React, Redux, Webpack, Express

![](https://i.imgur.com/MJtBirg.png)

## Installation

> $ npm i

## Start server

> $ npm run server

#### server starts at http://localhost:3000


## Start webapp

> $ npm start


#### then browse http://localhost:8080

## Game configuration

Just open and edit the main `config.json` now you can configure:
- the number of answers each quiz must have (quiz duration)
- the points for each correct answer
- api url, key and ws url.

Just open https://github.com/45kb/Musixgame/blob/master/src/reducers/index.js#L5 if you want to change the artists array, these artists could be even took from some database or however dinamically in case.
