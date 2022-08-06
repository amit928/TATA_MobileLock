import { BASE_URL } from "../constants";


export const fetchDashboard = (staf_sl, returnData) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: null
    };
    return (
        fetch(`${BASE_URL}/api/Dashboard/${staf_sl}`, requestOptions)
            .then(response => response.json())
            .then(data =>
                data.Code == '200' ?
                    returnData(data.data[0])
                    :
                    alert(data.Code)
            )
    )
}