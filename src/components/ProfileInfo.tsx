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
        src={user.picture}
        alt={user.name}
      />
      <h2>{user.name ? user.name : user.nickname ? user.nickname : null}</h2>
      <p>{user.email}</p>
    </div>
  ) : null;
};

export default Profile;
