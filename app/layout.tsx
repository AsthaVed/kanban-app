"use client"; // Must be first line

import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { ReactNode } from "react";
import "./globals.css"; 

import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "@/store";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

