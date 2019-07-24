import React from 'react';
// import ReactDOM from 'react-dom';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';



import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen'; 
import SearchScreen from './screens/SearchScreen'; 
import DetailSearchScreen from './screens/DetailSearchScreen';
import WorkScreen from './screens/WorkScreen';
import ProfileScreen from './screens/ProfileScreen';
import TwitterScreen from './screens/TwitterScreen';
import ConfigScreen from './screens/ConfigScreen';
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'


export default class App extends React.Component {
  render() {
    const headerNavigationOptions = {
    headerStyle: {
      backgroundColor: 'deepskyblue',
      marginTop: (0)
    },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  　};

  　const HomeStack = createStackNavigator({
      home: {
        screen: HomeScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: '中古あさり', 
          headerBackTitle: 'Home'
        }
      },
      work: { screen: WorkScreen }
    });

    HomeStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };

    const SearchStack = createStackNavigator({
      search: { screen: SearchScreen ,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: '検索',
          headerBackTitle: 'Search'
          } 
      },
      detail: { screen: DetailSearchScreen ,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: '詳細検索'
          } 
      },
      work: { screen: WorkScreen },
    });

    SearchStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };

    const ProfileStack = createStackNavigator({
      profile: { 
        screen: ProfileScreen ,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'ユーザーページ',
          headerBackTitle: 'Profile'
          } 
      },
      twitter: { 
        screen: TwitterScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Twitter連携',
        },
      },
      config: { screen: ConfigScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Config',
       }
      },
      login: { screen: LoginScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Login',
       }
      },
      work: { screen: WorkScreen },
      signup: { screen: SignupScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Signup',
       }
      },
    });

    ProfileStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };

  const MainTab = createBottomTabNavigator({
    homeStack: { 
      screen: HomeStack ,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ height: 25, width: 25, tintColor: tintColor }}
            source={require('./assets/home.png')}
          />
        ),
        title: 'Home'
      }
    },
    searchStack: { 
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ height: 25, width: 25, tintColor: tintColor }}
            source={require('./assets/search.png')}
          />
        ),
        title: 'Search'
      } 
    },
    profileStack: {
      screen: ProfileStack ,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ height: 25, width: 25, tintColor: tintColor }}
            source={require('./assets/user.png')}
          />
        ),
        title: 'MyPage'
      }
    }
  }, {
    swipeEnabled: false, // Android用
  });

    const NavigatorTab = createAppContainer(
      createSwitchNavigator({
        welcome: { screen: WelcomeScreen },
        main: { screen: MainTab }
      })
    );

    return (
      <View style={styles.container}>
       <StatusBar barStyle="light-content" />
       <NavigatorTab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});