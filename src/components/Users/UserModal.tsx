import React, { useEffect, useState } from "react";
import Login from "./Login";

import Profile from "./Profile";
import UserManager, { userType } from "../../helpers/UserManager";
export default function UserModal() {
  const [currentUser, setCurrentUser] = useState<userType | false>(false);

  async function onUserChange() {}

  useEffect(() => {
    (async () => {
      const user = new UserManager();
      setCurrentUser(await user.getCurrentUser());
      user.onChange(async () => {
        await onUserChange();
      });
    })();
  }, []);

  return <>{currentUser ? <Profile currentUser={currentUser} /> : <Login />}</>;
}
