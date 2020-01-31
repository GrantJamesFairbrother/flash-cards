import {
  //GET_DECKS,
  ADD_CARD,
  ADD_NEW_DECK,
  DELETE_DECK,
  NEXT_QUESTION,
  RESET_QUIZ,
  QUIZ_TOTAL
} from './types';

export default (state, action) => {
  switch (action.type) {
    // case GET_DECKS:
    //   return {
    //     ...state,
    //     decks: action.payload
    //   };
    case ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.payload.title]: {
            title: action.payload.title,
            questions: state.decks[action.payload.title].questions.concat({
              question: action.payload.question,
              answer: action.payload.answer
            })
          }
        }
      };

    case ADD_NEW_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.payload]: {
            title: action.payload,
            questions: []
          }
        }
      };

    case DELETE_DECK:
      delete state.decks[action.payload];
      return {
        ...state
      };

    case NEXT_QUESTION:
      return {
        ...state,
        questionCount: state.questionCount + 1
      };

    case RESET_QUIZ:
      return {
        ...state,
        questionCount: 0,
        resultTotal: 0
      };

    case QUIZ_TOTAL:
      return {
        ...state,
        resultTotal: state.resultTotal + 1
      };

    default:
      return state;
  }
};
