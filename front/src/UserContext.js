import React from 'react';

const UserContext = React.createContext({
    user: null,
    login: () => {},
    logout: () => {},
    join: () => {}
});

export default UserContext;