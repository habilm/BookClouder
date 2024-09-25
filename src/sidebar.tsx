import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import MainPage from "./components/MainPage";
import Tags from "./components/Tags";

const SideBar = () => {
  return (
    <>
      <MainPage />
      <Tags />
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <SideBar />
  </React.StrictMode>
);
