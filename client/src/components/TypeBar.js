import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import CategoryDownFall from "../dasha/CategoryDownFall";

//Просто сделала посмотреть
const TypeBar = observer(() => {
    const {ad} = useContext(Context)
    return (
        <div>
            <ListGroup>
                {ad.categories.map(category =>
                    <ListGroup.Item key={category.id}>
                        {category.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
            <br/>
            <CategoryDownFall/>
        </div>

    );
});

export default TypeBar;