import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import { Fire } from './../support/firebase';
import { connect } from 'react-redux';
import { onLoginSuccess } from './../2.actions';
import { StackActions, NavigationActions} from 'react-navigation'


class MenuAccountSetting extends Component {

    onLogOutPress = () => {
        Fire.auth().signOut()
        .then((val)=> {
            console.log(val)
            this.props.onLoginSuccess('','')
            // this.props.navigation.navigate('login')
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName:'login'})]
            })
            this.props.navigation.dispatch(resetAction)
        })
        .catch((err)=>console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
            <Button onPress={this.onLogOutPress} title="LOGOUT"></Button>
            </View>
        );
    }
}
export default connect(null,{onLoginSuccess})(MenuAccountSetting);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});