import { DASHBOARD, LOGIN_DETAILS, PROFILE_DATA, TASK_LIST, TASK_REPORT } from "./actionType";

const initialState = {
    dashboardDetails: [],
    loginDetails: {},
    taskList: [],
    profileData: {},
    taskReportList: []
};
const allInOneReducer = (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD:
            return {
                ...state,
                dashboardDetails: action.payload
            };
        case LOGIN_DETAILS:
            return {
                ...state,
                loginDetails: action.payload
            };
        case TASK_LIST:
            return {
                ...state,
                taskList: action.payload
            };
        case PROFILE_DATA:
            return {
                ...state,
                profileData: action.payload
            };
        case TASK_REPORT:
            return {
                ...state,
                taskReportList: action.payload
            };
        default:
            return state;
    }
}
export default allInOneReducer;