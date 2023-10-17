import React, { useState } from 'react';
import
  {
    StatusBar,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,Keyboard
  } from 'react-native';
function App ()
{
  const [ item, setItem ] = useState( '' );

  const [ list, setList ] = useState( [] );
  const [ edit, setEdit ] = useState( -1 );
  const addItem = () =>
  {
    if ( item !== "" )
    {
      setList( [ ...list, item ] );
    }
    Keyboard.dismiss( true );
  };
  const deleteItem = itemList =>
  {
    setList( list.filter( item => item !== itemList ) );

  };
  const updateItem = ( index) =>
  {
    setEdit( index );
    console.log( edit );
  };
  const updateList = (  ) =>
  {
    setList( list.map( ( element, i ) => ( i === edit ? item : element ) ) );
    console.log( list );
    setEdit( -1 );
    setItem( '' );
  };
  return (
    <View>
      <StatusBar backgroundColor="skyblue" barStyle="dark-content" />
      <View style={ style.mainView }>
        <Text style={ style.mainViewText }>TO-DO List sameem</Text>
      </View>
      <View style={ style.mainInputView }>
        <View style={ style.inputView }>
          <TextInput
            onChangeText={ setItem }
            placeholder="Enter an Item"
            value={item}
            style={ style.textInput }>
          </TextInput>
          <TouchableOpacity style={ style.button } onPress={ edit == -1 ? addItem :updateList}>
            <Text style={ { textAlign: 'center' } }>{ edit == -1 ? `Submit` : `Update` }</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={ { alignItems: 'center' } }>
          { list.map( ( itemList, index ) => (
          
              <TouchableOpacity style={ style.listView } onPress={ () => updateItem( index ) } key={ index }>
                <Text style={ { textAlign: 'center', fontSize: 20, fontWeight: "bold",color:"white" } }>{ itemList }</Text>
                <View style>
                  <TouchableOpacity >
                    <Text
                      style={ { textAlign: 'center', color: 'white' } }
                      onPress={ () => ( deleteItem( itemList ) ) }>
                      🗑
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
          ) ) }
        </View></ScrollView>
    </View>
  );
}
export default App;
const style = StyleSheet.create( {
  mainView: {
    backgroundColor: 'skyblue',
    padding: 10,
  },
  mainViewText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
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
    borderColor:'skyblue',
    padding: 2,
    width: '70%',
    margin: 2,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'skyblue',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 7,
    borderRadius: 5,
  },
  listView: {
    borderWidth: 2,
    margin: 4,
    padding: 8,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    borderColor: 'skyblue',
    flexDirection: 'row',
    width: '80%',
    borderRadius: 9,
    justifyContent: 'space-around',
  },

} );
