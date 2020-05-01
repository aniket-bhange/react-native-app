import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview'
import Swiper from "react-native-swiper";
import { GetBills } from './Action';


class BillScreen extends Component {

    state = {
        bills: []
    }
    constructor(props){
        super(props)
    }

    onTabChange(event){
        console.log(event)
    }

    async componentDidMount(){
        try{
            const bills = await GetBills({});
            console.log(bills)
            this.setState({ bills: bills })
        }catch(err){
            console.log(err)
        }
        
    }

    render(){
        let vBills = (!this.state.bills.length) ? (
            <View style={ styles.slideHolder }>
                <CardView style={ styles.slideContainer }
                cardElevation={9}
                cardMaxElevation={9}
                cornerRadius={10}>
                <Text style={{ ...styles.text, fontSize: 32, fontWeight:"bold", color: "#565656"}}> No Items </Text>
                <Icon name="file-text-o" color='#565656' size={100} style={[]}/>
                </CardView>
            </View>
        ) : (this.state.bills.map((bill, idx)=> (<View style={ styles.slideHolder } key={idx}>
            <CardView style={ styles.slideContainer }
            cardElevation={9}
            cardMaxElevation={9}
            cornerRadius={10}>
                <Text style={{ ...styles.text, fontSize: 22, fontWeight:"bold", color: "#565656"}}><Icon name="file-text" color='#565656' size={18}></Icon> { bill.billNo }</Text>
                <Text style={ { ...styles.text, fontWeight:"bold", fontSize: 42} }>${ bill.dueAmount }</Text>
                <Text style={ styles.text }><Icon name="calendar" color='#565656' size={18} ></Icon> { bill.dueDate }</Text>
            </CardView>
        </View>)) )

        return (
            <SafeAreaView style={{ flex:1, backgroundColor:"rgba(201, 22, 69, 1)" }}>
                <ScrollableTabView 
                    style={styles.container}
                    renderTabBar={()=><DefaultTabBar backgroundColor='rgba(201, 22, 69, 1)' />}
                    tabBarPosition='overlayTop'
                    tabBarUnderlineStyle={{ backgroundColor: "#f9bf5a", width: 100 }}
                    tabBarActiveTextColor="#fff"
                    tabBarInactiveTextColor="#380513"
                    tabBarInActiveStyle={{ fontSize: 20 }}
                    tabBarTextStyle={{ fontSize:25 }}
                    onChangeTab={this.onTabChange}
                >
                    <ScrollView tabLabel='Current Bill' style={ {backgroundColor:'#f9faf3'} }>
                        <View style={ styles.current }>
                            <CardView
                            style={ styles.icon }
                            cardElevation={7}
                            cardMaxElevation={7}
                            cornerRadius={5}>
                                <View style={ styles.accessiblity }>
                                    <Icon name="hospital-o" color='rgba(201, 22, 69, 1)' size={46}></Icon>
                                    <Icon name="file-text-o" color='rgba(201, 22, 69, 1)' size={46}></Icon>
                                    <Icon name="envelope-open-o" color='rgba(201, 22, 69, 1)' size={46}></Icon>
                                    <Icon name="user-md" color='rgba(201, 22, 69, 1)' size={46}></Icon>
                                </View>
                            </CardView>
                        </View>
                        <View style={styles.swiperContainer}>
                            <Swiper showsPagination={true} loop={false} key={ this.state.bills.length }>
                                {vBills}
                          </Swiper>
                        </View>

                        <View style={ { marginTop:35, marginBottom: 35 } }>
                            <CardView style={ styles.addContainer }
                            cardElevation={7}
                            cardMaxElevation={7}
                            cornerRadius={5}>
                            
                            </CardView>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel='Past Bill' style={ {backgroundColor:'#f9faf3'} }>
                        <View style={{...styles.current, flex:1, backgroundColor:'#fafafa'}}>
                            
                        </View>
                    </ScrollView>
                </ScrollableTabView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 90,
        backgroundColor:'#fefefe'
    },
    icon: {
        width: 400,
        height: 100,
        alignSelf: 'center',
        marginBottom: 30
    },
    text: {
        color: "#333334",
        fontSize: 18,
        paddingTop: 10,
        paddingBottom:10,
        width: '100%',
        textAlign: "center"
    },
    current:{
        marginTop: 80,
        width: '100%',
        height: 'auto',
        backgroundColor: '#f9faf3'
    },
    accessiblity: {
        width: "100%",
        height:100,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        
    },
    slideContainer: {
        width: '80%',
        height: 300,
        alignSelf: 'center',
        backgroundColor: '#fefefe',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },

    addContainer: {
        width: '80%',
        height: 400,
        alignSelf: 'center',
        backgroundColor: '#ebede1',

    },

    slideHolder: {
        width: '100%',
        height: 300,
    },
    swiperContainer:{
        width: '100%',
        height: 320,
        marginTop: 20,
    },
    shadow: {
        
        textShadowOffset: { width: 1, height: 1, },
        textShadowRadius: 6.27,
        textShadowColor: 'rgba(0,0,0,0.34)',
        elevation: 10,
    }
});

export default BillScreen;