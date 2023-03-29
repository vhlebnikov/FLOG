import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
    const {ad} = useContext(Context)
    return (
        <ListGroup>
            {ad.types.map(type =>
                <ListGroup.Item
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;