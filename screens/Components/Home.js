import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Icon } from '@rneui/themed';
import { connect } from 'react-redux';
import { SCREEN } from '../constants';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    BackHandler.exitApp()
    return true
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  formattingDate = (date) => {
    return `${days[date.getDay()]},  ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  render() {
    return (
      <View style={{ backgroundColor: "#F7F9FF" }}>
        <StatusBar style={{ backgroundColor: "#004342" }} />
        <View style={{ height: "100%", width: "100%" }}>
          <View style={styles.headerName}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>{`Hello, ${this.props.dashboardDetails.staf_nm}`}</Text>
                <Text style={{ color: "#73e2b2", fontWeight: "bold", fontSize: 12, }}>{this.formattingDate(new Date())}</Text>
              </View>
              <View style={{ width: "40%", paddingTop: 8 }} >
                <Icon
                  name='bell-alt'
                  type='fontisto'
                  color='#fff'
                  size={15}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 50, marginTop: -20, marginLeft:5 }}>
              <View >
                <Text style={{ fontSize: 45, color: "#73e2b2", fontWeight: "bold" }}>{this.props.dashboardDetails["Pending_Task"]<10 ? '0'+this.props.dashboardDetails["Pending_Task"] : this.props.dashboardDetails["Pending_Task"]}</Text>
                <Text style={{ color: "#fff", fontSize: 13, }}>Tasks</Text>
                <Text style={{ color: "#fff", fontSize: 13, }}>Pending</Text>
              </View>
              <View style={{width:0.3, backgroundColor:"gray", marginVertical:25, marginHorizontal:"8%"}}></View>
              <View >
                <Text style={{ fontSize: 45, color: "#73e2b2", fontWeight: "bold" }}>{this.props.dashboardDetails["Progress_Task"]<10 ? '0'+this.props.dashboardDetails["Progress_Task"] : this.props.dashboardDetails["Progress_Task"]}</Text>
                <Text style={{ color: "#fff", fontSize: 13, }}>Tasks </Text>
                <Text style={{ color: "#fff", fontSize: 13, }}>In Progress</Text>
              </View>
              <View style={{width:0.3, backgroundColor:"gray", marginVertical:25,  marginHorizontal:"8%"}}></View>
              <View >
                <Text style={{ fontSize: 45, color: "#73e2b2", fontWeight: "bold" }}>{this.props.dashboardDetails["Completed_Task"]<10 ? '0'+this.props.dashboardDetails["Completed_Task"] : this.props.dashboardDetails["Completed_Task"]}</Text>
                <Text style={{ color: "#fff", fontSize: 13, }}>Tasks </Text>
                <Text style={{ color: "#fff", fontSize: 13, }}>Completed </Text>
              </View>
            </View>
          </View>
          <View style={{ zIndex: 2, marginTop: -65 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('TodayTask', { staf_sl: this.props.loginDetails.staf_sl })}>
                <View style={{ display: "flex", alignItems: "flex-start", borderRadius: 15, padding: 12, backgroundColor: "#BFCFFD", width: "35%", justifyContent: "center", marginBottom: 15 }}>
                  <Icon
                    name='calendar-check'
                    type='font-awesome-5'
                    color='#0E4BFA'
                  />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#04376B" }}>Today's Task</Text>
                <Text style={{ fontSize: 13, color: "#04376B" }}>{this.props.dashboardDetails.Todays_Task} New Task Added</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <View style={{ display: "flex", alignItems: "flex-start", borderRadius: 15, padding: 12, backgroundColor: "#C9E884", width: "35%", justifyContent: "center", marginBottom: 15 }}>
                  <Icon
                    name='clipboard-list'
                    type='font-awesome-5'
                    color='#638C06'
                  />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#04376B" }}>Extend Task</Text>
                <Text style={{ fontSize: 13, color: "#04376B" }}>You have 40 task</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 25 }}>
              <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('TaskReport', { staf_sl: this.props.loginDetails.staf_sl })} >
                <View style={{ display: "flex", alignItems: "flex-start", borderRadius: 15, padding: 12, backgroundColor: "#CDAAFB", width: "35%", justifyContent: "center", marginBottom: 15 }}>
                  <Icon
                    name='report'
                    type='materialIcons'
                    color='#46049E'
                  />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#04376B" }}>Task Report</Text>
                <Text style={{ fontSize: 13, color: "#04376B" }}>See all your task report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Profile', { staf_sl: this.props.loginDetails.staf_sl })}>
                <View style={{ display: "flex", alignItems: "flex-start", borderRadius: 15, padding: 12, backgroundColor: "#CDFDF0", width: "35%", justifyContent: "center", marginBottom: 15 }}>
                  <Icon
                    name='person'
                    type='fontisto'
                    color='#069E75'
                  />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#04376B" }}>My Profile</Text>
                <Text style={{ fontSize: 13, color: "#04376B" }}>{this.props.dashboardDetails.staf_nm}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.footer} onPress={() => { this.props.navigation.navigate('CreateTask', { staf_sl: this.props.loginDetails.staf_sl }) }}>
            <Text style={{ textAlign: "center", fontWeight: "bold", color: "#004342" }}>CREATE TASK</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerName: { alignItems: "flex-start", justifyContent: "space-evenly", paddingLeft: 30, height: "50%", backgroundColor: "#004342", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginHorizontal: 2, },
  card: {
    width: "45%", backgroundColor: "#ffffff", borderRadius: 20, paddingVertical: 25, paddingHorizontal: 15,
    elevation: 3,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  footer: { position: "absolute", bottom: 15, alignSelf: "center", paddingVertical: 17, backgroundColor: "#73e2b2", borderRadius: 15, width: "92%" }
})

const mapStateToProps = store => {
  return {
    dashboardDetails: store.allInOneReducer.dashboardDetails,
    loginDetails: store.allInOneReducer.loginDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
