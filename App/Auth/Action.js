import { LOGIN_URL } from "../Common/Urls";

export const GetAccess = data => {
    return fetch(
        LOGIN_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    )
    .then((response) =>{
        try{
            return response.json()
        }catch(err){
            return { error: "Server error" }
        }
    })
}