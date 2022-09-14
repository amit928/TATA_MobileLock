import { BASE_URL, validateTowerList } from "../constants";
import { DASHBOARD, LOGIN_DETAILS, PROFILE_DATA, TASK_LIST, TASK_REPORT } from "./actionType";
import * as RootNavigation from '../RootNavigation';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const _storeData = async (data) => {
    try {
        await AsyncStorage.setItem(
            'MyData',
            JSON.stringify(data)
        );
    } catch (error) {
        // Error saving data
    }
};

export function onLogin(body) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    };
    return function (dispatch) {
        fetch(`${BASE_URL}/api/employeelogin`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.Code == '200') {
                    _storeData(data.data[0])
                    dispatch({ type: LOGIN_DETAILS, payload: data.data[0] })
                    dispatch(fetchDashboard(data.data[0].staf_sl))
                    RootNavigation.navigate('Home')
                }
                else
                    alert(data.msg)
            })
    }
}

export function getData() {
    return function (dispatch) {
        AsyncStorage.getItem("MyData").then((value) => {
            if (value !== null) {
                var value = JSON.parse(value)
                dispatch({ type: LOGIN_DETAILS, payload: value })
                dispatch(fetchDashboard(value.staf_sl))
                RootNavigation.navigate("Home")
            }
            else {
                RootNavigation.navigate("Welcome")
            }
        });
    }
}


export function fetchDashboard(staf_sl) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: null
    };
    return function (dispatch) {
        fetch(`${BASE_URL}/api/Dashboard/${staf_sl}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.Code == '200') {
                    dispatch({ type: DASHBOARD, payload: data.data[0] })
                }
                else
                    alert(data.Code)
            }
            )
            .catch((error) => {
                alert(`Something Went Wrong. error : ${error}`);
            });

    }
}

export function fetchTowerList(returnData) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return (
        fetch(`${BASE_URL}/api/GetTowerList`, requestOptions)
            .then(response => response.json())
            .then(data =>
                data.Code == '200' ?
                    returnData(validateTowerList(data.data))
                    :
                    alert(data.Code)
            )
    )
}

export function createTaskList(staf_sl, body) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    };
    return function (dispatch) {
        fetch(`${BASE_URL}/api/NewRequest`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.Code == '200') {
                    alert(data.msg)
                    dispatch(fetchDashboard(staf_sl))
                    RootNavigation.navigate('Home');
                }
                else
                    alert(data.Code)
            }
            )
    }

}

export function fetchTaskList(staf_sl) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return function (dispatch) {
        fetch(`${BASE_URL}/api/TodaysTaskList/${staf_sl}`, requestOptions)
            .then(response => response.json())
            .then(data =>
                data.Code == '200' ?
                    dispatch({ type: TASK_LIST, payload: data.data })
                    :
                    alert(data.Code)
            )
    }
}

export function changeTaskStatus(type, body, staf_sl) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    };
    return function (dispatch) {
        fetch(`${BASE_URL}/api/${type}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.Code == '200') {
                    dispatch(fetchDashboard(staf_sl))
                    dispatch(fetchTaskList(staf_sl))
                    RootNavigation.navigate('TodayTask');
                }
                else
                    alert(data.Code)
            }
            )
    }

}

export function fetchProfileData(staf_sl) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: null
    };
    return function (dispatch) {
        fetch(`${BASE_URL}/api/profile/${staf_sl}`, requestOptions)
            .then(response => response.json())
            .then(data =>
                data.Code == '200' ?
                    dispatch({ type: PROFILE_DATA, payload: data.data[0] })
                    :
                    alert(data.Code)
            )
            .catch((error) => {
                alert(`Something Went Wrong. error : ${error}`);
            });

    }
}

export function changePassword(body) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    };
    return function (dispatch) {
        fetch(`${BASE_URL}/api/ChangePassword`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.Code == '200') {
                    alert("Password Changed Successfully")
                }
                else
                    alert(data.Code)
            }
            )
    }

}

export function getTaskReport(staf_sl, task_status) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            staf_sl: staf_sl,
            task_status: task_status
        })
    };
    return function (dispatch) {
        fetch(`${BASE_URL}/api/TaskReport`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.Code == '200') {
                    dispatch({ type: TASK_REPORT, payload: data.data })
                }
                else
                    alert(data.msg)
            }
            )
            .catch((error) => {
                alert(`Something Went Wrong. error : ${error}`);
            });

    }
}