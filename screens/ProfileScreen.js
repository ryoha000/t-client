import { Text, Alert } from "react-native";
import React from "react";
import { Container, Tab, Tabs, Button,Icon } from "native-base";
import axios from "axios";
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
        setTimeout(() => console.log(this.state.myGames.filter(function (item){return (item.intention == 1)})), 500);
      })
      .catch(e => console.log(e));
  }
  rButtonParent = (gameid) => {
    if(this.state.myGames[this.state.myGames.findIndex(e => e.gameid == gameid)].intention != 0){
      this.setState(state => {
        state.myGames[state.myGames.findIndex(e => e.gameid == gameid)].intention = state.myGames[state.myGames.findIndex(e => e.gameid == gameid)].intention -1;
        return { myGames: state.myGames }
      })
      axios.post('http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/rightButton',{gameid:gameid})
    } else {
      alert('そちらへは移動できません')
    }
  };
  lButtonParent = (gameid) => {
    if(this.state.myGames[this.state.myGames.findIndex(e => e.gameid == gameid)].intention != 3){
      this.setState(state => {
        state.myGames[state.myGames.findIndex(e => e.gameid == gameid)].intention = state.myGames[state.myGames.findIndex(e => e.gameid == gameid)].intention +1;
        return { myGames: state.myGames }
      })
      axios.post('http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/leftButton',{gameid:gameid})
    } else {
      alert('そちらへは移動できません')
    }
  };
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
      <Container>
        {/* <ScrollView>{this.renderGames()}</ScrollView> */}
        <Tabs locked={true}>
          <Tab heading={a}>
            <Tab1 
            rButton={this.rButtonParent}
            lButton={this.lButtonParent}
            myGames={this.state.myGames.filter(function (item){return (item.intention == 3)})}
            />
          </Tab>
          <Tab heading={b}>
            <Tab1 
            rButton={this.rButtonParent}
            lButton={this.lButtonParent}
            myGames={this.state.myGames.filter(function (item){return (item.intention == 2)})}
            />
          </Tab>
          <Tab heading={c}>
            <Tab1 
            rButton={this.rButtonParent}
            lButton={this.lButtonParent}
            myGames={this.state.myGames.filter(function (item){return (item.intention == 1)})}
            />
          </Tab>
          <Tab heading={d}>
            <Tab1 
            rButton={this.rButtonParent}
            lButton={this.lButtonParent}
            myGames={this.state.myGames.filter(function (item){return (item.intention == 0)})}
            />
          </Tab>
        </Tabs>
        <Button 
        onPress={() => this.props.navigation.navigate('config')}
        color="#87cefa"
        style={{justifyContent: "center"}}
        >
          <Icon type="FontAwesome" name="cogs"/>
          <Text style={{fontSize:20,color:'white'}}>config</Text>
        </Button>
      </Container>
    );
  }
}

export default ProfileScreen;