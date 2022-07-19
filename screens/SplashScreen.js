import React, { Component } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

const TATA_ICON = require('./images/TATA_ICON.png')
export default class SplashScreen extends Component {
    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.navigate("Welcome")
        }, 5000);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image source={TATA_ICON} style={{ height: 250, width: 250 }} resizeMode="center" />
            </View>
        )
    }
}
