import React from 'react';
import Tab1Item from './Tab1Item';
import { View } from 'native-base';
import { ScrollView } from 'react-native';

const Tab1 = ({rButton,lButton,title,brand,myGames}) => {
  const tab1 = myGames.map((content, i) => {
    return (
      <View key={i}>
        <Tab1Item 
          content={content}
          rButton={rButton}
          lButton={lButton}
          title={title}
          brand={brand}
        />
      </View>
    );
  });

  return (
    <ScrollView>
      {tab1}
    </ScrollView>
  );
};

export default Tab1;