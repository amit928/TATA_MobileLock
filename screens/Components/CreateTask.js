import { Text, TextInput, View, StyleSheet, TouchableOpacity, BackHandler, ScrollView } from 'react-native'
import React, { Component } from 'react'
import DatePickerModal from '../common/DatePickerModal'
import { formateDate, SCREEN } from '../constants'
import { Card } from '@rneui/base'
import { BASE_URL } from '../constants'
import { Dropdown } from "react-native-element-dropdown";
import { createTaskList, fetchTowerList } from '../redux/action'
import { connect } from 'react-redux';
import { Icon } from '@rneui/themed'

const taskList = ['demo1', 'demo2', 'demo3', 'demo4', 'demo2', 'demo3', 'demo4']

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
            remark: "", activities: [], activity: ""
        }
    }

    componentDidMount = () => {
        fetchTowerList((data) => this.setState({ towerList: data }))
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    createTask = () => {
        if (this.state.fromDate == '' || this.state.toDate == '', this.state.fromTime == '' || this.state.toTime == '' || this.state.tower == '' || this.state.remark == '') {
            alert("Please fill all the field")
        }
        else {
            var body = JSON.stringify({ "DeviceId": this.state.tower, "staf_sl": this.props.route.params.staf_sl, "description": this.state.remark, "for_date": formateDate(this.state.fromDate), "for_time": this.state.fromTime, "to_date": formateDate(this.state.toDate), "to_time": this.state.toTime, "activities": this.state.activities })
            this.props.createTaskList(this.props.route.params.staf_sl, body)
        }
    }

    addActivities = (text) => {
        if (text !== '') {
            var myActivities = this.state.activities
            var activities = {
                activity: text,
                activity_status: "0"
            }
            myActivities.push(activities)
            this.setState({ activities: myActivities, activity: "" })
        }
        else {
            alert("Please Enter An Activity")
        }

    }

    removeActivity = (index) => {
        var myActivities = this.state.activities
        myActivities.splice(index, 1)
        this.setState({ activities: myActivities })
    }

    render() {
        return (
            <View style={{ backgroundColor: "#004342", }}>

                <ScrollView style={{ marginTop: "30%", borderRadius: 10, marginHorizontal: "7%", backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 20, height: "70%", marginBottom: "20%" }}>
                    <View style={{ paddingHorizontal: 10 }}>
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
                                placeholder='MM/DD/YY'
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
                                placeholder='MM/DD/YY'
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
                    <View style={{ marginHorizontal: 10, marginTop: 5, marginBottom: 10 }}>
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
                            value={this.state.remark}
                            onChangeText={(text) => {
                                this.setState({ remark: text });
                            }}
                        />
                    </View>
                    <View style={{ marginHorizontal: 10, marginBottom: 10 }} >
                        <Text style={{ marginBottom: 5 }}>Add Activities</Text>
                        <View style={{ flexDirection: "row", display: "flex", justifyContent: "space-between" }}>

                            <TextInput style={{ width: "75%", borderWidth: 0.2, borderRadius: 4, backgroundColor: "#fff", padding: 5, paddingHorizontal: 12 }} placeholder="Enter Activities" value={this.state.activity} onChangeText={(e) => this.setState({ activity: e })} />

                            <TouchableOpacity style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#004342", borderRadius: 4, borderWidth: 0.2, paddingVertical: 5 }} onPress={() => this.addActivities(this.state.activity)}>
                                <Icon
                                    name='plus'
                                    type='entypo'
                                    color="#fff"
                                    size={22}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.state.activities.length > 0 ?
                            <View style={{ marginHorizontal: 10, marginBottom: 10, borderWidth: 0.5, borderBottomWidth: 0 }}>
                                {
                                    this.state.activities.length > 0 && this.state.activities.map((item, index) => {
                                        return (
                                            <View key={index} style={{ flexDirection: "row" }}>
                                                <View style={{ width: "80%", borderBottomWidth: 0.5, paddingLeft: 10, display: "flex", justifyContent: "center" }}>
                                                    <Text>
                                                        {item.activity}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e6eded", borderWidth: 0.2, paddingVertical: 4 }} onPress={() => this.removeActivity(index)}>
                                                    <Icon
                                                        name='minus'
                                                        type='entypo'
                                                        color={"#004342"}
                                                        size={22}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </View> : <></>
                    }


                    <View style={{ marginTop: 20, alignSelf: "center", flexDirection: "row" }}>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.footer} onPress={this.createTask}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}>CREATE</Text>
                </TouchableOpacity>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    footer: { alignSelf: "center", paddingVertical: 15, backgroundColor: "#73e2b2", borderRadius: 15, width: "92%", marginBottom: "5%" }
})

const mapStateToProps = store => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createTaskList: (id, body) => dispatch(createTaskList(id, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);