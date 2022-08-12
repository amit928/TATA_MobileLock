import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { getData } from '../redux/action';
const TATA_ICON = require('../images/TATA2.png');
const background = require('../images/background.jpeg');
import { connect } from 'react-redux';

class SplashScreen extends Component {
    componentDidMount = () => {
        setTimeout(() => {
            this.props.getData()
        }, 3000);
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

const mapStateToProps = store => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(getData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
