import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Left, Right, Title, Body } from 'native-base';
import { TouchableHighlight, StyleSheet, Text } from 'react-native';
import { Fire } from './../support/firebase';
import { connect } from 'react-redux';

class AddEmployee extends Component {
    state = {selected: ''}

    // getDatabase = () => {
    //     var db = Fire.database()
    //     var manager = db.ref(`manager/${this.props.id}/employee`)
    //     // var manager = db.ref(`manager/${this.props.id}/employee`)
  
  
    //     manager.on('value', (items)=>{
    //         console.log(items)
    //         this.setState({data:items.val()})
    //     },(err)=>console.log(err))
    // }

    addBtnClick = () => {
        var db = Fire.database()
        var manager = db.ref(`manager/${this.props.id}/employee`)    

        manager.push({
            nama: this.inputNama,
            phone: this.inputPhone,
            shift: this.state.selected
        })
        .then((res)=>{
            console.log(res)
            this.inputNama = ''
            this.inputPhone = ''
            this.setState({selected:'Monday'})
            alert('Data Added')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
            <Container>
                <Header>
                <Body><Title style={{marginLeft:10}}>Add Employee</Title></Body>
                </Header>
                <Content >
                    <Form>
                        <Item floatingLabel>
                            <Label>Nama</Label>
                            <Input onChangeText={(text) => this.inputNama = text}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Phone</Label>
                            <Input onChangeText={(text) => this.inputPhone = text}/>
                        </Item>

                        <Item>
                            <Left>
                                <Label>Select Day</Label>
                            </Left>
                            <Right>
                                <Picker note style={{ marginTop: 10, width:150}} mode='dropdown' 
                                selectedValue={this.state.selected}
                                onValueChange={(value)=>this.setState({selected:value})}>
                                    <Picker.Item label='Monday' value='Monday' />
                                    <Picker.Item label='Tuesday' value='Tuesday' />
                                    <Picker.Item label='Wednesday' value='Wednesday' />
                                    <Picker.Item label='Thursday' value='Thursday' />
                                    <Picker.Item label='Friday' value='Friday' />
                                    <Picker.Item label='Saturday' value='Saturday' />
                                    <Picker.Item label='Sunday' value='Sunday' />
                                </Picker>
                            </Right>

                        </Item>
                        <TouchableHighlight onPress={this.addBtnClick} style={styles.btn}><Text style={styles.txt}> ADD </Text></TouchableHighlight>

                    </Form>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(AddEmployee);

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
});