import React, { useState } from "react";
import Login from "./Login";
import User, { userType } from "./Users";
import Profile from "./Profile";
export default function UserModal() {
  const [currentUser, setCurrentUser] = useState<userType | false>(false);
  (async () => {
    const user = new User();
    setCurrentUser(await user.getCurrentUser());
  })();

  return <>{currentUser ? <Profile currentUser={currentUser} /> : <Login />}</>;
}
