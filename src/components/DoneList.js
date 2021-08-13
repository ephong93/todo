import { List } from 'antd';
import style from './Item.module.css';

function DoneList(props) {
    return (
        <List
            dataSource={props.itemList}
            renderItem={(value, index) => 
                <List.Item 
                    actions={[
                        <div 
                            className={`${style.icon}`}
                            onClick={() => props.removeDoneItem(index)}
                        >
                                -
                        </div>,
                        <div
                            className={`${style.icon}`}
                            onClick={() => props.restoreItem(value, index)}
                        >
                            restore
                        </div>
                    ]} className={`${style.item}`}>
                   { value }
                </List.Item>
            }
        ></List>
    )
}

export default DoneList;