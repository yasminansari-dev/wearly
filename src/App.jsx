import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { completeGoogleLogin, getCurrentUser } from "./api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    completeGoogleLogin();
    getCurrentUser()
      .then(setCurrentUser)
      .catch(() => setCurrentUser(null));
  }, []);

  return <Navbar currentUser={currentUser} />;
}

export default App;