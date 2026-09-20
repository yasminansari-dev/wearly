import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { completeGoogleLogin } from "./api";

function App() {
  useEffect(() => {
    completeGoogleLogin();
  }, []);

  return (
    <Navbar />
  );
}

export default App;