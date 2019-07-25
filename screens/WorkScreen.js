import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


class WorkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: []
    };
  }
  componentWillMount() {
    axios
      .get(
        "http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/mypage"
      )
      .then(res => {
        this.setState({ myGames: res.data });
        setTimeout(() => console.log(this.state.myGames), 500);
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>This is WorkScreen</Text>
      </View>
    );
  }
}


export default WorkScreen;