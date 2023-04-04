import React, { useState } from "react";
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

function Submenu() {
    return (
        <Dropdown.Menu>
            <Dropdown.Item eventKey="submenu-1">Submenu item 1</Dropdown.Item>
            <Dropdown.Item eventKey="submenu-2">Submenu item 2</Dropdown.Item>
            <Dropdown.Item eventKey="submenu-3">Submenu item 3</Dropdown.Item>

        </Dropdown.Menu>
    );
}

function DropdownMenu() {

    const [selectedItem, setSelectedItem] = React.useState('Категория');
    const handleSelect = (eventKey) => {
        setSelectedItem(eventKey);
    };

    return (
        <DropdownButton
            id="dropdown-basic-button"
            title={selectedItem}
            onSelect={handleSelect}
        >
            <Dropdown.Item eventKey="option-1">Option 1</Dropdown.Item>
            <Dropdown.Item eventKey="option-2">Option 2</Dropdown.Item>
            <Dropdown>
                <Dropdown.Toggle eventKey="option-3" variant="light">
                    Option 3
                </Dropdown.Toggle>
                <Dropdown.Menu show={false} align="left">
                    <Submenu />
                </Dropdown.Menu>
            </Dropdown>
        </DropdownButton>
    );
}
export default DropdownMenu;