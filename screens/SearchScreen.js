import React from 'react';
import { StyleSheet, Text, ScrollView, View, Picker } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements'

const INITIAL_STATE = { 
  // プルダウンメニューが開いてるか閉じてるか
  rangePickerVisible: false,

  searchContent: {
    range: '検索範囲を決めてください',
    word: '',
  }
};
  


export default class SearchScreen extends React.Component {
  state = {
    search: '',
    searchContent: {
      range: null,
      word: null
    },
    rangePickerVisible: false,
  };
  
   updateSearch = search => {
    this.setState({ search });
  };

  renderRangePicker() { 
    if (this.state.rangePickerVisible === true) {
      // プルダウンメニューを描画
      return (
        <Picker
          // 現在の値がPicker内で最初から選択されてるようにする
          selectedValue={this.state.searchContent.range}
          // Picker内で選択されてる値が変わったら、
          onValueChange={(itemValue) => {
            // `this.state.searchContent.range`に引数の`itemValue`をセットする
            this.setState({
              ...this.state, // `this.state`の中身をここに展開
              searchContent: {
                ...this.state.searchContent, // `this.state.searchContent`の中身をここに展開
                range: itemValue
              },
            });
          }}
        >
          <Picker.Item label={INITIAL_STATE.searchContent.range} value={INITIAL_STATE.searchContent.range} />
          <Picker.Item label="ゲーム名" value="gamename" />
          <Picker.Item label="ブランド" value="brandname" />
          <Picker.Item label="POV/タグ" value="pov/tag" />
          <Picker.Item label="キャラクター" value="chara" />
        </Picker>
      );
    }
  }
  
   render() {
     const { search } = this.state;
  
    return (
      <View style={{ flex: 1 }}>
           <ListItem
             title="検索範囲: "
             subtitle={
              <View style={styles.listItemStyle}>
               <Text
                  style={{
                   fontSize: 18,
                    // 現在の選択肢`this.state`が`INITIAL_STATE`のままなら灰色、それ以外の選択肢なら黒色
                   color: this.state.searchContent.range === INITIAL_STATE.searchContent.range ? 'gray' : 'black'
                  }}
               >
                  {this.state.searchContent.range}
               </Text>
              </View>
            }
            // プルダウンメニューが開いてれば上矢印、閉じてれば下矢印
            rightIcon={{ name: this.state.rangePickerVisible === true ? 'keyboard-arrow-up' : 'keyboard-arrow-down' }}
             // 項目欄ListItemを押されたら、
            onPress={() => this.setState((state)=>({
              rangePickerVisible: !state.rangePickerVisible, // プルダウンメニューの開閉を切り替え
           }))}
           />
          {this.renderRangePicker()}
        <SearchBar
          placeholder="Type Here..."
           onChangeText={this.updateSearch}
           value={search}
          lightTheme
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemStyle: { 
    paddingTop: 5,
    paddingLeft: 20
  },
});
