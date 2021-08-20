import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Button } from 'antd';
import UserContext from '../UserContext';

function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState(null);
    const history = useHistory();
    return (
        <UserContext.Consumer>
            {({login}) => 
                <div>
                    <Input value={username} onChange={e => { setUsername(e.target.value) }} />
                    <Input value={password} onChange={e => { setPassword(e.target.value) }} />
                    { errorMessage && <div>{errorMessage}</div>}
                    <Button type='primary' onClick={async () => {
                        const res = await login(username, password);
                        if (res.status === 'success') {
                            history.push('/main');
                        } else {
                            setErrorMessage('로그인 실패');
                        }
                        console.log(res);
                    }}>Login</Button>
                    <Link to='/join'>회원가입</Link>
                </div>
            }
        </UserContext.Consumer>
    )
}

export default Login;