import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ActivityIndicator} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Body, Title, Icon} from 'native-base';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { onLoginSuccess } from './../2.actions';
import { StackActions, NavigationActions } from 'react-navigation';
import { Fire } from './../support/firebase';


class LoginScreen extends Component {


  componentDidMount(){
    Fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.onLoginSuccess(user.email, user.uid)
      }else{
        this.setState({loading2:false})
      }
    })
  }

  componentDidUpdate(){
    if(this.props.id){
      const resetAction = StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({routeName:'home'})]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  state = {loading: false, error:'', loading2: true}

  onBtnLogin = () => {
    if(this.inputEmail && this.inputPass){
      this.setState({loading:true})
      const auth = Fire.auth()
      auth.signInWithEmailAndPassword(this.inputEmail, this.inputPass)
      .then((val)=>{
        console.log(val.user)
        this.props.onLoginSuccess(this.inputEmail, val.user.uid)
        this.setState({loading:false})
        this.props.navigation.navigate('home')
      })
      .catch((err)=>{
        this.setState({error:err.message})
      })
    }else{
      this.setState({error:'Please fill all the required fields.'})
    }
    
  }

  render() {
     if (this.state.loading2){
       return(
         <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
           <ActivityIndicator size = 'large' color='#3F51B5'/>
         </View>
       )
     }
    return (
      <Container>
        <Header>
            <Body><Title style={{marginLeft:10}}>
            {

              this.props.email ? this.props.email : 'LOGIN'

            }
            </Title></Body>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.inputEmail = text}/>
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => this.inputPass = text}/>
            </Item>
            <TouchableHighlight style={styles.btn} onPress={this.onBtnLogin}>
            {
              this.state.loading ?
              <ActivityIndicator size='small' color='white'/>
              : <Text style={styles.txt}> L O G I N </Text>
            }
            </TouchableHighlight>

           

            <View style={styles.txt2}>
                <Text>Don't have an account yet? Register <Text style={styles.txtLink} onPress={()=>this.props.navigation.navigate('register')}>here</Text></Text>
            </View>

            <View style={styles.iconParent}>
                <View style={styles.icon}><Icon2 name='facebook' size={35} color='#3F51B5'/></View>
                <View style={styles.icon}><Icon2 name='google' size={35} color='#EA4335'/></View>
                <View style={styles.icon}><Icon2 name='twitter' size={35} color='#1DA1F2' /></View>
            </View>
            {/* <Item>
            <Button style={{width: 300}} block>
                <Text>Primary</Text>
            </Button>
            </Item> */}
          </Form>

          {
              this.state.error ? 
            <View style={{paddingVertical: 15, backgroundColor: 'pink', marginTop:12, width:320, alignSelf:'center'}}>
              <View style={{position:'absolute', alignSelf:'flex-end',marginTop:-12}}><Icon name='close-circle' fontSize={10} style={{color:'red'}} onPress={()=>this.setState({error:''})}/></View>
              <Text style={{color:'red', alignSelf:'center'}}>{this.state.error}</Text>
            </View>
            :
            null

            }
            
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    email: state.auth.email,
    id: state.auth.id
  }
}

export default connect(mapStateToProps,{onLoginSuccess})(LoginScreen);

const styles = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#3F51B5',
        marginTop: 30,
        height: 45,
        width: 400,
        borderRadius: 35
    },
    txt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center'
    },
    txt2: {
        alignSelf: 'center',
        marginTop: 10
    },
    txtLink: {
        color: '#3F51B5'
    },
    iconParent: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10,
    },
    icon: {
        height: 50,
        width: 50,
        margin: 10
    }
});

//TES BUTTON NAVIGATION.NAVIGATE KE PAGE LAIN

// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet,
//     Button
// } from "react-native";

// class Login extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text>Login Page</Text>
//                 <Button title='Register' onPress={()=>this.props.navigation.navigate('register')} />
//                 <Button title='Login' onPress={()=>this.props.navigation.navigate('home')} />
//             </View>
//         );
//     }
// }
// export default Login;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });