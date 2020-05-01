import React, { Component } from 'react';
// import Biometrics from 'react-native-biometrics';
import { View, Alert, TouchableOpacity, StyleSheet, Text, SafeAreaView, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

class TouchId extends Component {
    constructor(props){
        super(props)
    }

    backHandler = {};

    componentDidMount(){        

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            ()=> {
                console.log(111, this.props.navigation)
                this.props.navigation.navigate("Home")
                return true;
            }
        );
    }

    componentWillUnmount(){
        this.backHandler.remove && this.backHandler.remove()
    }

    async goHome(saveFingerprint){
        if(saveFingerprint){
            await AsyncStorage.setItem('isTouch', "true")  
        }
        this.props.navigation.navigate("Home")
    }


    render(){
        return (
            <SafeAreaView style={{ flex:1, backgroundColor: "#f9faf3" }}>
                <View style={ styles.heder }> 
                    <Text style={{ fontSize: 25, lineHeight:80, fontWeight:"bold", color: "rgba(201, 22, 69, 1)" }}> Setup Biometric Fingerprint </Text> 
                </View>
                <ScrollView >
                    <View style={ styles.container }>
                        <Text style={ styles.title }>Add Your Fingerprint</Text>

                        <Text style={ styles.subtitle }>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
                    </View>
                    <Icon name="fingerprint" size={240}  color="#adadad" style={{ marginLeft:90, paddingTop:10, paddingBottom:20, marginBottom: 25 }} />

                    <TouchableOpacity style={ styles.button } onPress={ this.goHome.bind(this) }>
                        <Text style={ { ...styles.buttonText, color: "rgba(201, 22, 69, 1)" } }> LATER </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={ this.goHome.bind(this, true) } style={ {...styles.button, backgroundColor: "rgba(201, 22, 69, 1)"} }>
                        <Text style={ { ...styles.buttonText, color: "#fff" }}> YES </Text>
                    </TouchableOpacity>
                    <View style={{ width:100, height: 40 }}></View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        alignItems:"center",
        backgroundColor: "#f9faf3",
        height: 'auto',
        width: '100%',
        paddingBottom: 40,
        padding: 20
    },
    heder: {
        width:  '100%',
        height: 80,
        paddingLeft:20,
        backgroundColor: "#fff",
    },
    title: {
        height: 50,
        fontSize: 25,
        fontWeight:"bold",
        marginTop:20,
    },
    subtitle:{
        fontSize:18,
        lineHeight: 30,
        color: "#adadad",
        textAlign:"center",

    },
    button: {
        width: "95%",
        height: 70,
        marginLeft:10,
        borderRadius:5,
        alignItems:"center",
        borderWidth: 2,
        borderColor: "rgba(201, 22, 69, 1)",
        marginBottom: 20
    },
    buttonText:{
        fontSize:22,
        lineHeight:70
    }

})

export default TouchId;