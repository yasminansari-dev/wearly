import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ForHero from "./components/forhero";
import AuthPage from "./components/AuthPage";
import { completeGoogleLogin, getCurrentUser } from "./api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [hash, setHash] = useState(window.location.hash || "#home");

  useEffect(() => {
    completeGoogleLogin();
    getCurrentUser()
      .then(setCurrentUser)
      .catch(() => setCurrentUser(null));

    const handleHashChange = () => {
      setHash(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // If hash is #login or #register, render AuthPage
  if (hash === "#login" || hash === "#register") {
    return <AuthPage initialMode={hash === "#register" ? "register" : "login"} />;
  }

  return (
    <div className="relative min-h-screen bg-forest-900 text-bone selection:bg-sage-500 selection:text-forest-950 font-sans">
      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        cartCount={0}
        wishlistCount={0}
        onOpenCart={() => {}}
        onOpenWishlist={() => {}}
      />

      {/* Main Landing Content */}
      <main>
        {/* Editorial Hero Showcase */}
        <ForHero onQuickView={() => {}} />
      </main>
    </div>
  );
}

export default App;