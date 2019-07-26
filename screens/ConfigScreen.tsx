import React from 'react';
import { Text, View } from 'react-native';
import { Button} from 'react-native-elements';


class ConfigScreen extends React.Component {
  props: any;
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>config</Text>
        <Button
          // icon={{name: 'mark-twitter', type: 'octicon'}}
          title="Twitter連携"
          onPress={() => this.props.navigation.navigate('twitter')}
        />
        <Button
          title="login"
          onPress={() => this.props.navigation.navigate('login')}
        />
        <Button
          title="signup"
          onPress={() => this.props.navigation.navigate('signup')}
        />
      </View>
    );
  }
}


export default ConfigScreen;