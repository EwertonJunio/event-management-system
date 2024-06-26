import React, { useState } from 'react';
import SignInForm from './components/SignInForm';
import RegisterForm from './components/RegisterForm';
import EventList from './components/EventsOverview';

const App = () => {
    const [auth, setAuth] = useState(!!localStorage.getItem('token'));
    const [showRegister, setShowRegister] = useState(false);

    const showRegisterForm = () => {
        setShowRegister(true);
    };

    return ( <
        div className = "App" > {
            auth ? ( <
                EventList / >
            ) : showRegister ? ( <
                RegisterForm setAuth = { setAuth }
                />
            ) : ( <
                SignInForm setAuth = { setAuth }
                showRegisterForm = { showRegisterForm }
                />
            )
        } <
        /div>
    );
}

export default App;