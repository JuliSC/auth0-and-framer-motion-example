import {useEffect, useState} from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import Profile from "./components/ProfileInfo";
import {motion} from "framer-motion";

function App() {
  const [count, setCount] = useState(0);
  const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <motion.div
      className="App background"
      style={{
        position: "relative",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 0%", "100% 100%", "0% 100%"],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        loop: Infinity,
      }}
    >
      <div>
        <Profile />
      </div>
      <div>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton />}
      </div>
    </motion.div>
  );
}

export default App;
