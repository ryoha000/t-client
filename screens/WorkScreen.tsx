import React from 'react';
import {Text, View } from 'react-native';
import axios from 'axios'
import { Container } from "native-base";

interface Props{
  gameid:number;
  navigation:any;
}
interface State{
  game:{
    gameid?:number;
    gamename?:{
      String:string;
      Valid:boolean;
    };
    sellday?:{
      String:string;
      Valid:boolean;
    };
    brandid?:number;
    brandname?:string;
    median?:{
      Int64:number;
      Valid:boolean;
    };
    stdev?:{
      Int64:number;
      Valid:boolean;
    };
    count2?:{
      Int64:number;
      Valid:boolean;
    };
    shoukai?:{
      String:string;
      Valid:boolean;
    };
  };
  amasuru:{
    ama:{
      amap:string;
      souryo:string;
      url:string;
    };
    suru:{
      surup:number;
      url:string;
    }[];
  }[];
  intention?:number;
}
class WorkScreen extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      game: {},
      amasuru: [],
      intention:undefined
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
    if(this.state.game.gamename){
      if(this.state.game.sellday){
        if(this.state.game.median){
          if(this.state.game.stdev){
            return  <View>
            <Text>{this.state.game.gamename.String}</Text>
            <Text>{this.state.game.brandname}</Text>
            <Text>中央値：{this.state.game.median.Int64}点</Text>
            <Text>データ数：{this.state.game.stdev.Int64}</Text>
            <Text>発売日：{this.state.game.sellday.String}</Text>
            </View>;
          }

          }
        }
      }
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