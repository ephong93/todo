import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Button } from 'antd';
import UserContext from '../UserContext';
function Join(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ]=  useState(null);
    const history = useHistory();

    return (
        <UserContext.Consumer>
            {({join}) => 
                <div>
                    <Input value={username} onChange={e => { setUsername(e.target.value) }} />
                    <Input value={password} onChange={e => { setPassword(e.target.value) }} />
                    { errorMessage && <div>{errorMessage}</div>}
                    <Button type='primary' onClick={() => {
                        const res = join(username, password);
                        if (res.status === 'success') {
                            history.push('/login');
                        } else {
                            setErrorMessage('회원가입 실패');
                        }
                        console.log(res);
                    }}>Join</Button>
                    <Link to='/login'>로그인</Link>
                </div>
            }
        </UserContext.Consumer>
    )
}

export default Join;