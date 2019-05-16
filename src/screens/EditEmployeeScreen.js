import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Left, Right, Title, Body } from 'native-base';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Fire } from './../support/firebase';

class EditEmployee extends Component {
    // state = {selected: '', idEdit:null, 
    // data: {
    //     1: { nama: 'Fikri', shift: 'Tuesday', phone: "08123456789"},
    //     2: { nama: 'Seto', shift: 'Wednesday', phone: "081356567811" },
    //     3: { nama: 'Andi', shift: 'Saturday', phone: "08185647389" },
    //     4: { nama: 'Steve', shift: 'Sunday', phone: "087884567400" }
    // }}

    state = {data: [], selected: '', idEdit: null, nama: '', phone:''}

    componentDidMount(){
        this.getDatabase()
    }

    getDatabase = () => {
        var db = Fire.database()
        var manager = db.ref(`manager/${this.props.id}/employee`)
        // var manager = db.ref(`manager/${this.props.id}/employee`)
    
    
        manager.on('value', (items) => {
          console.log(items)
          this.setState({ data: items.val() })
        }, (err) => console.log(err))
      }

    //   onSaveBtn = () => {
    //     // alert(this.props.kunci)
    //     var db = fire.database()
    //     db.ref('todo/'+this.props.kunci).set({
    //         todo:this.inputValue
    //     })
    //     .then((res)=>{
    //         alert("sukses edit")
    //         this.setState({modalVisible:false})
    //     })
    //     .catch((err)=>console.log(err))
    // }

      onBtnSave = () => {
        var db = Fire.database()
        db.ref(`manager/${this.props.id}/employee/${this.state.idEdit}`).set({
            nama:this.state.nama?this.state.nama:this.state.data[this.state.idEdit].nama,
            phone: this.state.phone?this.state.phone:this.state.data[this.state.idEdit].phone,
            shift: this.state.selected?this.state.selected:this.state.data[this.state.idEdit].shift
        })
        .then((res)=>{
            alert("Edit Success")
            this.setState({nama:'', phone:''})

            
        })
        .catch((err)=>console.log(err))
      }

    render() {
        console.disableYellowBox=true;
        return (
            <Container>
                <Header>
                <Body><Title style={{marginLeft:10}}>Edit Employee</Title></Body>
                </Header>
                <Content>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{paddingTop:14,paddingLeft:14}}>
                            <Label>Select Employee</Label>
                        </View>
                        <View>
                            <Picker mode='dropdown'style={{width:150}} selectedValue={this.state.idEdit} onValueChange={(val)=>this.setState({idEdit:val})}>
                            <Picker.Item label='Name' value={null}/>

                            {
                                Object.keys(this.state.data).map((val)=>{
                                    return(
                                        <Picker.Item label={this.state.data[val].nama} value={val}/>
                                    )
                                })
                            }

                            </Picker>
                        </View>
                    </View>
                    <Form>
                        <Item stackedLabel>
                            <Label>Nama</Label>
                            <Input defaultValue={this.state.idEdit ? this.state.data[this.state.idEdit].nama : null} onChangeText={(text)=>this.setState({nama:text})}/>
                        </Item>
                        <Item stackedLabel last>
                            <Label>Phone</Label>
                            <Input defaultValue={this.state.idEdit ? this.state.data[this.state.idEdit].phone : null} onChangeText={(text)=>this.setState({phone:text})}/>
                        </Item>

                        <Item>
                            <Left>
                                <Label>Select Day</Label>
                            </Left>
                            <Right>
                                <Picker note style={{ marginTop: 10, width:150}} mode='dropdown' 
                                selectedValue={this.state.idEdit && this.state.selected==null?this.state.data[this.state.idEdit].shift:this.state.selected}
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
                        <TouchableHighlight style={styles.btn} onPress={this.onBtnSave}><Text style={styles.txt}> SAVE </Text></TouchableHighlight>

                    </Form>
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

export default connect(mapStateToProps)(EditEmployee);


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