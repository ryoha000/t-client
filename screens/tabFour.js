import React from 'react';
import Tab1Item from './Tab1Item';
import { View } from 'native-base';
import { ScrollView } from 'react-native';

const Tab4 = ({lButton,rButton,myGames}) => {
  const tab1 = myGames.map((content, i) => {
    return (
      <View key={i}>
        <Tab1Item 
          content={content}
          lButton={lButton}
          rButton={rButton}
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

export default Tab4;