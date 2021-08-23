import { useHistory } from 'react-router-dom';
import { Button, Space } from 'antd';
import UserContext from '../UserContext';
import style from './HeaderBar.module.css';

function HeaderBar() {
    const history = useHistory();

    return (
        <UserContext.Consumer>
            {({user, logout}) => 
                <div className={`${style.main}`}>
                    <span className={`${style.logo}`} onClick={() => { history.push('/'); }}>To Do App</span>
                    { user && 
                    <div className={`${style.user}`}>
                        <Space>
                            <div>Hi, {user}!
                            </div>
                            <Button ghost onClick={async () => {
                                const res = await logout();
                            }}>로그아웃</Button>
                        </Space>
                    </div>}
                </div>
            }
        </UserContext.Consumer>
    );
}

export default HeaderBar;