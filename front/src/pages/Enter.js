import { Link } from 'react-router-dom';


function Enter() {
    return (
        <div>
            Hi~!
            <Link to='/login'>로그인</Link>
            <Link to='/join'>회원가입</Link>
        </div>
    )
}

export default Enter;