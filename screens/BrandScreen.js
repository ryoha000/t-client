import React, { Component } from 'react';
import { ScrollView, Linking } from "react-native";
import { Container, Content, Text , View} from 'native-base';
import axios from 'axios';
export default class BrandScreen extends Component {
constructor(props) {
    super(props);
    this.state = {
    brandGame:[]
    };
}
componentWillMount() {
    axios
        .get(
        "http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/brands/" + this.props.navigation.state.params.brandid
        )
        .then(res => {
        console.log(res.data)
        this.setState({ brandGame: res.data });
        setTimeout(() => console.log(this.state.brandGame), 500);
        })
        .catch(e => console.log(e));
    }
    renderGames(){
        
        return this.state.brandGame.map(data => {
        return  <View>
        <Text 
        // style={{fontSize: RF(4.0)}}
        >{data.gamename.String}</Text>
        <Text>発売日：{data.sellday.String}</Text>
        </View>;
        })

        
}
renderBrand(){
    if((this.state.brandGame[1].twitter.String='') || (this.state.brandGame[1].url.String='' )){
        return <View>
            <Text>このブランドの中央点は{this.state.brandGame[1].median.Int64}です</Text>
        </View>
    }



    if((this.state.brandGame[1].twitter.String='') || (this.state.brandGame[1].url.String!='' )){
        return <View>
        <Text>このブランドの中央点は{this.state.brandGame[1].median.Int64}です</Text>
        <Text
        style={{color:"#0033CC"}}
        onPress={()=>Linking.openURL(this.state.brandGame[1].url.String).catch(err => console.error('URLを開けませんでした。', err))}
        >OHP：{this.state.brandGame[1].url.String}</Text>
        </View>
    }

        
    if((this.state.brandGame[1].twitter.String!='') || (this.state.brandGame[1].url.String!='' )){
        return <View>
        <Text>このブランドの中央点は{this.state.brandGame[1].median.Int64}です</Text>
        <Text
        style={{color:"#0033CC"}}
        onPress={()=>Linking.openURL(this.state.brandGame[1].url.String).catch(err => console.error('URLを開けませんでした。', err))}
        >OHP：{this.state.brandGame[1].url.String}</Text>
        <Text
        style={{color:"#0033CC"}}
        onPress={()=>Linking.openURL(this.state.brandGame[1].url.String).catch(err => console.error('URLを開けませんでした。', err))}
        >Twitter：{this.state.brandGame[1].twitter.String}</Text>
        </View>
    } else {
        return <View>
        <Text>このブランドの中央点は{this.state.brandGame[1].median.Int64}です</Text>
        <Text
        style={{color:"#0033CC"}}
        onPress={()=>Linking.openURL(this.state.brandGame[1].url.String).catch(err => console.error('URLを開けませんでした。', err))}
        >Twitter：{this.state.brandGame[1].twitter.String}</Text>
        </View>
    }
}
    
render() {
    return (
    <Container>
        <Content>
            <Text>{this.state.brandGame[1].brandname}</Text>
        <ScrollView>{this.renderBrand()}</ScrollView>
        <ScrollView>{this.renderGames()}</ScrollView>
        </Content>
    </Container>
    );
}
}
  