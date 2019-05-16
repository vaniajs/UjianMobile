import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';

class EmployeeDetail extends Component {

    btnMsg = () => {
        const {getParam} =this.props.navigation
        Communications.text(getParam('phone'),`${getParam('nama')}, your next shift will be on ${getParam('shift')}`)
    }

    render() {
        const {getParam} =this.props.navigation
        return (
            <View style={styles.container}>
                <Text>Employee: {getParam('nama')}</Text>
                <Text>Shift: {getParam('shift')}</Text>
                <Text>Phone: {getParam('phone')}</Text>
                <Icon onPress={this.btnMsg} name="paper-plane" size={24} style={{marginTop:10}} />
            </View>
        );
    }
}

export default EmployeeDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


// import React, { Component } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Button
// } from "react-native";
// import MapView, {Marker} from 'react-native-maps'

// class Pemesanan extends Component {

//     // state = {location : null}

//     // onBtnClick = () => {
//     //     navigator.geolocation.getCurrentPosition(value => {
//     //         console.log(value)
//     //         this.setState({location:{
//     //             latitude: value.coords.latitude,
//     //             longitude: value.coords.longitude,
//     //             latitudeDelta: 0.015,
//     //             longitudeDelta: 0.0121,
//     //         }})
//     //     }, err => {
//     //         console.log(err)
//     //     }
//     //     )
//     // }
//     render() {

//         // const initial = {
//         //     latitude: 37.78825,
//         //     longitude: -122.4324,
//         //     latitudeDelta: 0.015,
//         //     longitudeDelta: 0.0121,
//         // }

//         // const obj = this.state.location ? this.state.location : initial
//         // console.disableYellowBox = true;
//         // return (
//         //     <View style={styles.container}>
//         //         <View style={styles.btn}>
//         //             <Button title='Get Current Location' onPress={this.onBtnClick}/>
//         //         </View>
                
//         //         <MapView
//         //             style={styles.map}
                    
//         //             region={obj}
//         //         >
//         //             <Marker coordinate={obj} />
//         //         </MapView>

//         //     </View>
//         // );
//     }
// }
// export default Pemesanan;

// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//         flex: 1

//     },
//     btn : {
//         zIndex: 1
//     }
// });