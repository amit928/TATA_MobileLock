import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Icon } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { Image } from 'native-base'

export default class Profile extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "#e3e3e3" }}>
                <StatusBar style={{ backgroundColor: "#004342" }} />
                <View style={{ height: "100%", width: "100%" }}>
                    <View style={{ height: "35%", width: "99%", alignSelf: "center", backgroundColor: "#004342", borderBottomEndRadius: 30, borderBottomLeftRadius: 30 }}>
                    </View>
                    <View style={{ backgroundColor: "white", height: "20%", borderRadius: 25, width: "80%", alignSelf: "center", alignItems: "center", justifyContent: "space-evenly", marginTop: "-25%" }}>
                        <Image source={require('../images/person.png')} style={{ height: 60, width: 60, borderRadius: 100, alignSelf: "center", marginTop: "-20%" }} />
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#004342", textAlign: "center" }}>Hello, Saswat Panda</Text>
                            <Text style={{ textAlign: "center" }}>+91 7684998887</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: "bold", color: "#15a305", fontSize: 17 }}>Project Manager (Epsum Labs)</Text>
                        </View>
                    </View>
                    <View style={{ zIndex: 2, marginTop: -65 }}>
                    </View>
                    <View style={{ position: "absolute", width: "100%", bottom: 10 }}>
                        <TouchableOpacity style={{ alignSelf: "center", paddingVertical: 15, backgroundColor: "#fff", borderRadius: 15, width: "92%", marginBottom:10 }} >
                            <Text style={{ textAlign: "center", fontWeight: "bold", color: "#004342" }}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: "center", paddingVertical: 15, backgroundColor: "#004342", borderRadius: 15, width: "92%", }} >
                            <Text style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    headerName: { alignItems: "flex-start", justifyContent: "space-evenly", paddingLeft: 30, height: "50%", backgroundColor: "#004342", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginHorizontal: 2, },
    card: {
        width: "45%", backgroundColor: "#ffffff", borderRadius: 20, paddingVertical: 25, paddingHorizontal: 15,
        elevation: 3,
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    footer: { position: "absolute", bottom: 15, alignSelf: "center", paddingVertical: 17, backgroundColor: "#73e2b2", borderRadius: 15, width: "92%" }
})