import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import DatePickerModal from './common/DatePickerModal'
import { SCREEN, validateTowerList } from './constants'
import { Card } from '@rneui/base'
import { BASE_URL } from '../constants'
import { Dropdown } from "react-native-element-dropdown";

class CreateTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fromDate: "",
            toDate: "",
            fromTime: "",
            toTime: "",
            towerList: [],
            tower: "",
            remark: ""
        }
    }

    componentDidMount = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(`${BASE_URL}/api/GetTowerList`, requestOptions)
            .then(response => response.json())
            .then(data =>
                data.Code == '200' ?
                    this.setState({ towerList: validateTowerList(data.data) })
                    :
                    alert(data.Code)
            )
    }
    createTask = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "DeviceId": this.state.tower, "staf_sl": this.props.route.params.staf_sl, "description": this.state.remark, "for_date": this.state.fromDate, "for_time": this.state.fromTime, "to_date": this.state.toDate, "to_time": this.state.toTime })
        };
        fetch(`${BASE_URL}/api/GetTowerList`, requestOptions)
            .then(response => response.json())
            .then(data =>
                data.Code == '200' ?
                    console.log(data)
                    :
                    alert(data.Code)
            )
    }

    render() {
        return (
            <View style={{ backgroundColor: "#004342", height: "100%" }}>
                <Card containerStyle={{ marginTop: "30%", borderRadius: 10, marginHorizontal: "7%" }}>
                    <View>
                        <View style={{ marginBottom: 10 }}>
                            <View>
                                <Text style={{ paddingBottom: 5 }}>Select Tower </Text>
                                <View style={{
                                    height: 20,
                                    paddingTop: 16,
                                    paddingBottom: 16,
                                    paddingLeft: 10,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: "#ccc"
                                }}>
                                    <Dropdown
                                        data={this.state.towerList}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'Select'}
                                        value={this.state.towerList.length > 0 && this.state.towerList[0].value}
                                        onChange={(item) => {
                                            this.setState({ tower: item.value });
                                        }}
                                        selectedTextStyle={{ fontSize: 13 }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', display: "flex", marginHorizontal: 20 }}>
                        <View style={{ width: SCREEN.WIDTH / 2.5, padding: 5 }}>
                            <Text style={{ marginLeft: 5 }}>From Date</Text>
                            <DatePickerModal
                                value={this.state.fromDate}
                                onConfirm={(data) => { this.setState({ fromDate: data }) }}
                                placeholder='DD/MM/YY'
                                onCancel={() => { }}
                                mode="date"
                            />
                        </View>
                        <View style={{ width: SCREEN.WIDTH / 2.5, padding: 5 }}>
                            <Text style={{ marginLeft: 5 }}>From Time</Text>
                            <DatePickerModal
                                value={this.state.fromTime}
                                placeholder="HH:MM"
                                onConfirm={(data) => { this.setState({ fromTime: data }) }}
                                onCancel={() => { }}
                                mode="time"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', display: "flex", marginHorizontal: 20 }}>
                        <View style={{ width: SCREEN.WIDTH / 2.5, padding: 5 }}>
                            <Text style={{ marginLeft: 5 }}>To Date</Text>
                            <DatePickerModal
                                value={this.state.toDate}
                                onConfirm={(data) => { this.setState({ toDate: data }) }}
                                placeholder='DD/MM/YY'
                                onCancel={() => { }}
                                mode="date"
                            />
                        </View>
                        <View style={{ width: SCREEN.WIDTH / 2.5, padding: 5 }}>
                            <Text style={{ marginLeft: 5 }}>To Time</Text>
                            <DatePickerModal
                                value={this.state.toTime}
                                placeholder="HH:MM"
                                onConfirm={(data) => { this.setState({ toTime: data }) }}
                                onCancel={() => { }}
                                mode="time"
                            />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                        <Text style={{ marginBottom: 5 }}>Remark</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Remark"
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: 4,
                                padding: 10,
                                width: "100%",
                                borderWidth: 0.2

                            }}
                            onChangeText={(text) => {
                                this.setState({ remark: text });
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 20, alignSelf: "center", flexDirection: "row" }}>
                    </View>
                </Card>
                <TouchableOpacity style={styles.footer} onPress={() => this.props.navigation.navigate('CreateTask')}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}>CREATE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    footer: { position: "absolute", bottom: 15, alignSelf: "center", paddingVertical: 15, backgroundColor: "#73e2b2", borderRadius: 15, width: "92%" }
})
export default CreateTask;