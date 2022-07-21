import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const TATA_ICON = require('./images/TATA2.png')
const background = require('./images/background.jpeg')

export default class SplashScreen extends Component {
    componentDidMount = () => {
        setTimeout(() => {
            console.log(this.getData())
            this.props.navigation.navigate("Welcome")
        }, 3000);
    }
    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('MyData')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <StatusBar style="light" />
                <ImageBackground source={background} resizeMode="cover" style={{ height: "100%", width: "100%" }}>
                    <Image
                        source={TATA_ICON}
                        style={{ height: 250, width: 250, flex: 1, alignSelf: "center" }} resizeMode="center"
                    />

                </ImageBackground>
            </View>
        )
    }
}
