import React, { useState } from 'react';
import { Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DecksListItem = ({ deck, navigation }) => {
  const { navigate } = navigation;

  const [bounceValue, setBounceValue] = useState(new Animated.Value(1));

  const handleDeckViewPress = () => {
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start();

    navigate('DeckView', { deckTitle: deck.title });
  };

  return (
    <TouchableOpacity
      style={styles.deckCard}
      onPress={() => handleDeckViewPress()}>
      <Animated.Text
        style={[styles.title, { transform: [{ scale: bounceValue }] }]}>
        {deck.title}
      </Animated.Text>
      <Text style={styles.center}>
        {deck.questions.length} Card{deck.questions.length !== 1 && 's'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deckCard: {
    alignItems: 'stretch',
    backgroundColor: '#F1F1F1',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 5,
    margin: 5,
    paddingTop: 30,
    paddingBottom: 30
  },
  title: {
    textAlign: 'center',
    fontSize: 40
  },
  center: {
    textAlign: 'center'
  }
});

export default DecksListItem;
