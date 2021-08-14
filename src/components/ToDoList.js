import { List } from 'antd';
import style from './Item.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Item from './Item';


function ToDoList(props) {
    return (
        <List
            header={
                <List.Item
                    actions={[
                        <FontAwesomeIcon
                            icon={faPlus}
                            className={`${style.icon}`}
                            onClick={() => {
                                props.addToDoItem(props.inputValue);
                                props.changeInputValue('');
                            }}
                        />
                    ]}
                    className={`${style.item}`}>
                    <input onChange={e => props.changeInputValue(e.target.value)} value={props.inputValue}></input>
                </List.Item>
            }
            dataSource={props.itemList}
            renderItem={(value, index) => 
                <Item icons={{complete: true, edit: true, remove: true}} value={value} key={index} index={index} 
                    handleClick={icon => {
                        switch (icon) {
                            case 'complete':
                                props.completeItem(value, index);
                                break;
                            case 'remove':
                                props.removeToDoItem(index);
                                break;
                            default:
                                break;
                        }
                    }}
                    changeItem={props.changeToDoItem}
                />
            }
        ></List>
    )
}

export default ToDoList;