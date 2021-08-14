import { List } from 'antd';
import Item from './Item';

function DoneList(props) {
    return (
        <List
            dataSource={props.itemList}
            renderItem={(value, index) => 
                <Item icons={{restore: true, edit: true, remove: true}} value={value} key={index} index={index}
                    handleClick={icon => {
                        switch (icon) {
                            case 'restore':
                                props.restoreItem(value, index);
                                break;
                            case 'remove':
                                props.removeDoneItem(index);
                                break;
                            default:
                                break;
                        }
                    }}
                    changeItem={props.changeDoneItem}
                />
            }
        ></List>
    )
}

export default DoneList;