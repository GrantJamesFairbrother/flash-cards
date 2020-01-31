import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import TextButton from './TextButton';
import { red, green, white } from '../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeckContext from '../context/deckContext';

const Answer = props => {
  const deckContext = useContext(DeckContext);

  const {
    decks,
    questionCount,
    resultTotal,
    nextQuestion,
    correctAnswer
  } = deckContext;

  const title = props.navigation.state.params.deckTitle;
  const questions = decks[title].questions;

  const handleQuestionPress = () => {
    props.navigation.goBack();
  };

  const handleCorrectBtnsPress = btnPressed => {
    handleQuestionPress();
    btnPressed === 'Correct' && correctAnswer();
    questionCount + 1 < questions.length
      ? nextQuestion()
      : props.navigation.navigate('Results', {
          totalQuestions: questions.length,
          deckTitle: title
        });
  };

  return (
    <View style={styles.container}>
      <View style={styles.answer}>
        <Text
          style={{
            fontSize: 35,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10
          }}>
          {questions[questionCount].answer}
        </Text>
        <TextButton
          style={{ padding: 10, color: red }}
          onPress={handleQuestionPress}>
          Question
        </TextButton>
      </View>
      <View style={styles.correctBtnsView}>
        <TouchableOpacity
          onPress={() => handleCorrectBtnsPress('Correct')}
          style={[styles.correctBtns, { backgroundColor: green }]}>
          <Text style={styles.correctBtnsText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCorrectBtnsPress()}
          style={[styles.correctBtns, { backgroundColor: red }]}>
          <Text style={styles.correctBtnsText}>Incorrect</Text>
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
  answer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  correctBtnsView: {
    flex: 1,
    alignItems: 'center'
  },
  correctBtns: {
    width: 250,
    padding: 20,
    elevation: 3,
    borderRadius: 3,
    marginBottom: 10
  },
  correctBtnsText: {
    textAlign: 'center',
    color: white,
    fontSize: 20
  }
});

export default Answer;
