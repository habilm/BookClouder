import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css"
import {  getCurrentUser, saveCurrentUser, UserData }  from "./helpers/storage";

const Popup = () => {
  const [count, setCount] = useState(0);

  const [currentUser, storeCurrentUser] = useState<UserData|undefined>(undefined);

  useEffect(() => {
    chrome.action.setBadgeText({ text: "1" });
  }, [count]);

  async function saveUser(user: UserData):Promise<void>{
    storeCurrentUser(user);
    await saveCurrentUser(user)
  }

  useEffect(() => {
   
    ( async () => {
      const user = await getCurrentUser();
      console.log(user);
      if(user){
        storeCurrentUser(user)
      }
    })()
  }, []);

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  return (
    <>
      {currentUser?<>Logged User</>:<>Not Logged In</>}
      <button onClick={ async ()=>{ await saveUser({avatarUrl:"/",token:"w23432",userName:"fsad"})}}>Login Now</button>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
