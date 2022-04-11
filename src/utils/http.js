import axios from 'axios';

const BACKEND_URL = 'https://pool-rides-db-default-rtdb.firebaseio.com/'


export function storeUser(userType, userData) {
    axios.post(
        BACKEND_URL + userType + '.json',
        userData
    );
}

export async function fetchUser() {
    const response = await axios.get('https://pool-rides-db-default-rtdb.firebaseio.com/riders.json');
    
    return response;

    // const user = [];

    // const users = [];
    
    // for (const key in response.data) {
    //     const userObj = {
    //         id: key,
    //         email: response.data[key].email,
    //         firstName: response.data[key].firstName,
    //         lastName: response.data[key].lastName,
    //         phone: response.data[key].phone,
    //         date: response.data[key].date,
    //     };
    //     users.push(userObj);
    // }

}