import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableHighlight
} from "react-native";
// import { TouchableHighlight } from "react-native-gesture-handler";
// import { Button } from "native-base";

class MenuStack extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 100, marginHorizontal: 20 }}>
                    <TouchableHighlight style={{ height: 100, width: 100, backgroundColor: '#3F51B5', borderRadius: 25, justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('list')}><Text style={{ alignSelf: 'center', color: 'white' }}>LIST</Text></TouchableHighlight>
                    <TouchableHighlight style={{ height: 100, width: 100, backgroundColor: '#3F51B5', borderRadius: 25, justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('add')}><Text style={{ alignSelf: 'center', color: 'white' }}>ADD</Text></TouchableHighlight>
                    <TouchableHighlight style={{ height: 100, width: 100, backgroundColor: '#3F51B5', borderRadius: 25, justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('edit')}><Text style={{ alignSelf: 'center', color: 'white' }}>EDIT</Text></TouchableHighlight>
                </View>
                <View style={styles.btn}>
                <TouchableHighlight style={{alignSelf:'center',padding: 20, width: 380, height: 50, backgroundColor: '#3F51B5', borderRadius: 15, justifyContent: 'center' }} onPress={()=>this.props.navigation.navigate('msg')} ><Text style={{ alignSelf: 'center', color: 'white' }}>MESSAGE EMPLOYEE</Text></TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default MenuStack;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btn: {
        justifyContent:'center',
        marginTop: 20,
        flex:1,
        flexDirection: 'column'
    }
});