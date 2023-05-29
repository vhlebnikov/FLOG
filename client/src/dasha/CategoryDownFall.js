import React, { useState } from 'react';
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import AdStore from "../store/AdStore";

function CategoryDownFall() { //{ ad, setAd }
    const adStore = new AdStore();

    const [selectedItem, setSelectedItem] = useState('Категория'); //ad.category ||

    const handleSelect = (eventKey, event) => {
        //const category = event.target.innerText;
        setSelectedItem(event.target.innerText);
        //setAd((prevAd) => ({ ...prevAd, category }));
    };

    return (
        <div>
            <Dropdown title={selectedItem} onSelect={handleSelect}>
                <Dropdown.Item eventKey="Item 1">Категория 1</Dropdown.Item>
                <Dropdown.Menu title="Категория 2">
                    <Dropdown.Item eventKey="Item 2A">Категория 2.1</Dropdown.Item>
                    <Dropdown.Item eventKey="Item 2B">Категория 2.2 </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Item eventKey="Item 3">Категория 3</Dropdown.Item>
                <Dropdown.Menu title="Категория 4">
                    <Dropdown.Menu title="Категория 4.1">
                        <Dropdown.Item eventKey="Item 4A-A">Категория 4.1.1</Dropdown.Item>
                        <Dropdown.Item eventKey="Item 4A-B">Категория 4.1.2</Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Item eventKey="Категория 4.2">Категория 4.2</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default CategoryDownFall;
