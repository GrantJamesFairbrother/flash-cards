import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { white, lightGreen, green } from '../utils/colors';
import DeckContext from '../context/deckContext';

const Results = props => {
  const { deckTitle, totalQuestions } = props.navigation.state.params;

  const deckContext = useContext(DeckContext);

  const { resetQuiz, resultTotal } = deckContext;

  const handleRedirect = destination => {
    resetQuiz();

    destination === 'Redo'
      ? props.navigation.navigate('Quiz', { deckTitle: deckTitle })
      : props.navigation.navigate('Decks');
  };

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text>{`${resultTotal} / ${totalQuestions} Answered Correctly`}</Text>
        <Text style={styles.resultsText}>{`${Math.round(
          (resultTotal / totalQuestions) * 100
        )} %`}</Text>
      </View>
      <View style={styles.redirectBtnsView}>
        <TouchableOpacity
          onPress={() => handleRedirect('Redo')}
          style={[styles.redirectBtns, { backgroundColor: lightGreen }]}>
          <Text style={styles.redirectBtnsText}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRedirect()}
          style={[styles.redirectBtns, { backgroundColor: green }]}>
          <Text style={styles.redirectBtnsText}>Back to Decks</Text>
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
  results: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultsText: {
    fontSize: 50,
    textAlign: 'center'
  },
  redirectBtnsView: {
    flex: 1,
    alignItems: 'center'
  },
  redirectBtns: {
    width: 250,
    padding: 20,
    elevation: 3,
    borderRadius: 3,
    marginBottom: 20
  },
  redirectBtnsText: {
    textAlign: 'center',
    color: white,
    fontSize: 20
  }
});

export default Results;
