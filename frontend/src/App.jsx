import { useEffect, useState } from 'react';
import './App.css';
import Pages from "./components/pages/Pages.jsx";
import Header from "./components/header/Header.jsx";
import NiceModal from "@ebay/nice-modal-react";
import Sign from "./components/header/Sign.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
    localStorage.setItem('loggedInUser', username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
      <>
        <Header
            loggedInUser={loggedInUser}
            onShowLoginModal={() => NiceModal.show(Sign, { onLoginSuccess: handleLoginSuccess })}
            onLogout={handleLogout}
        />
        <Pages />
      </>
  );
}

export default App;
