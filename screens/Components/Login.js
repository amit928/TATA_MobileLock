import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BASE_URL } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { connect } from 'react-redux'
import { onLogin } from '../redux/action'

const loginLogo = require('../images/loginLogo.png')

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userID: "",
            password: ""
        }
    }
 
    logIn = () => {
        if (this.state.userID.trim() !== '' && this.state.password.trim() !== '') {
            var body = JSON.stringify({ "userid": this.state.userID, "password": this.state.password })
            this.props.onLogin(body)
        }
        else {
            alert("Please fill the input field")
        }

    }

    render() {
        return (
            <View style={{ backgroundColor: "#004342" }}>
                <StatusBar style={{ backgroundColor: "#004342" }} />
                <View style={{ height: "100%" }} >
                    <View style={{ alignItems: "flex-start", marginLeft: 30, paddingBottom: 40, marginTop: "30%" }}>
                        <Text style={{ fontSize: 30, color: "white", fontWeight: "900" }}>Sign In</Text>
                        <Text style={{ color: "white", fontSize: 12, fontWeight: "900", marginTop: 5 }}>At Tata the community is central to our existence. This uplifting new film reminds us of our responsibility. We hope it also inspires each of us to contribute to our nation.</Text>
                    </View>
                    <View style={{ backgroundColor: "#fff", height: "70%", alignItems: "center", borderTopLeftRadius: 30, borderTopRightRadius: 30, marginHorizontal: 2 }}>
                        <View >
                            <View style={{ marginVertical: 25 }}>
                                <View style={{ marginVertical: 22 }}>
                                    <TextInput style={{ width: 280, height: 55, paddingLeft: 25, borderWidth: 0, borderRadius: 30, backgroundColor: "#ebebeb" }} placeholder="User ID" onChangeText={(e) => this.setState({ userID: e })} autoCapitalize="characters" />
                                </View>

                                <View>
                                    <TextInput style={{ width: 280, height: 55, paddingLeft: 25, borderWidth: 0, borderRadius: 30, backgroundColor: "#ebebeb" }} placeholder="Password" secureTextEntry={true} onChangeText={(e) => this.setState({ password: e })} />
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ textAlign: "right", marginTop: 10 }}>
                                        Forgot Password ?
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View>
                                <TouchableOpacity style={{ backgroundColor: "#004342", borderWidth: 1, borderColor: "#004342", borderRadius: 30, width: 280, height: 55, alignItems: "center", justifyContent: "center" }} onPress={() => this.logIn()}>
                                    <Text style={{ color: "#fff", fontWeight: "900" }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Image source={loginLogo} style={{ height: 80, width: 200, resizeMode: "center", marginTop: "30%" }} />

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

export const mapStateToProps = () => {
    return {

    };
}

export const mapDispatchToProps = dispatch => {
    return {
        onLogin: (body) => dispatch(onLogin(body))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);