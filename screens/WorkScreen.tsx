import React from 'react';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';
import axios from 'axios'
import { Container, Header, Content, Tab, Tabs,Button,Card ,CardItem, List,ListItem} from "native-base";


class WorkScreen extends React.Component {
  state: { game: any; amasuru: any; intention: any[]; };
  props: any;
  constructor(props) {
    super(props);
    this.state = {
      game: undefined,
      amasuru: undefined,
      intention: []
    };
  }
  componentWillMount() {
    axios
      .get(
        "http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/games/" + this.props.navigation.state.params.gameid
      )
      .then(res => {
        this.setState({ game: res.data.game })
        this.setState({ amasuru: res.data.amasuru })
        this.setState({ intention: res.data.intention })
        setTimeout(() => console.log(this.state.game,'b'), 500)
      })
      .catch(e => console.log(e));
  }
  renderGameInfo(){

      return  <View>
      <Text>{this.state.game.gamename.String}</Text>
      <Text>{this.state.game.brandname}</Text>
      <Text>中央値：{this.state.game.median.Int64}点</Text>
      <Text>データ数：{this.state.game.stdev.Int64}</Text>
      <Text>発売日：{this.state.game.sellday.String}</Text>
      </View>;

  }
  // renderPriceInfo(){
  
  //     return  <View>
  //     <Text>Amazon{data.ama.amap}  {data.ama.souryo}  {data.ama.url}</Text>
  //     <Text>駿河屋{data.suru.surup}  {data.suru.url}</Text>
  //     </View>;

  // }
  render() {
    return (
      <Container>{this.renderGameInfo()}</Container>
    );
  }
}


export default WorkScreen;