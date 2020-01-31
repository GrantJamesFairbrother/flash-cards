import React, { useReducer, useEffect } from 'react';
import DeckReducer from './DeckReducer';
import DeckContext from './deckContext';
import {
  //GET_DECKS,
  ADD_CARD,
  ADD_NEW_DECK,
  DELETE_DECK,
  NEXT_QUESTION,
  RESET_QUIZ,
  QUIZ_TOTAL
} from './types';
// import {
//   storeDummyData,
//   fetchDecks,
//   dummyData,
//   removeDeck,
//   addDeckAS,
//   addCard
// } from '../utils/api';
import {
  clearLocalNotifications,
  setLocalNotification
} from '../utils/helpers';

const DeckState = props => {
  const initialState = {
    questionCount: 0,
    resultTotal: 0,
    decks: {}
  };

  const [state, dispatch] = useReducer(DeckReducer, initialState);

  useEffect(() => {
    //state.decks === {} && storeDummyData(dummyData);
    //getDecks();
    setLocalNotification();
  }, []);
  // Actions

  // Get Decks
  // const getDecks = async () => {
  //   const decks = await fetchDecks();

  //   dispatch({ type: GET_DECKS, payload: decks });
  // };

  // Add New Card to Deck
  const addNewCard = (title, question, answer) => {
    //addCard(title, question, answer);

    dispatch({ type: ADD_CARD, payload: { title, question, answer } });
  };

  // Create New Deck
  const addDeck = deckTitle => {
    const checkDecks = Object.keys(state.decks).filter(
      deck => deck === deckTitle
    );

    //checkDecks.length === 0 && addDeckAS(deckTitle);
    //getDecks();
    checkDecks.length === 0 &&
      dispatch({ type: ADD_NEW_DECK, payload: deckTitle });
  };

  // Delete a Deck
  const deleteDeck = deckTitle => {
    //removeDeck(deckTitle);

    dispatch({ type: DELETE_DECK, payload: deckTitle });
  };

  // Next Question (Add to questionCount)
  const nextQuestion = () => {
    dispatch({ type: NEXT_QUESTION });
  };

  // Reset Quiz
  const resetQuiz = () => {
    dispatch({ type: RESET_QUIZ });
  };

  // Quiz Total
  const correctAnswer = () => {
    clearLocalNotifications().then(setLocalNotification);
    dispatch({ type: QUIZ_TOTAL });
  };

  return (
    <DeckContext.Provider
      value={{
        decks: state.decks,
        questionCount: state.questionCount,
        resultTotal: state.resultTotal,
        addNewCard,
        addDeck,
        deleteDeck,
        nextQuestion,
        resetQuiz,
        correctAnswer
      }}>
      {props.children}
    </DeckContext.Provider>
  );
};
export default DeckState;

// {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer:
//           'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }
