"use client"; // Must be first line

import { Provider } from "react-redux";
import { store } from "../store";
import { ReactNode } from "react";
import "./globals.css"; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}

