import { List, Space, Divider } from 'antd';
import { useEffect, useState } from 'react';
import itemStyle from './Item.module.css';
import itemListStyle from './ItemList.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Item from './Item';

function ItemList(props) {
    const [ inputValue, changeInputValue ] = useState('');
    const [ itemList, setItemList ] = useState({});

    const fetchItemList = async (params) => {
        let res = await fetch('http://localhost:5000/api/todo?' + new URLSearchParams(params),
        {
            method: 'GET',
            credentials: 'include'
        });
        res = await res.json();
        if (res.status === 'success') {
            const _itemList = {};
            res.data.forEach(data => {
                _itemList[data.id] = data;
            });
            console.log(params, _itemList);
            setItemList(_itemList);
        }
    }

    useEffect(() => {
        fetchItemList(props.date);
    }, [props.date]);

    const toDoList = [];
    const doneList = [];

    for (let key in itemList) {
        const item = itemList[key];
        if (item.done) doneList.push(item);
        else toDoList.push(item);
    }

    const sendItem = async (item, method) => {
        let res = await fetch('http://localhost:5000/api/todo',
        {
            method: method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        });
        return res.json();
    }

    const addItem = async (content, done) => {
        const res = await sendItem({
            id: null,
            content: content, 
            done: done,
            date: props.date
        }, 'POST');
        if (res.status === 'success') {
            const itemId = res.data.id;
            setItemList({...itemList,
                [itemId]: res.data
            });
        }
    }

    const completeItem = async itemId => {
        const item = itemList[itemId];
        const res = await sendItem({
            id: itemId,
            content: item.content, 
            done: true,
            date: props.date
        }, 'PUT');
        if (res.status === 'success') {
            setItemList({...itemList,
                [itemId]: {
                    ...item,
                    done: true
                }
            });
        }
    }

    const restoreItem = async itemId => {
        const item = itemList[itemId];
        const res = await sendItem({
            id: itemId,
            content: item.content, 
            done: false,
            date: props.date
        }, 'POST');
        if (res.status === 'success') {
            setItemList({...itemList,
                [itemId]: {
                    ...item,
                    done: false
                }
            });
        }
    }

    const removeItem = async itemId => {
        const item = itemList[itemId];
        const res = await sendItem(item, 'DELETE');
        if (res.status === 'success') {
            const _itemList = {...itemList};
            delete _itemList[itemId];
            setItemList(_itemList);
        }
    }

    const changeItem = async (itemId, content) => {
        const item = itemList[itemId];
        const newItem = {
            id: itemId,
            content: content,
            done: item.done,
            date: props.date
        }
        const res = await sendItem(newItem, 'PUT');
        if (res.status === 'success') {
            setItemList({...itemList, 
                [itemId]: newItem
            });
        }
    }

    return (
        <div className={`${itemListStyle.main}`}>
            <div className={`${itemListStyle.date}`}>
                {props.date.year + '-' + props.date.month + '-' + props.date.day}
            </div>
            <Space direction='vertical' size='large' className={`${itemListStyle.space}`}>
                <div className={`${itemListStyle.itemListContainer}`}>
                    <Divider orientation='left'>To do</Divider>
                    <List
                        header={
                            <List.Item
                                actions={[
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={`${itemStyle.icon}`}
                                        onClick={() => {
                                            if (inputValue === '') return;
                                            addItem(inputValue, false);
                                            changeInputValue('');
                                        }}
                                    />
                                ]}
                                className={`${itemStyle.item}`}>
                                <input onChange={e => changeInputValue(e.target.value)} value={inputValue}></input>
                            </List.Item>
                        }
                        dataSource={toDoList}
                        renderItem={item => 
                            <Item icons={{complete: true, edit: true, remove: true}} value={item.content} key={item.id} index={item.id} 
                                handleClick={icon => {
                                    switch (icon) {
                                        case 'complete':
                                            completeItem(item.id);
                                            break;
                                        case 'remove':
                                            removeItem(item.id);
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                changeItem={changeItem}
                            />
                        }
                    ></List>
                </div>
                <div className={`${itemListStyle.itemListContainer}`}>
                    <Divider orientation='left'>Done</Divider>
                    <List
                        dataSource={doneList}
                        renderItem={item => 
                            <Item icons={{restore: true, edit: true, remove: true}} value={item.content} key={item.id} index={item.id}
                                handleClick={icon => {
                                    switch (icon) {
                                        case 'restore':
                                            restoreItem(item.id);
                                            break;
                                        case 'remove':
                                            removeItem(item.id);
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                changeItem={changeItem}
                            />
                        }
                    ></List>
                </div>
            </Space>
        </div>
    );
}

export default ItemList;