"use client";

import { useState } from "react";
import MobileDrawer from "./MobileDrawer";

export default function AuthManager() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [view, setView] = useState("menu");
  const openDrawer = () => {
    setIsDrawerOpen(true);
    setView("menu");
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openLogin = () => {
    setView("login");
    setIsDrawerOpen(true);
  };

  const openRegister = () => {
    setView("register");
    setIsDrawerOpen(true);
  };

  return (
    <>
      <button onClick={openDrawer}>Open Menu</button>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        currentView={view}
        openLogin={openLogin}
        openRegister={openRegister}
      />
    </>
  );
}
