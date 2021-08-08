import style from './Item.module.css';

function Item(props) {
    return (
        <div className={`${style.todo}`}>{props.data}</div>
    )
}

export default Item;