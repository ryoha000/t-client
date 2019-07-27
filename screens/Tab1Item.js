import React, { Component } from 'react';
import { SwipeRow, View, Button, Icon, Text } from 'native-base';

const Tab1Item = ({content,rButton,lButton}) => {
  return (
    <SwipeRow
    leftOpenValue={75}
    rightOpenValue={-75}
    left={
      <Button onPress={() =>lButton(content.gameid)}>
        <Icon active name="arrow-left" />
      </Button>
    }
    body={
      <View>
        <Text>{content.gamename.String}</Text>
      </View>
    }
    right={
      <Button onPress={() =>rButton(content.gameid)}>
        <Icon active name="arrow-right" />
      </Button>
    }
  />
  );
};

export default Tab1Item;