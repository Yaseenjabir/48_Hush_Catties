"use client";
import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function Page() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Signup setShowLogin={setShowLogin} />
      )}
    </>
  );
}
