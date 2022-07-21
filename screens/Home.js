import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      myData: this.props.route.params.data.data[0],
      todayDate: new Date()
    }
  }
  formattingDate = (date) => {
    return `${days[date.getDay()]},  ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }
  render() {
    console.log(this.props.route.params.data)
    return (
      <View>
        <StatusBar style="light" />
        <View style={{ height: "100%", width: "100%" }}>
          <View style={{ alignItems: "flex-start", justifyContent: "space-evenly", paddingLeft: 30, height: "50%", backgroundColor: "#3c9bfa", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginHorizontal: 2, }}>
            <View>
              <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>{`Hello, ${this.state.myData.staf_nm}`}</Text>
              <Text style={{ color: "white", fontWeight: "bold",fontSize: 12, }}>{this.formattingDate(new Date())}</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom:30 }}>
              <View>
                <Text style={{ fontSize: 40, color: "#fff" }}>{this.state.myData["Pending_Task"]}</Text>
                <Text style={{ color: "#fff",fontSize: 13, }}>Tasks</Text>
                <Text style={{ color: "#fff",fontSize: 13, }}>Pending</Text>
              </View>
              <View style={{marginHorizontal: 40}}>
                <Text style={{ fontSize: 40, color: "#fff" }}>{this.state.myData["Progress_Task"]}</Text>
                <Text style={{ color: "#fff",fontSize: 13, }}>Tasks </Text>
                <Text style={{ color: "#fff",fontSize: 13, }}>In Progress</Text>
              </View>
              <View>
                <Text style={{ fontSize: 40, color: "#fff" }}>{this.state.myData["Completed_Task"]}</Text>
                <Text style={{ color: "#fff",fontSize: 13, }}>Tasks </Text>
                <Text style={{ color: "#fff",fontSize: 13, }}>Completed </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}