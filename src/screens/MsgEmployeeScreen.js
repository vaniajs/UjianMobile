import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Body, Title, Button} from 'native-base';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Fire } from './../support/firebase';
import Communications from 'react-native-communications';


class MsgEmployee extends Component {
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

 sendMsg = (nama, shift ,phone) => {
    Communications.text(phone,`${nama}, your next shift is on ${shift}`)
 }

  render() {
    console.disableYellowBox = true

    
    return (
      <Container>
        <Header>
          <Body style={{flexDirection:'row', justifyContent:'center'}}>
            {/* <Title style={{justifyContent:'flex-end'}}> */}
            <Left> 
              <Title style={{marginLeft:10}}>MESSAGE</Title>
            </Left>
            {/* </Title> */}
          </Body>
        </Header>
        <Content>
          {
            this.state.data!==null?
            <List>
            {
              Object.keys(this.state.data).map((val) => {
              return (
                  <ListItem onPress={()=>this.sendMsg(this.state.data[val].nama,this.state.data[val].shift,this.state.data[val].phone)}>
                 {/* <ListItem onPress={() => this.props.navigation.navigate('detail', {
                  nama: this.state.data[val].nama,
                  shift: this.state.data[val].shift,
                  phone: this.state.data[val].phone
                 })}> */}
                  <Left>
                    <Text>{this.state.data[val].nama}</Text>
                  </Left>
                  <Right>
                    <Icon name="paper-plane" ></Icon>
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

export default connect(mapStateToProps)(MsgEmployee);