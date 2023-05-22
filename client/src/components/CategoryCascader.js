import React, {useEffect, useState} from 'react';
import {Cascader} from "rsuite";
import {getCategories} from "../http/categoryApi";

const CategoryCascader = () => {
    const [rootCategories, setRootCategories] = useState([])
    const [value, setValue] = useState(null);

    const createNode = async (category) => {
        const children = await getCategories(category.id)

        const label = category.name

        return {
            label,
            value: category.id,
            children: children.length ? [] : null
        }
    }

    const fetchNodes = async (id) => {
        return getCategories(id.value).then(data => Promise.allSettled(data.map(i => createNode(i))))
            .then(data => data.map(i => i.value))
    }

    useEffect(() => {
        getCategories(0).then(data => Promise.allSettled(data.map(i => createNode(i))))
            .then(data => setRootCategories(data.map(i => i.value)))
    }, [])

    return (
        <div>
            <Cascader
                searchable={false}
                parentSelectable={true}
                value={value}
                onChange={setValue}
                placeholder={"Категории"}
                data={rootCategories}
                getChildren={fetchNodes}
                renderMenu={(children, menu, parentNode) => {
                    if (parentNode && parentNode.loading) {
                        return <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>Loading...</p>;
                    }
                    return menu;
                }}
            />
        </div>
    );
};

export default CategoryCascader;