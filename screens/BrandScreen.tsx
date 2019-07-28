import React, { Component } from 'react';
import { ScrollView, Linking , TouchableOpacity} from "react-native";
import { Container, Content, Text , View,Card} from 'native-base';
import axios from 'axios';

interface Props{
navigation:any;
}
interface State{
    brandgame?:{
        gameid:number;
        gamename:{
            String:string;
            Valid:boolean;
        };   
        median:{
            Int64:number;
            Valid:boolean;
        };
        sellday:{
            String:string;
            Valid:boolean;
        };
    }[];
    brandinfo?:{
        brandname:string;
        median:{
            Int64:number;
            Valid:boolean;
        };
        url:{
            String:string;
            Valid:boolean;
        };
        twitter:{
            String:string;
            Valid:boolean;
        };
    };
}
export default class BrandScreen extends Component<Props,State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
        brandgame:[],
        brandinfo:undefined
        };
    }
    componentWillMount() {
        // if(this.state.brandgame==undefined){
         axios
            .get(
            "http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/brands/" + this.props.navigation.state.params.brandid
            )
            .then(res => {
            console.log(res.data)
            this.setState({ brandgame: res.data.brandgame });
            this.setState({ brandinfo: res.data.brandinfo });
            setTimeout(() => console.log(this.state.brandgame), 500);
            setTimeout(() => console.log(this.state.brandinfo), 500);
            })
            .catch(e => {
                if (e == 'Error: Request failed with status code 403'){
                  // this.props.navigation.navigate('signup')
                  console.log(e,'kousin_home')
                }
              });
        // }

    }
    renderGames(){
        if(this.state.brandgame!=undefined){

            return this.state.brandgame.map((data,i) => {

                    
                    return  <TouchableOpacity onPress={() => this.props.navigation.navigate('work',{gameid:data.gameid})}>
                        <Card>
                    <Text 
                    style={{fontSize:18}}
                    >{data.gamename.String}</Text>
                    <Text key={i}>中央値：{data.median.Int64}</Text>
                    <Text key={i}>発売日：{data.sellday.String}</Text>

                        </Card>
                    </TouchableOpacity>;
                    
               
            }) 
        }else {
            return <Text>ii</Text>;
        }
    }
    renderBrand(){
        if(this.state.brandinfo){

            if((!this.state.brandinfo.twitter.Valid) && (!this.state.brandinfo.url.Valid)){
            return <View>
                <Text
                style={{fontSize:26}}
                >{this.state.brandinfo.brandname}</Text>
                <Text
                >このブランドの中央値は{this.state.brandinfo.median.Int64}点です</Text>
            </View>
            }
            if((this.state.brandinfo.twitter.Valid) && (!this.state.brandinfo.url.Valid)){
                return <View>
                    <Text
                    style={{fontSize:26}}
                    >{this.state.brandinfo.brandname}</Text>
                    <Text

                    >このブランドの中央値は{this.state.brandinfo.median.Int64}点です</Text>
                    <Text
                    style={{color:"#0033CC"}}
                    onPress={()=>Linking.openURL('https://twitter.com/' + this.state.brandinfo!.twitter.String).catch(err => console.error('URLを開けませんでした。', err))}
                    >twitter</Text>
                </View>
            }
            if((!this.state.brandinfo.twitter.Valid) && (this.state.brandinfo.url.Valid)){
                return <View>
                    <Text
                    style={{fontSize:26}}
                    >{this.state.brandinfo.brandname}</Text>
                    <Text

                    >このブランドの中央値は{this.state.brandinfo.median.Int64}点です</Text>
                    <Text
                    style={{color:"#0033CC"}}
                    onPress={()=>Linking.openURL(this.state.brandinfo!.url.String).catch(err => console.error('URLを開けませんでした。', err))}
                    >OHP</Text>
                </View>
            }
            if((this.state.brandinfo.twitter.Valid) || (this.state.brandinfo.url.Valid)){
                return <View>
                    <Text
                    style={{fontSize:26}}
                    >{this.state.brandinfo.brandname}</Text>
                    <Text

                    >このブランドの中央値は{this.state.brandinfo.median.Int64}点です</Text>
                    <Text
                    style={{color:"#0033CC"}}
                    onPress={()=>Linking.openURL(this.state.brandinfo!.url.String).catch(err => console.error('URLを開けませんでした。', err))}
                    >OHP</Text>
                    <Text
                    style={{color:"#0033CC"}}
                    onPress={()=>Linking.openURL('https://twitter.com/' + this.state.brandinfo!.twitter.String).catch(err => console.error('URLを開けませんでした。', err))}
                    >twitter</Text>
                </View>
            }
        }
    }
    
render() {
    return (
    <Container>
        <Content>
            {/* <Text>a</Text> */}
            {/* <Text>{this.state.brandgame[1].brandname}</Text> */}
        <ScrollView>{this.renderBrand()}</ScrollView>
        <ScrollView>{this.renderGames()}</ScrollView>
        </Content>
    </Container>
    );
}  
}