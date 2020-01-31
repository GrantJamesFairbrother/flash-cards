import React, { useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DeckContext from '../context/deckContext';
import { StyleSheet } from 'react-native';

const AddCard = props => {
  const deckContext = useContext(DeckContext);

  const { addNewCard } = deckContext;

  const { register, handleSubmit, setValue, reset, watch } = useForm();

  useEffect(() => {
    register('question', { required: true, min: 1 });
    register('answer', { required: true, min: 1 });
  }, [register]);

  const onSubmit = data => {
    addNewCard(props.navigation.state.params.title, data.question, data.answer);

    reset({
      question: '',
      answer: ''
    });

    props.navigation.navigate('DeckView');
  };

  return (
    <View>
      <View style={{ marginTop: 40, paddingLeft: 10 }}>
        <Text style={{ fontSize: 20 }}>Complete form below:</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder='Enter Question'
        autoFocus={true}
        onChangeText={text => {
          setValue('question', text);
        }}
        value={watch().question}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter Answer'
        onChangeText={text => {
          setValue('answer', text);
        }}
        value={watch().answer}
      />
      <TouchableOpacity style={styles.addCard} onPress={handleSubmit(onSubmit)}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 30,
    margin: 10,
    padding: 10,
    fontSize: 25
  },
  addCard: {
    backgroundColor: '#269E53',
    alignItems: 'center',
    alignSelf: 'center',
    width: 250,
    elevation: 3,
    margin: 10,
    padding: 20,
    marginTop: 40
  }
});

export default AddCard;
