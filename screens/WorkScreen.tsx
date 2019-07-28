import React from 'react';
// import RF from "react-native-responsive-fontsize";
import {Text, View, Linking,Image,ScrollView } from 'react-native';
import axios from 'axios'
import { Container,Button,Icon } from "native-base";

interface Props{
  brandid:number;
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
  amasuru?:{
    ama:{
      amap:string;
      souryo:string;
      url:string;
    };
    suru:{
      surup:string;
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
  UNSAFE_componentWillMount() {
    axios
      .get(
        "http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/games/" + this.props.navigation.state.params.gameid
      )
      .then(res => {
        this.setState({ game: res.data.game })
        this.setState({ amasuru: res.data.amasuru })
        this.setState({ intention: res.data.intention })
        setTimeout(() => console.log(this.state.game,'b'), 500)
        setTimeout(() => console.log(this.state.amasuru,'p'), 500)
      })
      .catch(e => {
        if (e == 'Error: Request failed with status code 403'){
          this.props.navigation.navigate('signup')
          console.log(e,'work')
        }
      }
        );
  }
  componentDidUpdate() {

    // props.id が変更されたら再フェッチ
    if (this.props.navigation.state.params.gameid !== this.state.game.gameid) {
      axios
      .get(
        "http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/games/" + this.props.navigation.state.params.gameid
      )
      .then(res => {
        this.setState({ game: res.data.game })
        this.setState({ amasuru: res.data.amasuru })
        this.setState({ intention: res.data.intention })
        setTimeout(() => console.log(this.state.game,'b'), 500)
        setTimeout(() => console.log(this.state.amasuru,'p'), 500)
      })
      .catch(e => {
        if (e == 'Error: Request failed with status code 403'){
          this.props.navigation.navigate('signup')
          console.log(e,'work')
        }
      }
        );
    }
  }
  renderGameInfo(){
    if(this.state.game.gamename){
      if(this.state.game.sellday){
        if(this.state.game.median){
          if(this.state.game.stdev){
            if(this.state.game.shoukai){
              if(this.state.game.shoukai.String != undefined){
                return  <View>
                <Text 
                style={{fontSize:22}}
                >{this.state.game.gamename.String}</Text>
                <Text 
                style={{color:"#0033CC",fontSize:20}}
                onPress={() => this.props.navigation.navigate('brand',{brandid:this.state.game.brandid})}
                >{this.state.game.brandname}</Text>
                <Text>中央値：{this.state.game.median.Int64}点</Text>
                <Text>データ数：{this.state.game.stdev.Int64}</Text>
                <Text>発売日：{this.state.game.sellday.String}</Text>
                <Text 
                onPress={()=>Linking.openURL(this.state.game.shoukai!.String).catch(err => console.error('URLを開けませんでした。', err))}
                style={{color:"#0033CC"}}
                >OHP：{this.state.game.shoukai.String}</Text>
                <Text></Text>
                </View>;
              }
            }
          }
        }
      }
    }
  }
  onClickHandler1 = () => {
    console.log("a")
    axios.post("http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/bought",{gameid:this.state.game.gameid}).catch(e => console.log(e));
    alert('「購入済み」に追加しました')
  }
  onClickHandler2 = () => {
    console.log("b")
    axios.post("http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/ari",{gameid:this.state.game.gameid}).catch(e => console.log(e));
    alert('「興味あり」に追加しました')
  }
  onClickHandler3 = () => {
    console.log("c")
    axios.post("http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/imahax",{gameid:this.state.game.gameid}).catch(e => console.log(e));
    alert('「今は買わない」に追加しました')
  }
  onClickHandler4 = () => {
    console.log("d")
    axios.post("http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/nai",{gameid:this.state.game.gameid}).catch(e => console.log(e));
    alert('「興味なし」に追加しました')
  }
  renderPriceInfo(){
    if(this.state.amasuru!=undefined){    
      // const { width, height } = Dimensions.get('window');
      return this.state.amasuru.map(data1 => {
        const asin=data1.ama.url.substr(42,10);
        console.log(asin)
        return data1.suru.map(data => {
          if(data.surup=='駿河屋無し'){
            return <View>
          <Image style={{width: 350, height: 350,marginBottom:0}} resizeMode='contain' source={{uri:'http://images-jp.amazon.com/images/P/' + asin + '.09.LZZZZZZZ'}}></Image>
          <Text
          onPress={()=>Linking.openURL(data1.ama.url).catch(err => console.error('URLを開けませんでした。', err))}
          style={{marginTop:0,color:"#0033CC",fontSize:18}}
          >{data1.ama.amap} {data1.ama.souryo}</Text>
          <Text>{data.surup}</Text>
        </View>
          } else {
            return <View>
          <Image style={{width: 350, height: 350}} resizeMode='contain' source={{uri:'http://images-jp.amazon.com/images/P/' + asin + '.09.LZZZZZZZ'}}></Image>
          <Text
          style={{color:"#0033CC",fontSize:18}}
          onPress={()=>Linking.openURL(data1.ama.url).catch(err => console.error('URLを開けませんでした。', err))}
          >{data1.ama.amap} {data1.ama.souryo}</Text>
          <Text
          style={{color:"#0033CC",fontSize:18}}
          onPress={()=>Linking.openURL(data.url).catch(err => console.error('URLを開けませんでした。', err))}
          >{data.surup}</Text>
          <Text></Text>
        </View>
          }
        })
      })
    } else {
      return <Text>商品が見つかりませんでした。ダウンロード版のみかもしれません。</Text>
    }
  }
  render() {
    return (
      <Container>
        <ScrollView>
          <View>{this.renderGameInfo()}</View>
          <Button
          onPress={()=>this.onClickHandler1()}
          style={{backgroundColor:'#087bf7',width:240}}
          iconLeft
          rounded
          ><Icon type="FontAwesome5" name="archive"></Icon><Text>「購入済み」に入れる</Text></Button>
          <Button
          onPress={()=>this.onClickHandler2()}
          iconLeft
          rounded
          style={{backgroundColor:'#4d59b9',width:240}}
          ><Icon type="FontAwesome5" name="cart-arrow-down"></Icon><Text>「興味あり」に入れる</Text></Button>
          <Button
          onPress={()=>this.onClickHandler3()}
          iconLeft
          rounded
          style={{backgroundColor:'#ba2257',width:240}}
          ><Icon type="FontAwesome5" name="hourglass-half"></Icon><Text>「今は買わない」に入れる</Text></Button>
          <Button
          onPress={()=>this.onClickHandler4()}
          style={{backgroundColor:'#e20e34',width:240}}
          iconLeft
          rounded
          ><Icon type="FontAwesome5" name="trash"></Icon><Text>「興味なし」に入れる</Text></Button>
          {this.renderPriceInfo()}

        </ScrollView>
      </Container>
    );
  }
}

export default WorkScreen;