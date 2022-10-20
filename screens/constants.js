import { Dimensions } from 'react-native';
export const BASE_URL = 'https://protimes.co.in/TATASTEELAPI'

export function validateTime(time) {
  var hour = time.getHours()
  var min = time.getMinutes()
  if (hour < 10) {
    hour = '0' + hour
  }
  return hour + ":" + min
}
export const SCREEN = {
  HEIGHT: Dimensions.get('window').height,
  WIDTH: Dimensions.get('window').width
}

export function formateDate(date) {
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var myDate = date.getDate();
  if (myDate < 10) {
    myDate = "0" + myDate;
  }
  return `${month}/${myDate}/${date.getUTCFullYear()}`;
};

export function formatDateTime(date, time) {
  var month = date.getUTCMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var myDate = date.getUTCDate();
  if (myDate < 10) {
    myDate = "0" + myDate;
  }
  var hour = time.getUTCHours()
  if (hour < 10) {
    hour = `0${hour}`
  }
  var minutes = time.getUTCMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return `${myDate}/${month}/${date.getUTCFullYear()}, ${hour}:${minutes}`
}

export function validateTowerList(data) {
  var towerList = []
  data && data.map((value, index) => {
    towerList.push({ label: value["DeviceFname"], value: value["DeviceId"] })
  })
  return towerList
}

export const colors = ["#961906", "#917503", "#79f725", "#025c45", "#fa882a", "#08355c", "#b713f2", "#f50cbb", "#3d0c59", "#2922f5",]

export const getActivityItem = (item) => {
  return item.map((data, i) => {
    if (data.activity_status == 1) {
      return data.activity
    }
  })
}
export const getActivityFromList = (activityDataList, activityName) => {
  return activityDataList.map((item) => {
    if (activityName == item.activity) {
      var myItem = item
      myItem.activity_status = item.activity_status == 1 ? 0 : 1
      return myItem
    }
    else {
      return item
    }
  })
}