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
  return `${month}/${date.getDate()}/${date.getUTCFullYear()}`;
};

export function formatDateTime(date, time) {
  var month = date.getUTCMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var hour = time.getUTCHours()
  if (hour < 10) {
    hour = `0${hour}`
  }
  var minutes = time.getUTCMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return `${date.getUTCDate()}/${month}/${date.getUTCFullYear()}, ${hour}:${minutes}`
}

export function validateTowerList(data) {
  var towerList = []
  data && data.map((value, index) => {
    towerList.push({ label: value["DeviceFname"], value: value["DeviceId"] })
  })
  return towerList
}