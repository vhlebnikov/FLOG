import React, {useEffect, useState} from 'react';
import {Cascader} from "rsuite";
import {getCategories} from "../http/categoryApi";
import AddOutlineIcon from '@rsuite/icons/AddOutline';

const AdminCategoryCascader = (props) => {
    const [rootCategories, setRootCategories] = useState([])
    const [value, setValue] = useState(null);
    const [selectedCategory, setSelectedCategory] = props.others

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
        console.log(id.label)

        return getCategories(id.value).then(data => Promise.allSettled(data.map(i => createNode(i))))
            .then(data => data.map(i => i.value)).then(data => [...data, {label: '+', value:Date.now(), children: null}])
    }

    useEffect(() => {
        getCategories(0).then(data => Promise.allSettled(data.map(i => createNode(i))))
            .then(data => setRootCategories(data.map(i => i.value)))
    }, [])

    return (
        <div>
            <Cascader
                style={{width:224}}
                searchable={false}
                parentSelectable={true}
                value={value}
                onChange={v => {
                    if (v.label === '+'){
                        setValue(0)
                    } else {
                        setValue(v)
                        setSelectedCategory(v)
                    }

                }}
                placeholder={"Категории"}
                data={[...rootCategories, {label: '+', value:Date.now(), children: null}]}
                getChildren = {fetchNodes}


                renderMenuItem={(label, item) => {
                    return (
                        <>
                            {item.label === "+" ? <AddOutlineIcon /> : item.label}
                        </>
                    );
                }}
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

export default AdminCategoryCascader;