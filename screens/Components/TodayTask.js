import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Card } from '@rneui/base'
import { BASE_URL } from '../constants'
import { Icon } from '@rneui/themed'
import { changeTaskStatus, fetchTaskList } from '../redux/action'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import DateTimePickerModal from '../common/DateTimePickerModal'

const API_TYPE = {
    Start: 'StartRequest',
    Extend: 'ExtendRequest',
    Complete: 'CompleteRequest'
}

class TodayTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
            date: '',
            time: '',
            type: '',
            sl: ""
        }
    }
    componentDidMount = () => {
        this.props.fetchTaskList(this.props.route.params.staf_sl)
    }

    showDisbale(buttonType, status) {
        switch (status) {
            case 'P':
                return buttonType === 'start' ? false : true;
            case 'S':
                return buttonType === 'extend' || buttonType === 'complete' ? false : true;
            case 'C':
                return true;
        }
    }
    onSubmit = () => {
        var body = JSON.stringify({
            "sl": this.state.sl,
            "date": this.state.date,
            "time": this.state.time
        })
        this.props.changeTaskStatus(API_TYPE[this.state.type], body, this.props.route.params.staf_sl)
        this.setState({
            openModal: false, date: '',
            time: '',
            type: '',
            sl: ""
        })
    }
    render() {
        console.log("this.props.taskList", this.props.taskList)
        return (
            <View style={{ backgroundColor: "#004342", width: "100%", height: "100%" }}>
                <StatusBar style='light' />
                <ScrollView style={{ marginTop: "30%", height: "100%", backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 15 }}>
                    <View>
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                            <Text style={{ fontWeight: "bold" }}>All Tasks</Text>
                        </View>
                        {
                            this.props.taskList.length > 0 && this.props.taskList.map((value, index) => {
                                return (
                                    <Card key={index} containerStyle={{
                                        borderRadius: 10, backgroundColor: "#004342", elevation: 3,
                                        shadowOffset: { width: -2, height: 4 },
                                        shadowColor: '#171717',
                                        shadowOpacity: 0.2,
                                        shadowRadius: 3,
                                    }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Icon
                                                name='id-badge'
                                                type='font-awesome-5'
                                                color='white'
                                                size={17}
                                            />
                                            <Text style={{ fontSize: 12, color: "white", marginLeft: 10 }}>{value.Request_Id}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginVertical: 10 }}>
                                            <Icon
                                                name='back-in-time'
                                                type='entypo'
                                                color='white'
                                                size={17}
                                            />
                                            <Text style={{ fontSize: 12, color: "white", marginLeft: 8 }}>{new Date(value.for_date).toLocaleDateString()}, {new Date(value.for_time).toLocaleTimeString()}  -  {new Date(value.to_date).toLocaleDateString()}, {new Date(value.to_time).toLocaleTimeString()}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                            <Icon
                                                name='hourglass-start'
                                                type='font-awesome-5'
                                                color='white'
                                                size={16}
                                            />
                                            <Text style={{ fontSize: 12, color: "white", marginLeft: 10 }}>STATUS : {value.status}</Text>
                                        </View>
                                        <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>{value.description}</Text>
                                        <View style={{ height: 0.5, backgroundColor: "gray", marginVertical: 10 }}></View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                                            <Button style={{ borderRadius: 10 }} disabled={this.showDisbale('start', value.request_status)} onPress={() => this.setState({ openModal: true, type: "Start", sl: value.sl })}>
                                                <Text style={{ fontWeight: "bold", color: "white" }}>Start</Text>
                                            </Button>
                                            <Button style={{ backgroundColor: "#ccaf58", borderRadius: 10 }} disabled={this.showDisbale('extend', value.request_status)} onPress={() => this.setState({ openModal: true, type: "Extend", sl: value.sl })}>
                                                <Text style={{ fontWeight: "bold", color: "white" }}>Extend</Text>
                                            </Button>
                                            <Button style={{ backgroundColor: "#93cc96", borderRadius: 10 }} disabled={this.showDisbale('complete', value.request_status)} onPress={() => this.setState({ openModal: true, type: "Complete", sl: value.sl })}>
                                                <Text style={{ fontWeight: "bold", color: "white" }}>Complete</Text>
                                            </Button>
                                        </View>
                                    </Card>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <DateTimePickerModal title={this.state.type} isOpen={this.state.openModal} time={(data) => this.setState({ time: data })} date={(data) => this.setState({ date: data })} onClose={() => this.setState({ openModal: false })} onSubmit={this.onSubmit} />
            </View>
        )
    }
}

export const mapStateToProps = (store) => {
    return {
        taskList: store.allInOneReducer.taskList
    };
}

export const mapDispatchToProps = (dispatch) => {
    return {
        fetchTaskList: (id) => dispatch(fetchTaskList(id)),
        changeTaskStatus: (type, body, staf_sl) => dispatch(changeTaskStatus(type, body, staf_sl))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayTask);