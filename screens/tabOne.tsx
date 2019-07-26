import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Button, Icon, List, ListItem, Text } from 'native-base';
interface Props{
  myGames:{
    gameid:number;
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
  rButton:(gameid:number) => void;
  // lButton:(gameID:number) => void;
}
interface State{
  basic: boolean;
  listViewData:{
    // myGames:{
      gameid:number;
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
    // }[];
  }[];
}

export default class Tab1 extends Component<Props,State> {
  ds: any;

  constructor(props: Readonly<Props>) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: this.props.myGames,
      // myGames: this.Props.myGames
    };
    console.log(this.state.listViewData,'a')
    console.log(this.props.myGames,'b')
  }
  
  render() {
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            // leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={myGames =>
              <ListItem>
                <Text> {myGames.gamename} </Text>
              </ListItem>}
            // renderLeftHiddenRow={(myGames) =>
            //   <Button full onPress={() => this.props.lButton(myGames.gameID)}>
            //     <Icon active name="arrow-left" />
            //   </Button>}
            renderRightHiddenRow={(myGames) =>
              <Button full onPress={() => this.props.rButton(myGames.gameid)}>
                <Icon active name="arrow-right" />
              </Button>}
          />
        </Content>
      </Container>
    );
  }
}