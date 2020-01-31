import React, { useContext } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';
import DeckContext from '../context/deckContext';
import DecksListItem from './DecksListItem';
import { green } from '../utils/colors';

const Dashboard = ({ navigation }) => {
  const deckContext = useContext(DeckContext);

  const { decks } = deckContext;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
        <Text style={styles.heading}>DECKS</Text>
        {Object.keys(decks).length === 0 && (
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginTop: 20,
              color: green
            }}>
            Create a New Deck Below
          </Text>
        )}
      </View>
      <FlatList
        data={Object.values(decks)}
        renderItem={deck => (
          <DecksListItem deck={deck} navigation={navigation} />
        )}
        keyExtractor={deck => deck.title}
      />
    </SafeAreaView>
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
