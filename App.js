import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ToDOInScrollView from './To_do_Screens/ToDoInScroolView';
import ToDoInFlatList from './To_do_Screens/ToDOInFlatList';
import {NavigationContainer} from '@react-navigation/native';
import ToDoInAsyncStorage from './To_do_Screens/ToDOInAsyncStorage';
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Async Storage" component={ ToDoInAsyncStorage } />
        <Tab.Screen name='Scroll View' component={ToDOInScrollView}/>
        <Tab.Screen name="FlatList" component={ToDoInFlatList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
