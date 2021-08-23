import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Button, Form, Space } from 'antd';
import UserContext from '../UserContext';
import style from './Form.module.css';

function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState(null);
    const history = useHistory();
    return (
        <UserContext.Consumer>
            {({login}) => 
                <div className={`${style.main}`}>
                    <Form>
                        <Form.Item
                            label='아이디'
                            name='username'
                            rules={[{ required: true, message: '아이디를 입력하세요.' }]}
                        >
                            <Input value={username} onChange={e => { setUsername(e.target.value) }} />
                        </Form.Item>
                        <Form.Item
                            label='비밀번호'
                            name='password'
                            rules={[{ required: true, message: '비밀번호를 입력하세요.' }]}
                        >
                            <Input.Password value={password} onChange={e => { setPassword(e.target.value) }} />
                        </Form.Item>
                        { errorMessage && <div>{errorMessage}</div>}
                        <Space>
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
                        </Space>
                    </Form>
                </div>
            }
        </UserContext.Consumer>
    )
}

export default Login;