import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { BackHandler, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TATA = require('../images/TATA.png')
export default class WelcomeScreen extends Component {


    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        BackHandler.exitApp()
        return true
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }


    render() {
        const { navigation } = this.props
        return (
            <View >
                <StatusBar style={{ backgroundColor: "004342" }} />
                <View style={{ alignItems: "center", justifyContent: "center", height: "60%" }}>
                    <Image source={TATA} style={{ height: 50, width: 200, resizeMode: "center" }} />
                </View>
                <View style={{ backgroundColor: "#004342", height: "40%", alignItems: "center", justifyContent: "space-evenly", borderTopLeftRadius: 30, borderTopRightRadius: 30, marginHorizontal: 4 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>Welcome</Text>
                        <Text style={{ color: "white" }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginEnd: 20, borderRadius: 30 }}>
                            <TouchableOpacity style={{ backgroundColor: "#004342", borderColor: "#fff", borderWidth: 1, borderRadius: 20 }} onPress={() => navigation.navigate("Login")}>
                                <Text style={{ color: "#fff", marginHorizontal: 30, marginVertical: 10, fontWeight: "bold" }}>Admin</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#004342", borderRadius: 20 }} onPress={() => navigation.navigate("Login")}>
                                <Text style={{ color: "#004342", marginHorizontal: 30, marginVertical: 10, fontWeight: "bold" }}>Employee</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
    logo: {
        width: 66,
        height: 58,
    },
});