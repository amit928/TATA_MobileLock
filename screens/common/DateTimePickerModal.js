import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Button, CloseIcon, Modal } from 'native-base'
import DatePickerModal from './DatePickerModal'
import { BASE_URL, getActivityFromList, getActivityItem, SCREEN } from '../constants'
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native'

export default class DateTimePickerModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: '',
            time: '',
            activities: [
            ]
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.title !== this.props.title) {
            this.componentDidMount();
        }
    }

    componentDidMount = () => {
        if (this.props.title === 'Complete') {
            this.fetchTaskDetails(this.props.sl)
        }
    }

    fetchTaskDetails = (staf_sl) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: null
        };
        fetch(`${BASE_URL}/api/TaskDetails/${staf_sl}`, requestOptions)
            .then(response => response.json())
            .then(data =>
                data.Code == '200' ?
                    this.setState({ activities: data.data[0].activities })
                    // console.log()
                    :
                    alert(data.Code)
            )
            .catch((error) => {
                alert(`Something Went Wrong. error : ${error}`);
            });

    }

    updateActivity = (item_List, item) => {
        this.setState({ activities: getActivityFromList(item_List, item) })
        console.log("getActivityFromList(item_List, item)", getActivityFromList(item_List, item))
        this.props.getActivities(getActivityFromList(item_List, item))
    }

    componentWillUnmount = () => {
        this.setState({
            date: '',
            time: ''
        })
    }
    render() {
        return (
            <View>
                <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>

                    <View style={{ backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", width: "90%", borderRadius: 15, paddingVertical: 20 }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: "500", marginRight: 10 }}>{this.props.title} Task</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', display: "flex", marginHorizontal: 20 }}>
                            <View style={{ width: SCREEN.WIDTH / 2.5, padding: 5 }}>
                                <Text style={{ marginLeft: 5 }}>Select Date</Text>
                                <DatePickerModal
                                    value={this.props.mydate}
                                    onConfirm={(data) => { this.setState({ date: data }); this.props.date(data) }}
                                    placeholder='MM/DD/YY'
                                    onCancel={() => { }}
                                    mode="date"
                                />
                            </View>
                            <View style={{ width: SCREEN.WIDTH / 2.5, padding: 5 }}>
                                <Text style={{ marginLeft: 5 }}>Select Time</Text>
                                <DatePickerModal
                                    value={this.props.mytime}
                                    placeholder="HH:MM"
                                    onConfirm={(data) => { this.setState({ time: data }); this.props.time(data) }}
                                    onCancel={() => { }}
                                    mode="time"
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 5, width: "80%" }}>
                            {
                                this.props.title === 'Complete' && this.state.activities.length > 0 && this.state.activities.map((item, index) => {
                                    console.log("item.activity_status", item.activity_status)
                                    return (
                                        <View key={index}>
                                            <TouchableOpacity onPress={() => this.updateActivity(this.state.activities, item.activity)} style={{ flexDirection: "row", marginBottom: 5 }}>
                                                <Icon
                                                    name={item.activity_status == 1 ? 'check-box' : 'check-box-outline-blank'}
                                                    type='materialicons'
                                                    style={{ color: "black", marginRight: 10 }}
                                                    size={25}
                                                />
                                                <Text>{item.activity}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <Button style={{ width: "82%", marginTop: 10 }} onPress={() => this.props.onSubmit()}>
                            <Text style={{ fontWeight: "bold", color: "white" }}>{this.props.title.toUpperCase()}</Text>
                        </Button>
                    </View>
                </Modal>
            </View>
        )
    }
}