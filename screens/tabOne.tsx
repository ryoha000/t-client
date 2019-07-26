import React, { Component } from 'react';
import { ListView } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, Button, Icon, List, ListItem, Text } from 'native-base';
const propTypes = {
  myGames: PropTypes.func,
};

export default class Tab1 extends Component {
  state: any;
  ds: any;
  props: any;
  static propTypes: { myGames: any; };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: this.props.myGames,
      // myGames: this.props.myGames
    };
    console.log(this.state.listViewData,'a')
    console.log(this.props.myGames,'b')
  }
  
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={myGames =>
              <ListItem>
                <Text> {myGames.gamename} </Text>
              </ListItem>}
            // renderLeftHiddenRow={data =>
            //   <Button full onPress={() => alert(data)}>
            //     <Icon active name="information-circle" />
            //   </Button>}
            renderRightHiddenRow={() =>
              <Button full danger onPress={() => this.props.rButton()}>
                <Icon active name="arrow-right" />
              </Button>}
          />
        </Content>
      </Container>
    );
  }
}
Tab1.propTypes = propTypes