import React,{Component} from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, StackNavigator } from 'react-navigation'
import LoginScreen from './../screens/LoginScreen';
import Register from './../screens/RegisterPage';
import EmployeeDetailScreen from '../screens/EmployeeDetailScreen';
import ListEmployeeScreen from '../screens/ListEmployeeScreen';
import MenuAccountSetting from '../screens/MenuAccountSetting'
import EditEmployeeScreen from '../screens/EditEmployeeScreen';
import MsgEmployeeScreen from '../screens/MsgEmployeeScreen';
import Menu from '../routes/MenuStack';
import AddEmployeeScreen from '../screens/AddEmployeeScreen';
import { connect } from 'react-redux'

console.disableYellowBox=true; 

const TopTabRiwayat = createStackNavigator({
    menu: MenuAccountSetting
})

const StackBeranda = createStackNavigator({
    MenuStack: Menu,
    add: AddEmployeeScreen,
    edit: EditEmployeeScreen,
    list: ListEmployeeScreen,
    detail: EmployeeDetailScreen,
    msg: MsgEmployeeScreen
},
{   headerMode:'none'
        
    
})

StackBeranda.navigationOptions = ({navigation}) => {
    let tabBarVisible = false
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if(routeName == 'MenuStack'){
        tabBarVisible = true
    }
    return {tabBarVisible}
}

const HomeTab = createMaterialTopTabNavigator({
    home: StackBeranda,
    account: TopTabRiwayat
},{
    tabBarPosition: 'bottom',
    swipeEnabled: false, 
    tabBarOptions: {
        style: {
          backgroundColor: '#3F51B5',
        },
        indicatorStyle:{
            backgroundColor:'white'
        }}
})

// const screen = function(){
//     if(this.props.id!==''){
//         return ('home')
//     }
//     return ('login')
// }
const StackRoot = createStackNavigator({
    login: LoginScreen,
    register: Register,
    home: HomeTab
},{
    headerMode: 'none',
    initialRouteName: 'login'
})

const StackContainer = createAppContainer(StackRoot)

const mapStateToProps = (state) => {
    return{
        id: state.auth.id
    }
}
export default connect(mapStateToProps)(StackContainer);