import React from 'react';
import { View, Button } from 'react-native';
import DeckState from './context/DeckState';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import Dashboard from './components/Dashboard';
import AddDeck from './components/AddDeck';
import DeckStatusBar from './components/DeckStatusBar';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import DeckView from './components/DeckView';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { green, white } from './utils/colors';
import Answer from './components/Answer';
import Results from './components/Results';

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='plus-square-o' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      headerShown: false
    },
    tabBarOptions: {
      activeTintColor: white,
      inactiveTintColor: '#000',
      style: {
        height: 56,
        backgroundColor: green,
        shadowRadius: 6,
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        }
      }
    }
  }
);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => navigation.navigate('Decks')}
            tintColor={white}
          />
        ),
        title: 'View Deck',
        headerTintColor: white,
        headerStatusBarHeight: 0,
        headerStyle: {
          backgroundColor: green
        }
      };
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add a New Card',
      headerTintColor: white,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  Answer: {
    screen: Answer,
    navigationOptions: {
      title: 'Answer',
      headerTintColor: white,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: green
      },
      animationEnabled: false
    }
  },
  Results: {
    screen: Results,
    navigationOptions: {
      title: 'Results',
      headerTintColor: white,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: green
      },
      animationEnabled: false,
      headerTitleAlign: 'center',
      headerLeft: () => null
    }
  }
});

const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return (
    <DeckState>
      <View style={{ flex: 1 }}>
        <DeckStatusBar backgroundColor={green} barStyle='light-content' />
        <AppContainer />
      </View>
    </DeckState>
  );
};

export default App;
