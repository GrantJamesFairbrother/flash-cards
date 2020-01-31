import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DeckContext from '../context/deckContext';
import { useForm } from 'react-hook-form';

const AddDeck = props => {
  const deckContext = useContext(DeckContext);

  const { addDeck } = deckContext;

  const { register, handleSubmit, setValue, reset, watch } = useForm();

  useEffect(() => {
    register('deckTitle', { required: true, min: 1 });
  }, [register]);

  const onSubmit = data => {
    addDeck(data.deckTitle);

    reset({
      deckTitle: ''
    });

    props.navigation.navigate('DeckView', { deckTitle: data.deckTitle });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Text style={styles.title}>New Deck Title:</Text>
        <TextInput
          style={styles.deckInput}
          placeholder='Deck Name'
          onChangeText={text => {
            setValue('deckTitle', text);
          }}
          value={watch().deckTitle}
        />
      </View>
      <View style={{ flex: 2 }}>
        <TouchableOpacity
          style={styles.createDeck}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{ fontSize: 30, color: '#fff' }}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 30
  },
  deckInput: {
    borderColor: '#000',
    borderWidth: 1,
    margin: 20,
    fontSize: 30,
    padding: 20
  },
  createDeck: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 300,
    height: 80,
    backgroundColor: '#269E53',
    elevation: 3
  }
});

export default AddDeck;
