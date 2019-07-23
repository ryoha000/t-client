import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';
import Tab4 from './tabFour';


const Bought_INDEX = 0;
const Ari_INDEX = 1;
const Imahax_INDEX = 2;
const Nai_INDEX = 3;
export const datas = [
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
  'Joe Allen',
  'Phil Coutinho',
];
const allWorksTmp = [
  {
    gamename: 'a' ,
    median: 70 ,//中央値
    count2: 50 ,//データ数
    shoukai: 'https://github.com/ryoha000/asari/tree/master/new_application' ,//OHP
    intention: 'bought'
  },
  {
    gamename: '流星ワールドアクター' ,
    median: 90 ,
    count2: 90 ,
    shoukai: 'http://world-actor.com/',
    intention: 'ari'
  },
  {
    gamename: 'c' ,
    median: 50 ,
    count2: 80,
    shoukai: 'expo.io' ,
    intention: 'bought' 
  }
]


class ProfileScreen extends React.Component {

  constructor(props) { 
    super(props); 

    this.state = {
      selectedIndex: 0,
    };
  }

  onListItemPress = (selectedWork) => {
    this.props.navigation.navigate('work');
  }

  renderWorks() {
    let intentionRank;
    switch (this.state.selectedIndex){
      case Bought_INDEX:
       intentionRank = 'bought';
       break;

      case Ari_INDEX:
       intentionRank = 'ari';
       break;

      case Imahax_INDEX:
       intentionRank = 'imahax';
       break;

      case Nai_INDEX:
       intentionRank = 'nai';
       break;

      default:
       break;
    }

    let swipeoutBtns1 = [{
      text:<Icon name='arrow-right'  type='material-community'/>,
      color: '#0000ff',
      // onPress: () => { this._completePhrase({ item, index }) },
    }];

    let swipeoutBtns2 = [{
      text:<Icon name='arrow-left' type='material-community' />,
      color: '#ff0000',
      // onPress: () => { this._completePhrase({ item, index }) },
    }];


    // onListItemPress = (selectedWork) => {
    //   this.props.navigation.navigate('work');
    // }

    let rankedWorks = [];

    for (let i = 0; i < allWorksTmp.length; i++) {
      if (allWorksTmp[i].intention === intentionRank) {
        rankedWorks.push(allWorksTmp[i]);
      }
    }

   return (
    <ScrollView>
      {rankedWorks.map((work, index) => {
          return (
            <Swipeout 
              right={swipeoutBtns1}
              left={swipeoutBtns2}
              autoClose={true}
              backgroundColor='#ffffff' 
              onClose={() => console.log('===close') }
              onOpen={() => console.log('===open') }
            >
            <View
              style={{margin: 0,border: null}}
            >
              <ListItem
              key={index}
              title={work.gamename}
              subtitle={'中央点:'+`${ work.median }`+'点'} 
              onPress={() => this.onListItemPress(work)}
              />
            </View>
            </Swipeout>
          );
        })
      }
    </ScrollView>
   );
  }


 render() {

    let nBought = 0;
    let nAri = 0;
    let nNai = 0;
    let nImahax = 0;

    for (let i = 0; i < allWorksTmp.length; i++) {
      switch (allWorksTmp[i].intention) { 
        case 'bought': 
          nBought++; 
          break; 

        case 'ari': 
          nAri++;
          break;

        case 'nai': 
          nNai++; 
          break; 

        case 'imahax':
          nImahax++;
          break;

        default: // それ以外だったら、
          break; // (特に何もせず)抜け出す
      }
    }

    
    const a =  `購入済み(${nBought})`
    const b =  `興味あり(${nAri})`
    const c =  `今は買わない(${nImahax})`
    const d =  `興味なし(${nNai})`
    return (
      <Container
      backgroundColor='deepskyblue'
      >
        <Tabs locked={true}>
          <Tab heading={a}>
            <Tab1 />
          </Tab>
          <Tab heading={b}>
            <Tab2 />
          </Tab>
          <Tab heading={c}>
            <Tab3 />
          </Tab>
          <Tab heading={d}>
            <Tab4 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


export default ProfileScreen;
