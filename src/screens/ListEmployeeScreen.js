import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Body, Title, Button} from 'native-base';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Fire } from './../support/firebase'

class ListEmployee extends Component {
  // state={ data:{
  //     1:{nama:'Fikri',shift:'tue',phone:'08114232323'},
  //     2:{nama:'Seto',shift:'wed',phone:'081232352323'},
  //     3:{nama:'Tony',shift:'fri',phone:'081141212123'},
  //     4:{nama:'Steve',shift:'mon',phone:'08114223223'},
  //     5:{nama:'Roger',shift:'thurs',phone:'08114333323'}
  // }

  // }

  componentDidMount() {
    this.getDatabase()
  }

  state = { data: [], del: false }

  getDatabase = () => {
    var db = Fire.database()
    var manager = db.ref(`manager/${this.props.id}/employee`)
    // var manager = db.ref(`manager/${this.props.id}/employee`)

    manager.on('value', (items) => {
      console.log(items)
      this.setState({ data: items.val() })
    }, (err) => console.log(err))
  }

  onBtnDelete = (id) => {
    Alert.alert('Delete Employee', `Are you sure to delete ${this.state.data[id].nama}?`,
    [
      {
          text:'Yay',
          onPress: ()=>Fire.database().ref(`manager/${this.props.id}/employee/${id}`).remove()
      },
      {
          text:'Nay'}
      ]
      )
  }
 

  render() {
    console.disableYellowBox = true

    
    return (
      <Container>
        <Header>
          <Body style={{flexDirection:'row', justifyContent:'center'}}>
            {/* <Title style={{justifyContent:'flex-end'}}> */}
            <Right> 
              {
                this.state.del ? <Button onPress={()=>this.setState({del:false})}><Text>CANCEL</Text></Button> :
                <Icon style={{alignSelf:"flex-end"}} name='trash' size={24} color='white' onPress={()=>this.setState({del:true})} />

              }
            </Right>
            {/* </Title> */}
          </Body>
        </Header>
        <Content>
          {
            this.state.data!==null?
            <List>
            {

              this.state.del?
              Object.keys(this.state.data).map((val) => {
                return (
                  <ListItem onPress={() => this.props.navigation.navigate('detail', {
                    nama: this.state.data[val].nama,
                    shift: this.state.data[val].shift,
                    phone: this.state.data[val].phone
                  })}>
                    <Left>
                      <Icon style={{alignSelf:'center', marginRight:10}} name='trash' size={16} color='red' onPress={()=>this.onBtnDelete(val)} />
                      <Text>{this.state.data[val].nama}</Text>
                    </Left>
                    <Right>
                      <Icon name="chevron-right"></Icon>
                    </Right>
                  </ListItem>
                )
              })
              :
              Object.keys(this.state.data).map((val) => {
              return (
                <ListItem onPress={() => this.props.navigation.navigate('detail', {
                  nama: this.state.data[val].nama,
                  shift: this.state.data[val].shift,
                  phone: this.state.data[val].phone
                })}>
                  <Left>
                    <Text>{this.state.data[val].nama}</Text>
                  </Left>
                  <Right>
                    <Icon name="chevron-right"></Icon>
                  </Right>
                </ListItem>
              )
            })

            }
          </List>
          :null
          }
          
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id
  }
}

export default connect(mapStateToProps)(ListEmployee);

// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet
// } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';

// class Home extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.drawer}>
//                     <Icon style={styles.icon} name='bars' size={30} onPress={()=>this.props.navigation.openDrawer()}/>
//                 </View>
//             </View>
//         );
//     }
// }
// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     drawer: {
//         borderBottomWidth: 3,
//         height: 65,
//         justifyContent: 'center',
//         color: 'grey'
//     },
//     icon: {
//         marginLeft: 10,
//     }
// });