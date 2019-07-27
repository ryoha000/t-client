import React from 'react';
import { Text ,Image, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';
import {Card} from 'native-base'

interface Props{
  osusume:{
    osusume1:{
      gameid:number;
      gamename:string;
      median:{
        Int64:number;
        Vaild:boolean;
      };
      message:string;
      brandname:string;
    }
    osusume2:{
      aws:string;
    }
  }[];
  navigation:any;
}
interface State{
  osusume:{
    osusume1:{
      gameid:number;
      gamename:string;
      median:{
        Int64:number;
        Vaild:boolean;
      };
      message:string;
      brandname:string;
    }
    osusume2:{
      aws:string;
    }
  }[]
}
class HomeScreen extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      osusume:[]
    };
  }
  componentWillMount() {
    axios
      .get(
        "http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/games/home"
      )
      .then(res => {
        this.setState({ osusume: res.data });
        setTimeout(() => console.log(this.state.osusume), 500);
      })
      .catch(e => console.log(e));
  }
  renderOsusume(){
    if(this.state.osusume!=[]){
      return this.state.osusume.map(data => {
        return <TouchableOpacity onPress={() => this.props.navigation.navigate('work',{gameid:data.osusume1.gameid})}>
        <Card>
          <Image style={{width: 350, height: 350}} resizeMode='contain' source={{uri:'http://images-jp.amazon.com/images/P/' + data.osusume2.aws + '.09.LZZZZZZZ'}}></Image>
          <Text>{data.osusume1.gamename}</Text>
          <Text>{data.osusume1.brandname}</Text>
          <Text>中央点：{data.osusume1.median.Int64}</Text>
          <Text>　　　管理人のオススメポイント</Text>
          <Text>{data.osusume1.message}</Text>
        </Card>
        </TouchableOpacity>
      })
    }
  }
  render() {
    return (
      <ScrollView>
        {this.renderOsusume()}
      </ScrollView>
    );
  }
}


export default HomeScreen;