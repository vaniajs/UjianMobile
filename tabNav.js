import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';


class TabNav extends Component {
    render() {
        return (
            <TabContainer />
        );
    }
}
export default TabNav;

const tab = createMaterialTopTabNavigator({
    home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'HOME',
            tabBarIcon : ({tintColor}) => <Icon name='home' color={tintColor} size={25}/>
        }
    },
    login: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'LOGIN',
            tabBarIcon : ({tintColor}) => <Icon name='sign-in' color={tintColor} size={25}/>
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true,
        activeTintColor : 'orange',
        style : {
            backgroundColor : 'grey'
        },
        indicatorStyle : {
            // position: 'absolute',
            // top: 0,
            height: 5,
            backgroundColor: 'orange'
        }
    }
})

const TabContainer = createAppContainer(tab)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});