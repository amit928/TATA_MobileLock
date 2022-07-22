import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BASE_URL } from '../constants'
import { StatusBar } from 'expo-status-bar'

const TATA = require('./images/TATA.png')
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userID: "",
            password: ""
        }
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem(
                'MyData',
                JSON.stringify(data)
            );
            this.props.navigation.navigate('Home', { data: data })
        } catch (error) {
            // Error saving data
        }
    };

    onLogin = () => {
        if (this.state.userID.trim() !== '' && this.state.password.trim() !== '') {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "userid": this.state.userID, "password": this.state.password })
            };
            fetch(`${BASE_URL}/api/employeelogin`, requestOptions)
                .then(response => response.json())
                .then(data =>
                    data.Code == '200' ?
                        this._storeData(data)
                        :
                        alert(data.Code)
                )
            // .catch(error => {
            //     console.error('There was an error!', error);
            // });
        }
        else {
            alert("Please fill the input field")
        }

    }

    render() {
        return (
            <View style={{ backgroundColor: "#004342" }}>
                <StatusBar style={{backgroundColor:"#004342"}} />
                <View style={{ alignItems: "flex-start", justifyContent: "flex-end", height: "30%", marginLeft: 30, paddingBottom: 40 }}>
                    <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>Sign In</Text>
                    <Text style={{ color: "white", fontSize: 12, fontWeight: "bold", marginTop: 5 }}>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.</Text>
                </View>
                <View style={{ backgroundColor: "#fff", height: "70%", alignItems: "center", borderTopLeftRadius: 30, borderTopRightRadius: 30, marginHorizontal: 2, justifyContent: "space-evenly" }}>
                    <View>
                        <View style={{ marginVertical: 25 }}>
                            <View style={{ marginVertical: 20 }}>
                                <TextInput style={{ borderRadius: 30, backgroundColor: "#f0f0f0", width: 280, height: 50, paddingLeft: 25 }} placeholder="User ID" onChangeText={(e) => this.setState({ userID: e })} autoCapitalize="characters" />
                            </View>
                            <View>
                                <TextInput style={{ borderRadius: 30, backgroundColor: "#f0f0f0", width: 280, height: 50, paddingLeft: 25 }} placeholder="Password" secureTextEntry={true} onChangeText={(e) => this.setState({ password: e })} />
                            </View>
                            <TouchableOpacity>
                                <Text style={{ textAlign: "right", marginTop: 5 }}>
                                    Forgot Password ?
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: "#004342", borderWidth: 1, borderColor: "#004342", borderRadius: 30, width: 280, height: 50, alignItems: "center", justifyContent: "center" }} onPress={() => this.onLogin()}>
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