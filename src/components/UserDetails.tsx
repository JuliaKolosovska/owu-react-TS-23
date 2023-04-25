import React, {FC} from 'react';
import {IUser} from "../interfaces/user.interface";

interface IProps {

    user:IUser;
}

const UserDetails:FC<IProps> = ({user}) => {
    const{id, name, email,username}=user;
    return (
        <div>
            <div>id:{id}</div>
            <div>name:{name}</div>
            <div>email:{email}</div>
            <div>username:{username}</div>
            <hr/>
            <hr/>
            <hr/>
        </div>
    );
};

export {UserDetails}