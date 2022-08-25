import { Text, TouchableOpacity, View, ScrollView, BackHandler, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { colors, formatDateTime, SCREEN } from '../constants'
import { getTaskReport } from '../redux/action'
import { connect } from 'react-redux'
// import { Icon } from '@rneui/themed'
import { Card, Icon } from '@rneui/base'


class TaskReport extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openModal: false,
      date: '',
      time: '',
      type: '',
      sl: "", task_status: "A"
    }
  }

  componentDidMount = () => {
    this.props.getTaskReport(this.props.route.params.staf_sl, this.state.task_status)
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  setTaskReport = (status) => {
    this.setState({ task_status: status })
    this.props.getTaskReport(this.props.route.params.staf_sl, status)
  }

  onBackPress = () => {
    this.props.navigation.goBack();
    return true
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  setBackgroundColor = (status) => {
    if (status == this.state.task_status) {
      return "white"
    }
    else {
      return "transparent"
    }
  }

  setTextColor = (status) => {
    if (status == this.state.task_status) {
      return "#004342"
    }
    else {
      return "#fff"
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "#004342", width: "100%", height: "100%" }}>
        <StatusBar style='light' />
        <View style={{ marginTop: "27%", height: "100%" }}>
          <View style={{ height: SCREEN.HEIGHT / 20, marginBottom: 25, marginHorizontal: 20, borderWidth: 0.5, borderColor: "#edffee", borderRadius: 10, zIndex: 2 }}>
            <ScrollView horizontal={true} style={{ height: "5%" }}>
              <TouchableOpacity style={{ ...styles.tabStyle, backgroundColor: this.setBackgroundColor('A'), }} onPress={() => this.setTaskReport('A')}><Text style={{ color: this.setTextColor('A'), fontWeight: "700" }}>Approved</Text></TouchableOpacity>
              <TouchableOpacity style={{ ...styles.tabStyle, backgroundColor: this.setBackgroundColor('NA'), }} onPress={() => this.setTaskReport('NA')}><Text style={{ color: this.setTextColor('NA'), fontWeight: "700" }}>Not Approved</Text></TouchableOpacity>
              <TouchableOpacity style={{ ...styles.tabStyle, backgroundColor: this.setBackgroundColor('P'), }} onPress={() => this.setTaskReport('P')}><Text style={{ color: this.setTextColor('P'), fontWeight: "700" }}>Pending</Text></TouchableOpacity>
              <TouchableOpacity style={{ ...styles.tabStyle, backgroundColor: this.setBackgroundColor('S'), }} onPress={() => this.setTaskReport('S')}><Text style={{ color: this.setTextColor('S'), fontWeight: "700" }}>Started</Text></TouchableOpacity>
              <TouchableOpacity style={{ ...styles.tabStyle, backgroundColor: this.setBackgroundColor('C'), }} onPress={() => this.setTaskReport('C')}><Text style={{ color: this.setTextColor('C'), fontWeight: "700" }}>Completed</Text></TouchableOpacity>
            </ScrollView>
          </View>
          <ScrollView style={{ marginBottom: "29%", backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 10, zIndex: 1 }}>
            {
              this.props.taskReportList.length > 0 && this.props.taskReportList.map((value, index) => {
                return (
                  <View key={index} style={{
                    borderRadius: 10, backgroundColor: "#f5fff5", elevation: 3,
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: '#171717',
                    shadowOpacity: 0.2,
                    shadowRadius: 3, marginHorizontal: 15, marginVertical: 10, paddingVertical: 15
                  }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: 4, backgroundColor: colors[index % 10], marginRight: 15, marginVertical: 10, position: "relative", left: -2 }}></View>
                      <View>
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
                          <Icon type="MaterialIcons" name="timer" color='#ccaf58'
                            size={17} />
                          <Text style={{ fontSize: 12, color: "#004342", marginLeft: 8 }}>
                            {formatDateTime(new Date(value.for_date), new Date(value.for_time))} , {formatDateTime(new Date(value.to_date), new Date(value.to_time))}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 10, marginLeft: -3 }}>
                          <Icon type="MaterialIcons" name="more-time" color='#ab33f5'
                            size={17} />
                          <Text style={{ fontSize: 12, color: "#004342", marginLeft: 8 }}>
                            Start : {formatDateTime(new Date(value.start_date), new Date(value.start_time))},  End : {formatDateTime(new Date(value.end_date), new Date(value.end_time))}</Text>
                        </View>
                        {/* <View style={{ flexDirection: "row", marginBottom: 10 }}>
                      <Icon
                        name='hourglass-start'
                        type='font-awesome-5'
                        color='white'
                        size={16}
                      />
                      <Text style={{ fontSize: 12, color: "white", marginLeft: 10 }}>STATUS : {value.status}</Text>
                    </View> */}
                        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#004342", marginLeft: 2 }}>{value.description}</Text>

                      </View>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabStyle: { display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingHorizontal: 18, borderColor: "transparent", borderWidth: 0.5 },
})

export const mapStateToProps = (store) => {
  return {
    taskReportList: store.allInOneReducer.taskReportList
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getTaskReport: (staf_sl, task_status) => dispatch(getTaskReport(staf_sl, task_status))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskReport);