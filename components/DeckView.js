import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeckContext from '../context/deckContext';
import { green, lightGreen, red } from '../utils/colors';
import TextButton from './TextButton';

const DeckView = props => {
  const deckContext = useContext(DeckContext);

  const { decks, deleteDeck, resetQuiz } = deckContext;

  const title = props.navigation.state.params.deckTitle;
  let questions = [];

  if (decks[title]) questions = decks[title].questions;

  const handleDeletePress = () => {
    deleteDeck(title);

    props.navigation.navigate('Decks');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.center, { justifyContent: 'center' }]}>
        <Text style={styles.title}>{title}</Text>
        <Text>
          {questions.length} Card{questions.length !== 1 && 's'}
        </Text>
      </View>
      <View style={styles.center}>
        <View>
          <TouchableOpacity
            style={styles.addCard}
            onPress={() =>
              props.navigation.navigate('AddCard', { title: title })
            }>
            <Text style={styles.btnText}>Add Card</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.startQuiz}
            onPress={() => {
              resetQuiz();
              props.navigation.navigate('Quiz', { deckTitle: title });
            }}>
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <TextButton
          style={{ padding: 10, color: red }}
          onPress={handleDeletePress}>
          Delete Deck
        </TextButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    color: '#269E53'
  },
  addCard: {
    width: 200,
    height: 50,
    backgroundColor: lightGreen,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  startQuiz: {
    width: 200,
    height: 50,
    backgroundColor: green,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  btnText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default DeckView;
