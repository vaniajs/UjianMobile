import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Body, Title, Icon } from 'native-base';
import { Fire } from './../support/firebase';
import { onLoginSuccess } from './../2.actions';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class RegisterScreen extends Component {

  state = { pass: '', confirm: '', loading: false, error:'' }

  componentDidUpdate(){
    if(this.props.user.id){
      const resetAction = StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({routeName:'home'})]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  onBtnRegisterClick = () => {
    if(this.inputEmail && this.state.pass && this.state.confirm){
      if(this.state.pass == this.state.confirm){
        this.setState({loading:true})
        const auth = Fire.auth()
        auth.createUserWithEmailAndPassword(this.inputEmail, this.state.pass)
        .then((val)=>{
          var {uid,email} = val.user
          console.log(val.user)
          this.props.onLoginSuccess(email,uid)
          this.setState({loading:false})
        })
        .catch((err)=>{
          this.setState({error:err.message, loading:false})
        })
      }else{
        this.setState({error:'Confim Password does not match'})
      }
      
    }else{
      this.setState({error:'All the required fields must be filled'})
    }
    
  }

  render() {
    const confirm = this.state.confirm == '' ? <Item floatingLabel last>
      <Label>Confirm Password</Label>
      <Input secureTextEntry={true} onChangeText={(val) => this.setState({ confirm: val })} />
    </Item> : this.state.confirm !== this.state.pass ? <Item error floatingLabel last>
      <Label>Confirm Password</Label>
      <Input secureTextEntry={true} onChangeText={(val) => this.setState({ confirm: val })} /><Icon name='close-circle'/>
    </Item> : <Item success floatingLabel last>
          <Label>Confirm Password</Label>
          <Input secureTextEntry={true} onChangeText={(val) => this.setState({ confirm: val })} /><Icon name='checkmark-circle'/>
        </Item>

    return (
      <Container>
        <Header>
          <Body><Title style={{ marginLeft: 10 }}>Register</Title></Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.inputEmail = text}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(val) => this.setState({ pass: val })} />
            </Item>
            {confirm}
            {/* <Item stackedLabel last>
              <Label>Confirm Password</Label>
              <Input onChangeText={(val) => this.setState({ confirm: val })} />
            </Item> */}
            <TouchableHighlight style={styles.btn} onPress={this.onBtnRegisterClick}>
            {
              this.state.loading ?
              <ActivityIndicator size='small' color='white'/>
              : <Text style={styles.txt}> R E G I S T E R </Text>
            }
            </TouchableHighlight>

            <View style={styles.txt2}>
              <Text>Have an account already? Login <Text style={styles.txtLink} onPress={() => this.props.navigation.navigate('login')}>here</Text></Text>
            </View>
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
    user: state.auth
  }
}

export default connect(mapStateToProps,{onLoginSuccess})(RegisterScreen);

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
  }
});