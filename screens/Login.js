import React, { Component } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const TATA = require('./images/TATA.png')
export default class Login extends Component {

    render() {
        const { navigation } = this.props
        return (
            <View style={{ backgroundColor: "#3c9bfa" }}>
                <View style={{ alignItems: "flex-start", justifyContent: "flex-end", height: "30%", marginLeft: 30, paddingBottom: 40 }}>
                    <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>Sign In</Text>
                    <Text style={{ color: "white", fontSize: 12, fontWeight: "bold", marginTop:5 }}>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.</Text>
                </View>
                <View style={{ backgroundColor: "#fff", height: "70%", alignItems: "center", borderTopLeftRadius: 30, borderTopRightRadius: 30, marginHorizontal: 2, justifyContent: "space-evenly" }}>
                    <View>
                        <View style={{ marginVertical: 25 }}>
                            <View style={{ marginVertical: 20 }}>
                                <TextInput style={{ borderRadius: 30, backgroundColor: "#f0f0f0", width: 280, height: 50, paddingLeft: 25 }} placeholder="Username" />
                            </View>
                            <View>
                                <TextInput style={{ borderRadius: 30, backgroundColor: "#f0f0f0", width: 280, height: 50, paddingLeft: 25 }} placeholder="Password" secureTextEntry={true} />
                            </View>
                            <TouchableOpacity>
                                <Text style={{ textAlign: "right", marginTop: 5 }}>
                                    Forgot Password ?
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: "#3c9bfa", borderWidth: 1, borderColor: "#3c9bfa", borderRadius: 30, width: 280, height: 50, alignItems:"center", justifyContent:"center" }} onPress={() => navigation.navigate("Home")}>
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", height: "40%" }}>
                        <Image source={TATA} style={{ height: 50, width: 200, resizeMode: "center" }} />
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