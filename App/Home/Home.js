import React, { Component } from 'react';
import { Text, View, StyleSheet,TouchableOpacity, BackHandler } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';
// import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

class HomeScreen extends Component {
    backHandler={}
    constructor(props){
        super(props)
    }
    logout(){
        AsyncStorage.removeItem("token")
        this.props.navigation.navigate("Login")
    }

    componentDidMount(){        

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            ()=> {
                return true;
            }
        );
    }

    componentWillUnmount(){
        this.backHandler.remove && this.backHandler.remove()
    }

    render(){
        return (
            <SafeAreaView style={{ flex:1 }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity style={ {...styles.button, backgroundColor: "rgba(201, 22, 69, 1)"} } onPress={ this.logout.bind(this) }>
                    <Text style={ { ...styles.buttonText, color: "#fff" }}> Logout </Text>
                </TouchableOpacity>
                <View style={{ width:100, height: 40 }}></View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

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

export default HomeScreen;

