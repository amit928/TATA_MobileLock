import React, { Component } from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TATA = require('./images/TATA.png')
export default class WelcomeScreen extends Component {

    render() {
        const { navigation } = this.props
        return (
            <View >
                <View style={{ alignItems: "center", justifyContent: "center", height: "60%" }}>
                    <Image source={TATA} style={{ height: 50, width: 200, resizeMode: "center" }} />
                </View>
                <View style={{ backgroundColor: "#3c9bfa", height: "40%", alignItems: "center", justifyContent: "space-evenly", borderTopLeftRadius: 30, borderTopRightRadius: 30, marginHorizontal: 4 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>Welcome</Text>
                        <Text style={{ color: "white" }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginEnd: 20, borderRadius: 30 }}>
                            <TouchableOpacity style={{ backgroundColor: "#3c9bfa", borderColor: "#fff", borderWidth: 1, borderRadius: 20 }} onPress={() => navigation.navigate("Login")}>
                                <Text style={{ color: "#fff", marginHorizontal: 30, marginVertical: 10, fontWeight: "bold" }}>Admin</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#3c9bfa", borderRadius: 20 }} onPress={() => navigation.navigate("Login")}>
                                <Text style={{ color: "#3c9bfa", marginHorizontal: 30, marginVertical: 10, fontWeight: "bold" }}>Employee</Text>
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