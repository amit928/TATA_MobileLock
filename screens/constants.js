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

export function validateTowerList(data) {
  var towerList = []
  data && data.map((value, index) => {
    towerList.push({ label: value["DeviceFname"], value: value["DeviceId"] })
  })
  return towerList
}