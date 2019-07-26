import React, { Component } from 'react';
import { ListView } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, Button, Icon, List, ListItem, Text } from 'native-base';
const propTypes = {
  myGames: PropTypes.func,
};
interface Props{
  myGames:{
    gameID:number;
    gamename:{
      String:string;
      Valid:boolean;
    };
    median:{
      Int64:number;
      Vaild:boolean;
    };
    intention:number;
    brandname:string;
  }[];
  rButton:(gameid:number) => number;
  lButton:(gameid:number) => number;
}
interface State{
  basic: boolean;
  listViewData:{
    myGames:{
      gameID:number;
      gamename:{
        String:string;
        Valid:boolean;
      };
      median:{
        Int64:number;
        Vaild:boolean;
      };
      intention:number;
      brandname:string;
    };
  }
}

export default class Tab2 extends Component<Props,State> {
  ds: any;

  constructor(Props) {
    super(Props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.State = {
      basic: true,
      listViewData: this.Props.myGames,
      // myGames: this.Props.myGames
    };
    console.log(this.State.listViewData,'a')
    console.log(this.Props.myGames,'b')
  }
  
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.State.listViewData)}
            renderRow={myGames =>
              <ListItem>
                <Text> {myGames.gamename} </Text>
              </ListItem>}
            // renderLeftHiddenRow={data =>
            //   <Button full onPress={() => alert(data)}>
            //     <Icon active name="information-circle" />
            //   </Button>}
            renderRightHiddenRow={() =>
              <Button full danger onPress={() => this.Props.rButton()}>
                <Icon active name="arrow-right" />
              </Button>}
          />
        </Content>
      </Container>
    );
  }
}