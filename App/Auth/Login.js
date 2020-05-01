import React, { Component } from 'react';
import { Text, 
    Alert, 
    Button, View, 
    StyleSheet, TextInput, 
    TouchableOpacity, 
    Linking,
    ScrollView } from 'react-native';
import { GetAccess } from './Action';
import AsyncStorage from '@react-native-community/async-storage';
import TouchID from 'react-native-touch-id';

class LoginScreen extends Component {
    state = {
        username: 'int_test_01',
        password: 'test',
        isTouch: false
    };
    constructor(props){
        super(props)

        let isTouch = AsyncStorage.getItem("isTouch").then(touch=> console.log(touch));
        console.log(isTouch)
    }

    async onLogin() {
        const { username, password } = this.state;
        try{
            let token = await GetAccess({ username, password });
            if(token && token.Error == "401"){
                Alert.alert("Auth Error", "Wrong username or password")
                return;
            }
            await AsyncStorage.setItem('token', JSON.stringify(token))
            const isFingerPrint = await AsyncStorage.getItem('isTouch')
            if(!isFingerPrint){
                this.props.navigation.navigate("Touch");
                return;
            }
            this.props.navigation.navigate("Home");
            
        }catch(err){
            Alert.alert("Server Error", "There is some problem with server api. try agaoin later")
        }
    }

    accessByTouch(){
        const optionalConfigObject = {
            title: 'Authentication Required',
            imageColor: '#e00606',
            imageErrorColor: '#ff0000',
            sensorDescription: 'Touch sensor',
            sensorErrorDescription: 'Failed',
            cancelText: 'Cancel',
        };
        TouchID.authenticate('Auth by TouchID', optionalConfigObject)
        .then(success => {
            this.props.navigation.navigate("Home")
        })
        .catch(error => {
            console.log(error)
        });
    }
    async openLink(){
        const url = "https://github.com/aniket-bhange";
        let result = await Linking.canOpenURL(url)
        result && await Linking.openURL(url)
    }

    render(){
        AsyncStorage.getItem("isTouch").then(touch=> this.setState({ isTouch: touch }));
        return (
            <View style={styles.container}>
            <ScrollView>
                <View style={ styles.header }>
                    <Text style={styles.headerTtile}>Welcome to</Text>
                </View>
                <View style={styles.formContainer}>
                    {/*<TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        label='Password'
                        secureTextEntry={true}
                        style={styles.input}
                    />*/}

                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>User Id</Text>
                        <TextInput
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username })}
                        label='Username'
                        style={styles.input}
                        />
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        label='Password'
                        secureTextEntry={true}
                        style={styles.input}
                        />
                    </View>
                    <TouchableOpacity onPress={ this.openLink }>
                        <Text style={styles.linktext}>Forget Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={ this.onLogin.bind(this) }>
                        <Text style={{ fontSize: 25, color: "#fff", marginTop: 8 }}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
                {this.state.isTouch && <View style={ styles.touchContainer }>
                    <View style={ styles.dividerHolder }>
                        <View style={ styles.devider }></View>
                        <Text style={{ fontSize: 20, padding:15, color:"#5F6368" }}>OR LOGIN VIA</Text>
                        <View style={ styles.devider }></View>
                    </View>
                    <TouchableOpacity style={{ marginTop:40, alignItems: "center", flex:1 }} onPress={ this.accessByTouch.bind(this) }>
                        <Text style={{ color: "#39d3f9", fontSize: 20, fontWeight: "bold" }}>TOUCH ID</Text>
                    </TouchableOpacity>
                </View>}

                <TouchableOpacity style={ { flex:1, alignItems: "center", marginTop: 10 } } onPress={ this.openLink }>
                    <Text style={{ fontSize:20 }}>New user? <Text style={styles.linktext}>Signup here</Text></Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
          );
    }
}


const styles = StyleSheet.create({
    formContainer: {
        width:'100%',
        height: 'auto',
        marginTop: 50,
        paddingLeft: 25,
        backgroundColor: "#f9faf3",
        paddingBottom: 20
    },
    container: {
      width:'100%',
      height: 'auto',
      backgroundColor: "#f9faf3",
      paddingBottom: 50
    },

    touchContainer:{
        width: '100%',
        height: 150,
        backgroundColor: "#f9faf3",
        marginTop: 20,
        marginBottom:20
    },
    dividerHolder:{
        width: '100%',
        height: 40,
        backgroundColor: "#f9faf3",
        flex: 1,
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center"
    },
    devider:{
        width: "28%",
        height: 2,
        backgroundColor: "#CCCCD6"
    },
    input: {
        width: '95%',
        height: 70,
        padding: 10,
        fontSize: 20,
        marginBottom: 10,
        borderRadius:9,
        borderWidth: 1,
        borderColor:"#CCCCD6",
        backgroundColor: "#fff",

    },
    linktext: {
        lineHeight:30,
        fontSize: 20,
        color: "#39d3f9",
        marginTop: 20,
        textDecorationStyle: "solid",
        textDecorationLine: "underline"
    },
    inputext: {
      width: 200,
      height: 44,
      padding: 10,
      textAlign:'center',
      fontWeight:'bold',
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    buttonStyle:{
        width: "95%",
        height: 70,
        backgroundColor: "rgba(201, 22, 69, 1)",
        marginTop: 20,
        marginBottom: 10,
        alignItems: "center",
        padding: 10,
        borderRadius: 5
    },
    header: {
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(201, 22, 69, 1)',
        display: "flex",
        flexDirection: "column",
    },

    headerTtile: {
        fontSize:35,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 100,
        marginLeft: 30
    },
    rowContainer:{
        height: 130,
        width: '100%'
    },
    label: {
        flex: 1,
        color: "#5F6368",
        fontSize:22,
        fontWeight:"bold"
    },

  });

export default LoginScreen;