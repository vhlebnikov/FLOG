import React, { useState } from "react";
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

function DropdownMenuS() {

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
            <Dropdown.Item
                eventKey="option-2"
                onMouseOver={() => {
                    document.getElementById("sub-sub-menu").style.display = "block";
                }}
                onMouseLeave={() => {
                    document.getElementById("sub-sub-menu").style.display = "none";
                }}
            >
                Option 2
                <ul className="dropdown-menu" id="sub-sub-menu">
                    <li><a className="dropdown-item" href="#">Sub-submenu item 1</a></li>
                    <li><a className="dropdown-item" href="#">Sub-submenu item 2</a></li>
                </ul>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="submenu" disabled>
                Submenu
            </Dropdown.Item>
            <Dropdown.Item
                eventKey="submenu-1"
                onMouseOver={() => {
                    document.getElementById("sub-menu").style.display = "block";
                }}
                onMouseLeave={() => {
                    document.getElementById("sub-menu").style.display = "none";
                }}
            >
                Submenu item 1
                <ul className="dropdown-menu" id="sub-menu">
                    <li><a className="dropdown-item" href="#">Submenu item 1.1</a></li>
                    <li><a className="dropdown-item" href="#">Submenu item 1.2</a></li>
                    <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                            Submenu item 1.3
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Sub-submenu item 1.3.1</a></li>
                            <li><a className="dropdown-item" href="#">Sub-submenu item 1.3.2</a></li>
                        </ul>
                    </li>
                </ul>
            </Dropdown.Item>
        </DropdownButton>
    );
}

export default DropdownMenuS;
