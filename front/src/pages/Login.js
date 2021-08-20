import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import UserContext from '../UserContext';

function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return (

        <UserContext.Consumer>
            {({login}) => 
                <div>
                    <Input value={username} onChange={e => { setUsername(e.target.value) }} />
                    <Input value={password} onChange={e => { setPassword(e.target.value) }} />
                    <Button type='primary' onClick={() => {login(username, password)}}>Login</Button>
                    <Link to='/join'>회원가입</Link>
                </div>
            }
        </UserContext.Consumer>
    )
}

export default Login;