import React, { useContext } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';
import DeckContext from '../context/deckContext';
import DecksListItem from './DecksListItem';

const Dashboard = ({ navigation }) => {
  const deckContext = useContext(DeckContext);

  const { decks } = deckContext;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
        <Text style={styles.heading}>DECKS</Text>
      </View>
      {Object.values(decks).map(deck => (
        <DecksListItem key={deck.title} deck={deck} navigation={navigation} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 30,
    textDecorationLine: 'underline'
  }
});

export default Dashboard;
