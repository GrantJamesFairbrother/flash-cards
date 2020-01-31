import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import DeckContext from '../context/deckContext';
import { StyleSheet } from 'react-native';
import TextButton from './TextButton';
import { green, red } from '../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Quiz = props => {
  const deckContext = useContext(DeckContext);

  const { decks, questionCount } = deckContext;

  const title = props.navigation.state.params.deckTitle;
  const questions = decks[title].questions;

  const handleAddCardsRedirect = () => {
    props.navigation.navigate('AddCard', { title: title });
  };

  const handleAnswerCheck = () => {
    props.navigation.navigate('Answer', {
      deckTitle: title
    });
  };

  return questions.length === 0 ? (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, textAlign: 'center' }}>
        No Questions in this Deck
      </Text>
      <TextButton style={styles.addCards} onPress={handleAddCardsRedirect}>
        Add Cards
      </TextButton>
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <Text style={{ marginLeft: 10, fontSize: 20, marginTop: 10 }}>
        {questionCount + 1}/{questions.length}
      </Text>
      <View style={styles.question}>
        <Text
          style={{
            fontSize: 35,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10
          }}>
          {questions[questionCount].question}
          {questions[questionCount].question[
            questions[questionCount].question.length - 1
          ] !== '?' && '?'}
        </Text>
      </View>
      <View style={styles.checkAnswerView}>
        <TouchableOpacity
          onPress={() => handleAnswerCheck()}
          style={styles.checkAnswerBtn}>
          <Text style={styles.checkAnswerBtnText}>Check Answer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCards: {
    padding: 20,
    color: '#fff',
    backgroundColor: green,
    width: 250,
    marginTop: 20,
    fontSize: 25
  },
  question: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkAnswerView: {
    flex: 1,
    alignItems: 'center'
  },
  checkAnswerBtn: {
    width: 250,
    padding: 20,
    elevation: 3,
    borderRadius: 3,
    marginBottom: 10,
    backgroundColor: green
  },
  checkAnswerBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  }
});

export default Quiz;
