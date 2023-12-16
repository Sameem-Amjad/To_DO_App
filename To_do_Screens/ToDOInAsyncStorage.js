import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ToastAndroid,
  TouchableHighlight,
  Pressable,
} from 'react-native';
function ToDoInFlatList() {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(-1);

  const loadData = async () => {
    try {
      if (list) {
        let tasks = JSON.parse(await AsyncStorage.getItem('tasks'));
        if (tasks) setList(tasks);
      }
    } catch (e) {
      ToastAndroid.showWithGravityAndOffset(
        'error catching by getting data from Async storage: ' + e,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        40,
        10,
      );
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const saveList = async tasklist => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasklist));
    } catch (e) {
      ToastAndroid.showWithGravityAndOffset(
        'error catching by saving data in Async storage: ' + e,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        40,
        10,
      );
    }
  };
  const addItem = () => {
    if (item !== '') {
      setList([...list, {data: item, id: Math.random()}]);

      saveList(list);
    }
    setItem('');
    Keyboard.dismiss(true);
    ToastAndroid.showWithGravityAndOffset(
      'Touch the Text item for Update',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      40,
      10,
    );
  };
  const deleteItem = itemList => {
    Keyboard.dismiss(true);
    setList(
      list.filter(item => {
        return item != itemList;
      }),
    );
    saveList(
      list.filter(item => {
        return item != itemList;
      }),
    );
    setEdit(-1);
    setItem('');
  };
  const updateItem = itemList => {
    setEdit(itemList.id);
    setItem(itemList.data);
  };
  const updateList = () => {
    Keyboard.dismiss(true);
    let task = list.map(element =>
      element.id == edit ? (element = {data: item, id: edit}) : element,
    );
    setList(task);
    saveList(task);
    setEdit(-1);
    setItem('');
  };

  return (
    <View>
      <StatusBar backgroundColor="skyblue" barStyle="dark-content" />
      <View style={style.mainView}>
        <Text style={style.mainViewText}>TO-DO AsynchStorage </Text>
      </View>
      <View style={style.mainInputView}>
        <View></View>
        <View style={style.inputView}>
          <TextInput
            onChangeText={setItem}
            placeholder="Enter an Item"
            value={item}
            style={style.textInput}></TextInput>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="grey"
            style={style.button}
            onPress={edit === -1 ? addItem : updateList}>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              {edit === -1 ? `Submit` : `Update`}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={list}
          renderItem={itemList => (
            <TouchableOpacity
              style={style.listView}
              onPress={() => updateItem(itemList.item)}
              key={itemList.item.id}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                  width: '60%',
                }}>
                {itemList.item.data}
              </Text>
              <View style>
                <Pressable
                  style={{
                    padding: '8%',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 20,
                    }}
                    onPress={() => deleteItem(itemList.item)}>
                    🗑
                  </Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={itemList => itemList.id}
        />
      </View>
    </View>
  );
}
export default ToDoInFlatList;
const style = StyleSheet.create({
  mainView: {
    backgroundColor: 'skyblue',
    padding: 10,
  },
  mainViewText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  mainInputView: {
    margin: 5,
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-around',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'skyblue',
    padding: 2,
    width: '70%',
    margin: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'skyblue',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 7,
    borderRadius: 5,
  },
  listView: {
    borderWidth: 2,
    margin: 6,
    padding: 4,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    borderColor: 'skyblue',
    flexDirection: 'row',
    width: '75%',
    borderRadius: 9,
    justifyContent: 'space-around',
  },
});
