import React, { Component } from 'react';
import { ScrollView } from "react-native";
import { Container, Content, Form, Item, Picker,Icon ,Button, Text,Header,Input ,Card, CardItem} from 'native-base';
import axios from 'axios'

interface Props{
  navigation:any;
}
interface State{
  selected2:string;
  word:string;
  kekka:{
      gameid:number;
      gamename:string;
      median:{
        Int64:number;
        Vaild:boolean;
      };
      brandid:number;
      brandname:{
        String:String;
        Valid:boolean;
      };
  }[]
}
export default class SearchScreen extends Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      selected2: "key0",
      word: '',
      kekka:[]
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  _handleTextChange = (word: string) => {
    this.setState({ word });
  };
  _handleSearchResult = (kekka: any) => {
    this.setState({ kekka });
  };
  onClickHandler = () => {
    if (this.state.selected2 == "key0"){
      console.log(this.state.word)
      axios.post('http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/title', {word:this.state.word})
        .then(res => {
          this.setState({ kekka: res.data });
          setTimeout(() => console.log(this.state.kekka),500);
        });
    }
    if (this.state.selected2 == "key1"){
      console.log(this.state.word)
      axios.post('http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/brand', {word:this.state.word})
        .then(res => {
          this.setState({ kekka: res.data });
          setTimeout(() => console.log(this.state.kekka),500);
        });
    }
    if (this.state.selected2 == "key2"){
      const _word = Number(this.state.word)
      console.log(_word)
      if (_word == NaN){
        // alert('数字を入力してください')
      } else {
      axios.post('http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/median', {word:_word, count: 5})
        .then(res => {
          this.setState({ kekka: res.data });
          setTimeout(() => console.log(this.state.kekka),500);
        });
      }
    }
  }
  renderGames() {
    return this.state.kekka.map(data => {
      return <Card>
              <CardItem header bordered>
                <Text onPress={() => this.props.navigation.navigate('work',{gameid:data.gameid})}>{data.gamename}</Text>
              </CardItem>
              <CardItem footer bordered>
                <Text onPress={() => this.props.navigation.navigate('brand',{brandid:data.brandid})}>{data.brandname.String}</Text>
              </CardItem>
            </Card>;
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="検索範囲を選択してください"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="タイトル" value="key0" />
                <Picker.Item label="ブランド" value="key1" />
                <Picker.Item label="点数" value="key2" />
              </Picker>
            </Item>
            <Header searchBar rounded style={styles.headerBackStyle}>
              <Item>
                <Icon name="ios-search" />
                <Input 
                placeholder="Search" 
                value={this.state.word}
                onChangeText={this._handleTextChange}            
                />
              </Item>
              </Header>
              <Button 
              rounded info
              onPress={this.onClickHandler}
              // onPress={() => {search();}}
              >
                <Text>Search</Text>
              </Button>
            
          </Form>
          <ScrollView>{this.renderGames()}</ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = {
  headerBackStyle: {
    backgroundColor: '#f0f8ff',
  }
};