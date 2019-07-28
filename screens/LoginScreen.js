import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button , Text} from 'native-base';
import axios from 'axios'
export default class LoginScreen extends Component {
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
    axios.post('http://ec2-18-223-214-63.us-east-2.compute.amazonaws.com:80/login', { username: this.state.username, password: this.state.password})
      .then( res =>{
        if(res.data==null){
          // this.props.navigation.navigate('home')
          alert('ログインに成功しました')
          this.props.navigation.navigate('home')
        }
      }).catch(e => {
        if (e == 'Error: Request failed with status code 500'){
          console.log(e,'login')
          alert('ユーザー名かパスワードが間違っています')
        }
      }
        );
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
          // onPress={() => {search();}}
          >
            <Text>Login</Text>
          </Button>
          <Text></Text>
          <Text></Text>
          <Button 
          full
          onPress={ () => this.props.navigation.navigate('signup')}
          >
            <Text>アカウント作成画面へ</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}