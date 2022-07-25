import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { formateDate } from '../constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from '@rneui/themed';

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
                    style={{ borderColor: '#bfbfbf', borderWidth: 0.5, height: 40, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderRadius: 5, display: "flex", marginVertical: 5, marginHorizontal: 5 }}>
                    <Icon
                        name='calendar'
                        type='fontisto'
                        style={{ color: "black", marginLeft: 10 }}
                        size={14}
                    />
                    <Text style={{ paddingLeft: 10, fontSize: 13, color:"gray" }}>{this.props.value === '' ? this.state.text : this.props.mode == 'time' ? this.props.value : formateDate(this.props.value)}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.dateModal}
                    onConfirm={(data) => {
                        this.setState({ dateModal: false });
                        //  this.props.onConfirm(this.props.mode == 'time' ? new Date(data).toLocaleString('en-US', {
                        //     hour12: false,
                        //     hour: '2-digit',
                        //     minute: '2-digit',
                        //   }) : data);
                        console.log( new Date().toLocaleString('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                          }))
                    }}
                    onCancel={() => { this.setState({ dateModal: false }); this.props.onCancel() }}
                    mode={this.props.mode}

                />
            </View>
        );
    }
}

