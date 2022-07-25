import { Dimensions } from 'react-native';

export const SCREEN = {
  HEIGHT: Dimensions.get('window').height,
  WIDTH: Dimensions.get('window').width
}

export function formateDate(date) {
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    return `${date.getDate()}-${month}-${date.getUTCFullYear()}`;
  };

export function validateTowerList(data){
  var towerList =[]
  data && data.map((value, index)=>{
    towerList.push({label: value["DeviceFname"], value: value["DeviceId"]})
  })
  return towerList
}