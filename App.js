// import React, { Component } from "react";
// import { 
//   View,
//   Text,
//   StyleSheet,
//   Button
// } from "react-native";
// import { createStackNavigator, createAppContainer } from "react-navigation";




// class LoginPage extends Component {
//   handleButton=()=>{
//     this.props.navigation.navigate('home')
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>LoginPage</Text>
//         <Button title='Ke Halaman Home' onPress={this.handleButton}></Button>
//       </View>
//     );
//   }
// }

// class HomePage extends Component {
//   handleButton=()=>{
//     this.props.navigation.navigate('login')
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>HomePage</Text>
//         <Button title='Ke Halaman Login' onPress={this.handleButton}></Button>
//       </View>
//     );
//   }
// }

// const stack = createStackNavigator({
//   home : {
//     screen: HomePage,
//     navigationOptions: {
//       title: 'HOME'
//     }
//   },
//   login : LoginPage
// },
// {
//   initialRouteName : 'home'
// }
// )

// const stackContainer = createAppContainer(stack)
// export default stackContainer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });

import React, {Component} from 'react';
import StackContainer from './src/routes/StackRoot';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducer from './src/1.reducers';

const store = createStore(Reducer, {}, applyMiddleware(ReduxThunk))

class App extends Component{
  
  render(){
    return(
      <Provider store={store}>
        <StackContainer/>
      </Provider>
    )
  }
};

export default App;
