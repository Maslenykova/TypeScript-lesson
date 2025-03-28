
type UserRole = "guest" | "memeber" | "admin"

type User = {
    id:number
    username: string
    role: UserRole
}

type UpdatedUser = Partial<User> 
let nextUserId = 1;

export const users: User[] = [
    {id: nextUserId++, username: "john_doe", role: "memeber"},
    {id: nextUserId++, username: "jane_doe", role: "admin"},
    {id: nextUserId++, username: "guest_user", role: "guest"},
];

export function updateUser(id: number, updates: UpdatedUser){
   const foundUser = users.find(user=> user.id === id)
    if(!foundUser){
       console.error("User not found!")
       return
    }
    Object.assign(foundUser, updates)
}



export function addNewUser(newUser: Omit<User, "id">): User {
    const user: User ={
        id: nextUserId++,
        ...newUser
    }
    users.push(user);
    return user;
}

export function fetchUserDetails(username: string): User {
    const user = users.find(user=> user.username === username);
    if(!user){
        throw Error(`User with username ${username} not found`)
    }
    return user;
}

