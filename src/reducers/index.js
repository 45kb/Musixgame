/*global console*/
const initialState = {
  'show': 'quiz',
  'start': false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_QUIZ':
      return Object.assign({}, state, {
        'show': 'quiz'
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
