import { Text, TouchableOpacity, View, ScrollView, BackHandler, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Card } from '@rneui/base'
import { BASE_URL, formatDateTime, SCREEN } from '../constants'
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

class TaskReport extends Component {
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
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.goBack();
    return true
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  render() {
    return (
      <View style={{ backgroundColor: "#004342", width: "100%", height: "100%" }}>
        <StatusBar style='light' />
        <View style={{ marginTop: "30%", height: "100%", backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 15 }}>
          <View style={{ height: SCREEN.HEIGHT / 20,  marginTop: 10 }}>
            <ScrollView horizontal={true} style={{ height: "5%" }}>
              <TouchableOpacity style={styles.tabStyle}><Text style={{ color: "white", fontWeight: "700" }}>All</Text></TouchableOpacity>
              <TouchableOpacity style={styles.tabStyle}><Text style={{ color: "white", fontWeight: "700" }}>Not Approved</Text></TouchableOpacity>
              <TouchableOpacity style={styles.tabStyle}><Text style={{ color: "white", fontWeight: "700" }}>Pending</Text></TouchableOpacity>
              <TouchableOpacity style={styles.tabStyle}><Text style={{ color: "white", fontWeight: "700" }}>Started</Text></TouchableOpacity>
              <TouchableOpacity style={styles.tabStyle}><Text style={{ color: "white", fontWeight: "700" }}>Completed</Text></TouchableOpacity>
            </ScrollView>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabStyle: { backgroundColor: "#004342", marginHorizontal: 10, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingHorizontal:20, },
})

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

export default connect(mapStateToProps, mapDispatchToProps)(TaskReport);