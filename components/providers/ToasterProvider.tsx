"use client";

import { Toaster } from "react-hot-toast";

function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}

export default ToasterProvider;
