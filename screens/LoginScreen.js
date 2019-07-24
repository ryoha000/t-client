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
          rounded 
          onPress={this.onClickHandler}
          // onPress={() => {search();}}
          >
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}