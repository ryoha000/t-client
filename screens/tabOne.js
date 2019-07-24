import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Button, Icon, List, ListItem, Text } from 'native-base';

// export default class Tab1 extends Component {
//   constructor(props) {
//     super(props);
//     this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//     this.state = {
//       basic: true,
//       listViewData: datas,
//     };
//   }
//   deleteRow(secId, rowId, rowMap) {
//     rowMap[`${secId}${rowId}`].props.closeRow();
//     const newData = [...this.state.listViewData];
//     newData.splice(rowId, 1);
//     this.setState({ listViewData: newData });
//   }
//   render() {
//     const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//     return (
//       <Container>
//         <Content>
//           <List
//             leftOpenValue={75}
//             rightOpenValue={-75}
//             dataSource={this.ds.cloneWithRows(this.state.listViewData)}
//             renderRow={data =>
//               <ListItem>
//                 <Text> {data} </Text>
//               </ListItem>}
//             renderLeftHiddenRow={data =>
//               <Button full onPress={() => alert(data)}>
//                 <Icon active name="information-circle" />
//               </Button>}
//             renderRightHiddenRow={(data, secId, rowId, rowMap) =>
//               <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
//                 <Icon active name="trash" />
//               </Button>}
//           />
//         </Content>
//       </Container>
//     );
//   }
// }

const Tab1 = ({myGames}) => {
  const tab1 = myGames.filter(function(item, index){
    if (item.intention == 3)
    return true;
  });
  // function constructor(props) {
  //   super(props);
  //   this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  //   this.state = {
  //     basic: true,
  //     listViewData: datas,
  //   };
  // }
  function deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const contents = tab1.map((content,i) => {
    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={content =>
              <ListItem>
                <Text key={i}> {content.gamename} </Text>
              </ListItem>}
            // renderLeftHiddenRow={data =>
            //   <Button full onPress={() => alert(data)}>
            //     <Icon active name="information-circle" />
            //   </Button>}
            renderRightHiddenRow={(content, secId, rowId, rowMap) =>
              <Button onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="arrow-right" />
              </Button>}
          />
        </Content>
      </Container>
    );
  });
  return (
    <div>
      {contents}
    </div>
  );
};

export default Tab1;