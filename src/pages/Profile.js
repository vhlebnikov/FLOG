import React, {useContext, useState} from 'react';
import {Context} from "../index";

const Profile = () => {
    const {user} = useContext(Context)
    const [isEditing, setEditing] = useState(false)
    const [nameLoc, setName] = useState('')
    const [emailLoc, setEmail] = useState('')
    const [numberLoc, setNumber] = useState('')
    const [addressLoc, setAddress] = useState('')

    const handleEditing = () => {
        setEditing(true)
    }

    const handleSave = () => {
        setEditing(false)
        user.setUser({
            name: nameLoc,
            email: emailLoc,
            number: numberLoc,
            address: addressLoc
        })
    }

    return (
        <div>
            <h1>Личный кабинет</h1>
            <div>
                Имя:
                {isEditing
                    ? (<input type="text"
                                     value={user.name}
                                     onChange={(event) => setName(event.target.value)}/>)
                    : (<div>{user.name}</div>)}
            </div>
            <div>
                Email:
                {isEditing
                    ? (<input type="text"
                              value={user.email}
                              onChange={(event) => setEmail(event.target.value)}/>)
                    : (<div>{user.email}</div>)}
            </div>
            <div>
                Телефон:
                {isEditing
                    ? (<input type="text"
                              value={user.number}
                              onChange={(event) => setNumber(event.target.value)}/>)
                    : (<div>{user.number}</div>)}
            </div>
            <div>
                Адрес:
                {isEditing
                    ? (<input type="text"
                              value={user.address}
                              onChange={(event) => setAddress(event.target.value)}/>)
                    : (<div>{user.address}</div>)}
            </div>
            {isEditing ? (<button onClick={handleSave}>Сохранить</button>) : (<button onClick={handleEditing}>Редактировать</button>)}
        </div>
    );
}

export default Profile;