import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './Auth/Login';
import HomeScreen from './Home/Home';
import BillScreen from './Bill/Bill';
import { View, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TouchId from './Auth/TouchId';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const Home = ()=>{
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              size = size+3
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home';
              } else if (route.name === 'Bill') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            })}
            tabBarOptions={{
              activeTintColor: 'black',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Bill" component={BillScreen} />
        </Tab.Navigator>
    )
}

const BlankScreen = ({ navigation })=> {

    AsyncStorage.getItem('token')
    .then(result=> {
        const token = JSON.parse(result)
        if(token && token.jwt){
            navigation.navigate('Home')
            return;
        }
        navigation.navigate('Login')
    }).catch(err=> console.log(err))

    return (
        <View></View>
    )
}

export const RootStack = ()=> {
    return (
        <NavigationContainer>        
        <Stack.Navigator initialRouteName="Blank" screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Blank" component={BlankScreen}  />
            <Stack.Screen name="Touch" component={TouchId} options={{ mode: "modal" }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        </NavigationContainer>

    )
}