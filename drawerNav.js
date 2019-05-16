// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet,
//     Image
// } from "react-native";

// import HomeScreen from './src/screens/HomeScreen';
// import Login from './src/screens/LoginScreen';

// import { createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation';

// //pake class juga bisa
// const CustomDrawer = (props) => {
//     return(
//         <View style-={{flex:1}}>
//             <View>
//                 <Image style={{height: 50, width:50, margin: 10}} source={{uri:'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg'}}/>
//                 <DrawerItems {...props}/>
//             </View>
//         </View>
//     )
// }

// class DrawerNav extends Component {
//     render() {
//         console.disableYellowBox = true
//         return (
//             <View style={styles.container}>
//                 <Text>HALO</Text>
//             </View>
//         );
//     }
// }

// const Drawer = createDrawerNavigator({
//     home: HomeScreen,
//     login: Login
// },
// {
//     contentComponent: CustomDrawer
// })

// const DrawerContainer = createAppContainer(Drawer)

// export default DrawerContainer;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });