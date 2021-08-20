import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import AuthRoute from './AuthRoute';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Enter from './pages/Enter';
import UserContext from './UserContext';
import './App.less';

function App() {
  const [ user, setUser ] = useState(null);
  const authenticated = false;

  const login = (username, password) => {
    let res = await fetch('http://localhost:5000/api/login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    res = await res.json();
  }

  const logout = () => {
    let res = await fetch('http://localhost:5000/api/logout',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include'
    });
    res = await res.json();
  }

  const join = async (username, password) => {
    let res = await fetch('http://localhost:5000/api/join',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    res = await res.json();
    console.log(res);
  }

  return (
    <UserContext.Provider value={{
      user: user,
      login: login,
      logout: logout,
      join: join
    }}>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/join'>
            <Join />
          </Route>
          <Route path='/'>
            <Enter />
          </Route>
          <AuthRoute authenticated={authenticated} render={() => <Main/>} path='/' />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
