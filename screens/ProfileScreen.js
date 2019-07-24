import { StyleSheet, Text, View, ScrollView, Picker } from "react-native";
import React, { Component } from "react";
import { Container, Header, Content, Tab, Tabs,Button,Card ,CardItem} from "native-base";
import axios from "axios";
import PropTypes from "prop-types";
import Tab1 from "./tabOne";
import Tab2 from "./tabTwo";
import Tab3 from "./tabThree";
import Tab4 from "./tabFour";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myGames: []
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
  renderGames() {
    return this.state.myGames.map(data => {
      return <Card>
              <CardItem header bordered>
                <Text onPress={() => this.props.navigation.navigate('work')}>{data.gamename.String}</Text>
              </CardItem>
              <CardItem footer bordered>
                <Text>{data.brandname}</Text>
              </CardItem>
            </Card>;
    });
  }

  // rightButtonFunc() {
  //   this.setState({ myGames: this.intention-1 });
  // }
  // leftButtonFunc() {
  //   this.setState({ myGames: this.intention+1 });
  // }
  render() {
    let nBought = 0;
    let nAri = 0;
    let nNai = 0;
    let nImahax = 0;

    for (let i = 0; i < this.state.myGames.length; i++) {
      switch (this.state.myGames[i].intention) {
        case 3:
          nBought++;
          break;

        case 2:
          nAri++;
          break;

        case 0:
          nNai++;
          break;

        case 1:
          nImahax++;
          break;

        default:
          // それ以外だったら、
          break; // (特に何もせず)抜け出す
      }
    }
    const a = `購入済み(${nBought})`;
    const b = `興味あり(${nAri})`;
    const c = `今は買わない(${nImahax})`;
    const d = `興味なし(${nNai})`;
    return (
      <Container backgroundColor="#00CCFF">
        <ScrollView>{this.renderGames()}</ScrollView>
        <Button onPress={() => this.props.navigation.navigate('config')}>
          <Text>config</Text>
        </Button>
        {/* <Tabs locked={true} backgroundColor='#00CCFF'>
          <Tab heading={a} backgroundColor='#00CCFF'>
            <Tab1 myGames={this.state.myGames}/>
          </Tab>
          <Tab heading={b}>
            <Tab2 myGames={this.state.myGames}/>
          </Tab>
          <Tab heading={c}>
            <Tab3 myGames={this.state.myGames}/>
          </Tab>
          <Tab heading={d}>
            <Tab4 myGames={this.state.myGames}/>
          </Tab>
        </Tabs> */}
      </Container>
    );
  }
}

export default ProfileScreen;
