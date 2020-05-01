import { GET_BILLS } from "../Common/Urls";

export const GetBills = data => {
    return fetch(
        GET_BILLS, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    )
    .then((response) => response.json())
    .then((json) => {
        return json.bill;
    })
    .catch((error) => {
        return error;
    });
}