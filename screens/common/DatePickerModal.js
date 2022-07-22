import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { formateDate } from '../constants';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DatePickerModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateModal: false,
            text: this.props.placeholder !== undefined ? this.props.placeholder : 'Select Date'
        }
    }

    render() {
        return (
            <View >
                <TouchableOpacity onPress={() => { this.setState({ dateModal: true }) }}
                    style={{ borderColor: '#bfbfbf', borderWidth: 0.5, height: 40, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', margin: 15, borderRadius: 10 }}>
                    {/* <MaterialCommunityIcons style={{ fontSize: 25, color: "black", marginLeft: 10 }} name="calendar-month" /> */}
                    <Text style={{ paddingLeft: 10 }}>{this.props.value === '' ? this.state.text : formateDate(this.props.value)}</Text>
                </TouchableOpacity>
                <DateTimePicker
                isVisible={this.state.dateModal}
                onConfirm={(data) => { this.setState({ dateModal: false }); this.props.onConfirm(data) }}
                onCancel={() => { this.setState({ dateModal: false }); this.props.onCancel() }}
                mode={this.props.mode}
                />
            </View>
        );
    }
}

