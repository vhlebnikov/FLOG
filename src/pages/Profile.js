import React, {useContext, useState} from 'react';
import {Context} from "../index";

const Profile = () => {
    const {user} = useContext(Context)
    const [isEditing, setEditing] = useState(false)
    const [name, setName] = useState('')

    const handleEditing = () => {
        setEditing(true)
    }

    const handleSave = () => {
        setEditing(false)
    }

    return (
        <div>
            <h1>Личный кабинет</h1>
            <div>
                Имя: {isEditing ? (<input type="text" value={user.name} onChange={(event) => setName(event.target.value)}/>) : (<div>{name}</div>)}
            </div>
            <div>
                Email: {isEditing ? (<input type="text"/>) : (<div>{user.email}</div>)}
            </div>
            <div>
                Телефон: {isEditing ? (<input type="text"/>) : (<div>{user.number}</div>)}
            </div>
            <div>
                Адрес: {isEditing ? (<input type="text"/>) : (<div>{user.address}</div>)}
            </div>
            {isEditing ? (<button onClick={handleSave}>Сохранить</button>) : (<button onClick={handleEditing}>Редактировать</button>)}
        </div>
    );
}

export default Profile;