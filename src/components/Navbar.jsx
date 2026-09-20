import { useEffect, useState } from "react";
import AuthPage from "./AuthPage";
import ForHero from "./forhero";

function Navbar() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isAuthPage = currentHash === "#login" || currentHash === "#register" || currentHash === "#forgot-password";

  if (isAuthPage) {
    return <AuthPage initialMode={currentHash === "#register" ? "register" : "login"} />;
  }

  return <ForHero />;
}

export default Navbar;