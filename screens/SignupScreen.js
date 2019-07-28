import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button , Text} from 'native-base';
import axios from 'axios'
export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    };
  }
  _handleUNChange = username => {
    this.setState({ username });
  };
  _handlePassChange = password => {
    this.setState({ password });
  };
  onClickHandler = () => {
    axios.post('http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/signup', { username: this.state.username, password: this.state.password})
    .then( res =>{
      // if(res.data==null){
        // this.props.navigation.navigate('login')
        axios.post('http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/login', { username: this.state.username, password: this.state.password})
        .then( res =>{
          
            // this.props.navigation.navigate('home')
            alert('ログインに成功しました')
            this.props.navigation.navigate('home')
          
        }).catch(e =>{
          console.log(e,'signup&login')
        })
      // }
    }).catch(e => {
      console.log(e,'signup')
      if (e=='Error: Request failed with status code 409'){
        alert("ユーザーが既に存在しています")
      }
      if(e=='Error: Request failed with status code 400'){
        alert("項目が空です")
      }
    })
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" 
              value={this.state.username}
              onChangeText={this._handleUNChange}
              />
            </Item>
            <Item last>
              <Input placeholder="Password" 
              value={this.state.password}
              onChangeText={this._handlePassChange}
              />
            </Item>
          </Form>
          <Button 
          full
          onPress={this.onClickHandler}
          >
            <Text>アカウントを作成する</Text>
          </Button>
          <Text></Text>
          <Text></Text>
          <Button 
          full
          onPress={ () => this.props.navigation.navigate('login')}
          >
            <Text>ログイン画面へ</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}