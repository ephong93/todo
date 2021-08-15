import { List, Space, Divider } from 'antd';
import { useState } from 'react';
import style from './Item.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Item from './Item';


function ItemList(props) {
    const [ inputValue, setInputValue ] = useState('');
    const [ toDoList, setToDoList ] = useState('');
    const [ doneList, setDoneList ] = useState('');

    const changeInputValue = value => {
        setInputValue(value);
    }

    const addToDoItem = value => {
        setToDoList([value, ...toDoList]);
    }

    const addDoneItem = value => {
        setDoneList([value, ...doneList]);
    }

    const completeItem = (value, index) => {
        addDoneItem(value);
        removeToDoItem(index);
    }

    const removeToDoItem = index => {
        setToDoList(toDoList.filter((_value, _index) => _index !== index));
    }

    const removeDoneItem = index => {
        setDoneList(doneList.filter((_value, _index) => _index !== index));
    }

    const restoreItem = (value, index) => {
        addToDoItem(value);
        removeDoneItem(index);
    }

    const changeToDoItem = (value, index) => {
        setToDoList([...toDoList.slice(0, index), value, ...toDoList.slice(index+1)]);
    }

    const changeDoneItem = (value, index) => {
        setDoneList([...doneList.slice(0, index), value, ...doneList.slice(index+1)]);
    }


    return (
        <div style={{width: '95%', margin: 'auto'}}>
            <Space direction='vertical' size='large' style={{width: '100%'}}>
                <div style={{width: 'auto'}}>
                    <Divider orientation='left'>To do</Divider>
                    <List
                        header={
                            <List.Item
                                actions={[
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={`${style.icon}`}
                                        onClick={() => {
                                            if (inputValue === '') return;
                                            addToDoItem(inputValue);
                                            changeInputValue('');
                                        }}
                                    />
                                ]}
                                className={`${style.item}`}>
                                <input onChange={e => changeInputValue(e.target.value)} value={inputValue}></input>
                            </List.Item>
                        }
                        dataSource={toDoList}
                        renderItem={(value, index) => 
                            <Item icons={{complete: true, edit: true, remove: true}} value={value} key={index} index={index} 
                                handleClick={icon => {
                                    switch (icon) {
                                        case 'complete':
                                            completeItem(value, index);
                                            break;
                                        case 'remove':
                                            removeToDoItem(index);
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                changeItem={changeToDoItem}
                            />
                        }
                    ></List>
                </div>
                <div style={{width: '100%'}}>
                    <Divider orientation='left'>Done</Divider>
                    <List
                        dataSource={doneList}
                        renderItem={(value, index) => 
                            <Item icons={{restore: true, edit: true, remove: true}} value={value} key={index} index={index}
                                handleClick={icon => {
                                    switch (icon) {
                                        case 'restore':
                                            restoreItem(value, index);
                                            break;
                                        case 'remove':
                                            removeDoneItem(index);
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                changeItem={changeDoneItem}
                            />
                        }
                    ></List>
                </div>
            </Space>
        </div>
    )
}

export default ItemList;