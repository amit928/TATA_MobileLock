import { DASHBOARD, LOGIN_DETAILS, TASK_LIST } from "./actionType";

const initialState = {
    dashboardDetails: [],
    loginDetails: {},
    taskList: []
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
        default:
            return state;
    }
}
export default allInOneReducer;