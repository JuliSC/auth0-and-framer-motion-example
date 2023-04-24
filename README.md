# Documentation

## Guide to reproducing this example without the animations

1. Create a React, Typescript project using vite, and make sure it's running on localhost:8080.
2. Your vite.config.ts file should look like this:

```js
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
});
```

3. Open a browser, go to https://auth0.com/ and log in/sign up to Auth0.
4. Navigate to Applications and click "+ Create Application".
5. Choose "Single Page Web Applications" and click "Create".
6. Choose React as your technology.
7. Navigate to "Settings" and copy the Domain and Client ID.
8. Under the "Application URIs" section, add "http://localhost:8080" to the "Allowed Callback URLs" and "Allowed Web Origins" sections.
9. Under the "Allowed Logout URLs" section, add "http://localhost:8080" to the "Allowed Logout URLs" section.
10. Under the "Allowed Web Origins" section, add "http://localhost:8080" to the "Allowed Web Origins" section.
11. Click "Save Changes".
12. Now navigate to "Authentication" and "Social" and click "+ Create Connection".
13. Search for github and click the card.
14. Click "Continue" and then click "Create".
15. Return to your React project and run `npm install @auth0/auth0-react`.
16. Navigate to main.tsx and wrap your App component in the Auth0Provider component. Here is how I did it:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-example.eu.auth0.com"
      clientId="agasdgam8i738vbfsa876f3akjbf"
      authorizationParams={{
        redirect_uri: "http://localhost:8080",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

```

14. Make sure you replace the domain and client ID with your own and set the redirect URI to `http://localhost:8080`.
15. Create a login button component. Here's mine:

```js
import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
```

16. Then create a logout button component. Here's mine:

```js
import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const LogoutButton = () => {
  const {logout} = useAuth0();

  return (
    <button
      onClick={() =>
        logout({logoutParams: {returnTo: "http://localhost:8080"}})
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
```

17. Then create a profile component. Here's my profile component. (You can ignore the framer-motion parts and just use normal div elements).

```js
import React from "react";
import {motion} from "framer-motion";
import {useAuth0} from "@auth0/auth0-react";

const Profile = () => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && user ? (
    <div>
      <motion.img
        style={{borderRadius: "20px"}}
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1, rotate: 720}}
        transition={{
          type: "spring",
          duration: 3,
          delay: 0.5,
        }}
        whileHover={{
          transition: {
            type: "",
            delay: 0,
            duration: 0.2,
          },
          scale: 1.1,
          zIndex: 1,
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
          translateY: "-20px",
        }}
        src={user.picture}
        alt={user.name}
      />
      <h2>{user.name ? user.name : user.nickname ? user.nickname : null}</h2>
      <p>{user.email}</p>
    </div>
  ) : null;
};

export default Profile;
```

18. Now implement the login, logout, and profile components on a page. Here's what I did. (Again, you can ignore the framer-motion parts and just use normal div elements)

```js
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
```

19. Run `npm run dev` and you should be good to go!
