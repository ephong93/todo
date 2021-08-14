import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List } from 'antd';
import { useState } from 'react';
import style from './Item.module.css';

function Item(props) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editingValue, setEditingValue ] = useState('');

    const startEditing = () => {
        setEditingValue(props.value);
        setIsEditing(true);
    }

    const changeEditingValue = e => {
        setEditingValue(e.target.value);
    }

    const endEditing = () => {
        setIsEditing(false);
        props.changeItem(editingValue, props.index);
        setEditingValue('');
    }

    const icons = [];
    if (props.icons.complete) 
        icons.push(
            <FontAwesomeIcon icon={faCheck} className={`${style.icon}`} onClick={() => props.handleClick('complete')}/>
        );
    if (props.icons.restore)
        icons.push(
            <FontAwesomeIcon icon={faRedoAlt} className={`${style.icon}`} onClick={() => props.handleClick('restore')} />
        );
    if (props.icons.edit)
        icons.push(
            <FontAwesomeIcon icon={faEdit} className={`${style.icon}`} onClick={startEditing} />
        );
    if (props.icons.remove)
        icons.push(
            <FontAwesomeIcon icon={faTrashAlt} className={`${style.icon}`} onClick={() => props.handleClick('remove')} />
        );

    return(
        <List.Item 
            actions={icons} className={`${style.item}`}>
            { isEditing ? <input value={editingValue} onChange={changeEditingValue} onBlur={endEditing}></input> : props.value }
        </List.Item>
    );
}

export default Item;