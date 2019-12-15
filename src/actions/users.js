
//Export both of these so they can be used elsewhere
export const RECIEVE_USERS= "RECIEVE_USERS"


export function getInitialUsers (users) {
    return(
    {
        type: RECIEVE_USERS,
        users: users
    }
    )
}