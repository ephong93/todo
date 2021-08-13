import { List } from 'antd';
import style from './Item.module.css';

function ToDoList(props) {
    return (
        <List
            header={
                <List.Item
                    actions={[
                        <div 
                            className={`${style.icon}`}
                            onClick={() => {
                                props.addToDoItem(props.inputValue);
                                props.changeInputValue('');
                            }}
                        >
                                +
                        </div>
                    ]}
                    className={`${style.item}`}>
                    <input onChange={e => props.changeInputValue(e.target.value)} value={props.inputValue}></input>
                </List.Item>
            }
            dataSource={props.itemList}
            renderItem={(value, index) => 
                <List.Item 
                    actions={[
                        <div 
                            className={`${style.icon}`}
                            onClick={() => props.removeToDoItem(index)}
                        >
                            -
                        </div>,
                        <div
                            className={`${style.icon}`}
                            onClick={() => props.completeItem(value, index)}
                        >
                            complete
                        </div>
                    ]} className={`${style.item}`}>
                   { value }
                </List.Item>
            }
        ></List>
    )
}

export default ToDoList;