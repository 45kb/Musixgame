/*global console*/
const initialState = {
  'show': 'quiz',
  'start': false,
  'artists': [
    'Lunapop',
    'Orietta Berti',
    'Verdena',
    'Beastie Boys',
    'Ben Harper',
    'Bloc Party',
    'Eminem',
    'Elvis Presley',
    'Fatboy Slim',
    'Groove Armada',
    'Michael Jackson',
    'Muse',
    'Coldplay',
    'Morcheeba',
    'Led zeppelin',
    'Carmen Consoli',
    'Bob Marley',
    'Gino Paoli',
    'Metallica',
    'Fiorella Mannoia',
    'Frank Sinatra',
    'Andrea Bocelli',
    'Beatles',
    'The Cardigans',
    'The Chemical Brothers',
    'Beck',
    'Smash Mouth',
    'Blur',
    'Limp Bizkit',
    'Cypress Hill',
    'Madonna',
    'Sting',
    'Zucchero',
    'Marshmello',
    'Nirvana',
    'Wiz Khalifa',
    'Jack Johnson'
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_QUIZ':
      return Object.assign({}, state, {
        'show': 'quiz'
      });

    case 'SHOW_QUIZEND':

    return Object.assign({}, state, {
      'show': 'quiz-end'
    });

    case 'SHOW_USER':

    return Object.assign({}, state, {
      'show': 'user'
    });

    case 'SHOW_SCORES':

      return Object.assign({}, state, {
        'show': 'scores'
      });

    case 'START_QUIZ':

      return Object.assign({}, state, {
        'start': true
      });
    case 'STOP_QUIZ':

      return Object.assign({}, state, {
        'start': false
      });

    default:
      console.info('Initial page to show', state);
      return state;
  }
};
