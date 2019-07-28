import React from 'react';
// import ReactDOM from 'react-dom';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, AsyncStorage, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_DATA = [
  { title: 'Step: 1', text: 'aaa6' },
  { title: 'Step: 2', text: 'bbb' },
  { title: 'Step: 3', text: 'ccc' },
];


class WelcomeScreen extends React.Component {
  constructor(props) { // ← おまじないの入力 props
    super(props); // ← おまじないの文 super(props);

    // `state`の`isInitialized`を`null`に初期化
    // `AsyncStorage`の'isInitialized'とはまた別物
    this.state = {
      isInitialized: null
    };
  }

  async componentDidMount() {
  // `AsyncStorage`の'isInitialized'から情報を読み込んで`isInitializedString`に保存
    let isInitializedString = await AsyncStorage.getItem('isInitialized');

    // もし`AsyncStorage`の'isInitialized'から読み込んだ情報が'true'だったら
    if (isInitializedString === 'true') {
      // `state`の方の`isInitialized`に`true`と上書き
      this.setState({ isInitialized: true });

      // 'main'画面へ飛ばす
      this.props.navigation.navigate('main');

    // もし`AsyncStorage`の'isInitialized'から読み込んだ情報が'true'じゃなかったら
    } else {
      // `state`の方の`isInitialized`に`false`と上書き
      this.setState({ isInitialized: false });
    }
  }

  onStartButtonPress = async () => {
    await AsyncStorage.setItem('isInitialized', 'true');

    this.props.navigation.navigate('main');
  }

  renderSlides() {
    return SLIDE_DATA.map((slide, index) => {
      return (
        <View
          key={index}
          style={{ flex: 1, backgroundColor: 'skyblue', width: SCREEN_WIDTH }}
        >
          <Text>{slide.title}</Text>
          <Text>{slide.text}</Text>
          <Text>{index + 1} / 3</Text>
          <Button
          title="start!"
          onPress={() => {
            this.props.navigation.navigate('signup');
          }}
          />
        </View>
      );
    });
  }

  render() {
    if (this.state.isInitialized === null) { // ←追記部分
      return <ActivityIndicator size="large" />;
    }

    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

export default WelcomeScreen;
