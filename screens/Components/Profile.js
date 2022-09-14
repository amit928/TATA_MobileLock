import { Alert, BackHandler, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Icon } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import { Button, Image, Modal } from 'native-base';
import { connect } from 'react-redux'
import { changePassword, fetchProfileData } from '../redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SCREEN } from '../constants'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    }

    componentDidMount = () => {
        this.props.getProfileData(this.props.route.params.staf_sl)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure, You want to logout ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        AsyncStorage.removeItem('MyData').then(() => {
                            this.props.navigation.navigate('Welcome')
                        })
                    }
                }
            ]
        )

    }

    changePassword = () => {
        const { oldPassword, newPassword, confirmPassword } = this.state
        if (oldPassword !== '' && newPassword !== '' && confirmPassword !== '') {
            if (newPassword === confirmPassword) {
                this.props.changePassword(JSON.stringify({
                    staf_sl: this.props.route.params.staf_sl,
                    new_password: newPassword
                }))
                this.setState({ isOpen: false })
            }
            else {
                alert("Password doesn't match.")
            }
        }
        else {
            alert("Input field can not be blank.")
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: "#e3e3e3" }}>
                <StatusBar style={{ backgroundColor: "#004342" }} />
                <View style={{ height: "100%", width: "100%" }}>
                    <View style={{ height: "35%", width: "99%", alignSelf: "center", backgroundColor: "#004342", borderBottomEndRadius: 30, borderBottomLeftRadius: 30 }}>
                    </View>
                    <View style={{ backgroundColor: "white", height: "20%", borderRadius: 25, width: "80%", alignSelf: "center", alignItems: "center", justifyContent: "space-evenly", marginTop: "-25%" }}>
                        <Image source={require('../images/person.png')} alt='Profile Image' style={{ height: 60, width: 60, borderRadius: 100, alignSelf: "center", marginTop: "-20%" }} />
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#004342", textAlign: "center" }}>Hello, {this.props.profileData.staf_nm}</Text>
                            <Text style={{ textAlign: "center" }}>{this.props.profileData.emp_code}</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: "bold", color: "#15a305", fontSize: 17 }}>{this.props.profileData.desg_nm} ({this.props.profileData.dept_nm})</Text>
                        </View>
                    </View>
                    <View style={{ zIndex: 2, marginTop: -65 }}>
                    </View>
                    <View style={{ position: "absolute", width: "100%", bottom: 10 }}>
                        <TouchableOpacity style={{ alignSelf: "center", paddingVertical: 15, backgroundColor: "#fff", borderRadius: 15, width: "92%", marginBottom: 10 }} onPress={() => this.setState({ isOpen: true })} >
                            <Text style={{ textAlign: "center", fontWeight: "bold", color: "#004342" }}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: "center", paddingVertical: 15, backgroundColor: "#004342", borderRadius: 15, width: "92%", }} onPress={this.onLogout} >
                            <Text style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal isOpen={this.state.isOpen} onClose={() => this.setState({ isOpen: !this.state.isOpen })}>

                    <View style={{ backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "40%", borderRadius: 15 }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: "500", marginRight: 10 }}>Change Password</Text>
                        </View>
                        <View style={{ alignSelf: 'center', display: "flex", marginHorizontal: 20, width: "82%", marginBottom: 15 }}>
                            <TextInput placeholder='Old Password' style={{ width: "100%", borderWidth: 1, borderRadius: 8, borderColor: "black", paddingHorizontal: 15, paddingVertical: 5 }} secureTextEntry onChangeText={(password) => this.setState({ oldPassword: password })} />
                        </View>
                        <View style={{ alignSelf: 'center', display: "flex", marginHorizontal: 20, width: "82%", marginBottom: 15 }}>
                            <TextInput placeholder='New Password' style={{ width: "100%", borderWidth: 1, borderRadius: 8, borderColor: "black", paddingHorizontal: 15, paddingVertical: 5 }} secureTextEntry onChangeText={(password) => this.setState({ newPassword: password })} />
                        </View>
                        <View style={{ alignSelf: 'center', display: "flex", marginHorizontal: 20, width: "82%", marginBottom: 15 }}>
                            <TextInput placeholder='Confirm Password' style={{ width: "100%", borderWidth: 1, borderRadius: 8, borderColor: "black", paddingHorizontal: 15, paddingVertical: 5 }} secureTextEntry onChangeText={(password) => this.setState({ confirmPassword: password })} />
                        </View>
                        <Button style={{ width: "82%", marginTop: 10, backgroundColor:"#004342" }} onPress={this.changePassword}>
                            <Text style={{ fontWeight: "bold", color: "white" }}>SUBMIT</Text>
                        </Button>
                    </View>
                </Modal>
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

const mapStateToProps = store => {
    return {
        profileData: store.allInOneReducer.profileData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfileData: (staf_sl) => dispatch(fetchProfileData(staf_sl)),
        changePassword: (body) => dispatch(changePassword(body),)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);