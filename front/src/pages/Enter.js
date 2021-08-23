import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Button, Space } from 'antd';
import style from './Enter.module.css';

function Enter() {
    const history = useHistory();

    return (
        <div className={`${style.main}`}>
            <h1>To Do App</h1>
            <Space>
                <Button onClick={() => history.push('/login')} type='primary'>로그인</Button>
                <Link to='/join'>회원가입</Link>
            </Space>
        </div>
    )
}

export default Enter;