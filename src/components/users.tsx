import React from 'react'

interface User {
    bio: string;
    image_id: string;
    id: number
    password: string;
    created_at: string;
    updated_at: string;
}

interface UserProps {
    users: User[];
}


function Users(props: UserProps) {
  return (
    <div>
        <h1>Users</h1>
        <p>{props.users.map(user => 
        <div>
            <h3>{ user.id }</h3>
            <ul>
                <li>{user.bio}</li>
                <li>{ user.created_at }</li>
            </ul>
            
        </div>)}</p>
    </div>
  )
}

export default Users