import { Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'
import DatePickerModal from './common/DatePickerModal'
import { SCREEN } from './constants'
import { Card } from '@rneui/base'

export default class CreateTask extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
          fromDate:"",
          toDate:""
        }
      }
    render() {
        return (
            <View style={{ backgroundColor:"#004342", height:"100%"}}>
            <Card containerStyle={{marginTop:"35%"}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', display:"flex", marginHorizontal:20 }}>
                    <View style={{ width: SCREEN.WIDTH / 2.5,  padding: 5 }}>
                        <DatePickerModal
                            value={this.state.fromDate}
                            onConfirm={(data) => { this.setState({ fromDate: data }) }}
                            placeholder='From Date'
                            onCancel={() => { }}
                            mode="date"
                        />
                    </View>
                    <View style={{ width: SCREEN.WIDTH / 2.5, padding: 5 }}>

                        <DatePickerModal
                            value={this.state.toDate}
                            placeholder="To Date"
                            onConfirm={(data) => { this.setState({ toDate: data }) }}
                            onCancel={() => { }}
                            mode="date"
                        />
                    </View>
                </View>
                <View style={{ marginHorizontal: 25, marginTop: -5 }}>
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
            </View>
        )
    }
}