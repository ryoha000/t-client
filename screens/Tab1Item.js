import React, { Component } from 'react';
import { SwipeRow, View, Button, Icon, Text,List,ListItem} from 'native-base';

const Tab1Item = ({content,rButton,lButton,title,brand}) => {
  return (
    <SwipeRow
    leftOpenValue={75}
    rightOpenValue={-75}
    style={{margin:0}}
    left={
      <Button onPress={() =>lButton(content.gameid)}>
        <Icon type="FontAwesome" name="arrow-left" />
      </Button>
    }
    body={
      // <List style={{margin:0}}>
      //   <ListItem header bordered style={{margin:0}}>
          <Text onPress={() => title(content.gameid)} style={{margin:0}}>{content.gamename.String}{"\n"}{content.brandname}      {content.median.Int64}点</Text>
        // </ListItem>
        // <ListItem footer bordered style={{margin:0}}>
        //   <Text onPress={() => brand(content.brandid)} style={{margin:0}}>{content.brandname}</Text>
        // </ListItem> 
      // </List>
    }
    right={
      <Button onPress={() =>rButton(content.gameid)}>
        <Icon type="FontAwesome" name="arrow-right" />
      </Button>
    }
  />
  );
};

export default Tab1Item;