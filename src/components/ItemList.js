import { List } from 'antd';
import Item from './Item';

function ToDoList(props) {
    return (
        <List
            dataSource={['ADD_ITEM'].concat(props.data)}
            renderItem={data => 
                <Item data={data}></Item>
            }
        ></List>
    )
}

export default ToDoList;