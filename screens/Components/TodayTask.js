import { Text, TouchableOpacity, View, ScrollView, BackHandler } from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Card } from '@rneui/base'
import { BASE_URL, colors, formatDateTime } from '../constants'
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
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
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
        var body = {
            "sl": this.state.sl,
            "date": this.state.date,
            "time": this.state.time
        }
        if (this.state.date !== '' && this.state.time !== '') {
            if (API_TYPE[this.state.type] == 'StartRequest' || API_TYPE[this.state.type] == 'CompleteRequest') {
                this.props.navigation.navigate('Camera', { type: API_TYPE[this.state.type], body: body, staf_sl: this.props.route.params.staf_sl })
            }
            else {
                this.props.changeTaskStatus(API_TYPE[this.state.type], body, this.props.route.params.staf_sl)
            }
            this.setState({
                openModal: false, date: '',
                time: '',
                type: '',
                sl: ""
            })
        }
        else {
            alert("Please select Date and Time")
        }

    }
    render() {
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
                                    <View key={index} style={{
                                        borderRadius: 10, backgroundColor: "#f5fff5", elevation: 3,
                                        shadowOffset: { width: -2, height: 4 },
                                        shadowColor: '#171717',
                                        shadowOpacity: 0.2,
                                        shadowRadius: 3, marginHorizontal: 15, marginVertical: 10, paddingVertical: 15
                                    }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ width: 4, backgroundColor: colors[index % 10], marginRight: 15, marginVertical: 25, position: "relative", left: -2 }}></View>
                                            <View style={{ width: "90%" }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Icon
                                                        name='id-badge'
                                                        type='font-awesome-5'
                                                        color='#4bafde'
                                                        size={17}
                                                    />
                                                    <Text style={{ fontSize: 12, color: "#004342", marginLeft: 10 }}>{value.Request_Id}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", marginVertical: 10, marginLeft: -3 }}>
                                                    <Icon
                                                        name='back-in-time'
                                                        type='entypo'
                                                        color='#ccaf58'
                                                        size={17}
                                                    />
                                                    <Text style={{ fontSize: 12, color: "#004342", marginLeft: 8 }}>
                                                        {formatDateTime(new Date(value.for_date), new Date(value.for_time))}  - {formatDateTime(new Date(value.to_date), new Date(value.to_time))}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 10, marginLeft: -3 }}>
                                                    <Icon
                                                        name='broadcast-tower'
                                                        type='font-awesome-5'
                                                        color='#ab33f5'
                                                        size={14}
                                                    />
                                                    <Text style={{ fontSize: 12, color: "#004342", marginLeft: 10 }}>Tower : {value.DeviceFName}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                                    <Icon
                                                        name='hourglass-start'
                                                        type='font-awesome-5'
                                                        color='#027a08'
                                                        size={15}
                                                    />
                                                    <Text style={{ fontSize: 12, color: "#004342", marginLeft: 10 }}>STATUS : {value.status}</Text>
                                                </View>
                                                <Text style={{ fontWeight: "bold", fontSize: 13, color: "#004342" }}>{value.description}</Text>
                                                <View style={{ height: 0.5, backgroundColor: "gray", marginVertical: 10 }}></View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                                                    <Button style={{ borderRadius: 10, backgroundColor: "#edd2fc", borderWidth: 0.5, borderColor: "#7304de" }} disabled={this.showDisbale('start', value.request_status)} onPress={() => this.setState({ openModal: true, type: "Start", sl: value.sl })}>
                                                        <Text style={{ fontWeight: "bold", color: "#7304de" }}>Start</Text>
                                                    </Button>
                                                    <Button style={{ backgroundColor: "#f5e7bf", borderRadius: 10, borderWidth: 0.5, borderColor: "#b58605" }} disabled={this.showDisbale('extend', value.request_status)} onPress={() => this.setState({ openModal: true, type: "Extend", sl: value.sl })}>
                                                        <Text style={{ fontWeight: "bold", color: "#b58605" }}>Extend</Text>
                                                    </Button>
                                                    <Button style={{ backgroundColor: "#bcf7bf", borderRadius: 10, borderWidth: 0.5, borderColor: "#027a08" }} disabled={this.showDisbale('complete', value.request_status)} onPress={() => this.setState({ openModal: true, type: "Complete", sl: value.sl })}>
                                                        <Text style={{ fontWeight: "bold", color: "#027a08" }}>Complete</Text>
                                                    </Button>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <DateTimePickerModal
                    mytime={this.state.time}
                    mydate={this.state.date}
                    title={this.state.type}
                    isOpen={this.state.openModal}
                    time={(data) => this.setState({ time: data })}
                    date={(data) => this.setState({ date: data })}
                    onClose={() => this.setState({ openModal: false })}
                    onSubmit={this.onSubmit} />
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