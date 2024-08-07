import { useEffect, useState } from 'react';
import './App.css';
import Pages from "./components/pages/Pages.jsx";
import Header from "./components/header/Header.jsx";
import NiceModal from "@ebay/nice-modal-react";
import Sign from "./components/header/Sign.jsx";
import {getUser} from "./request/util.request.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [userTeam, setUserTeam] = useState(0);
  const checkIfUserHasTeam = async (username) => {
    try {
        if(username) {
            const response = await getUser(username);
            setUserTeam(response);
        }
    } catch (error) {
      console.error('Failed to check if user has team:', error);
      setUserTeam(null);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(storedUser);
        checkIfUserHasTeam(storedUser);
    }
  }, [loggedInUser]);

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
    checkIfUserHasTeam(localStorage.getItem('loggedInUser'));
    localStorage.setItem('loggedInUser', username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUserTeam(0);
    checkIfUserHasTeam(null);
    localStorage.removeItem('loggedInUser');
  };


  return (
      <NiceModal.Provider>
        <Header
            loggedInUser={loggedInUser}
            onShowLoginModal={() => NiceModal.show(Sign, { onLoginSuccess: handleLoginSuccess })}
            onLogout={handleLogout}
        />
        <Pages userTeam={userTeam}
               loggedInUser={loggedInUser}
        />
      </NiceModal.Provider>
  );
}

export default App;
