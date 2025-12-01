import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import {
  Home,
  Valentine,
  Birthday,
  ThankYou,
  Congratulations,
  GetWellSoon,
  Anniversary,
  Friendship,
  CustomSweater,
} from "./pages";
import { ViewportFix } from "./components/ViewportFix";
import "./index.css";

// Configure routes
const routes = [
  { path: "/", element: <Home /> },
  { path: "/valentine", element: <Valentine /> },
  { path: "/birthday", element: <Birthday /> },
  { path: "/thankyou", element: <ThankYou /> },
  { path: "/congratulations", element: <Congratulations /> },
  { path: "/getwellsoon", element: <GetWellSoon /> },
  { path: "/anniversary", element: <Anniversary /> },
  { path: "/friendship", element: <Friendship /> },
  { path: "/customsweater", element: <CustomSweater /> },
];

const router = createHashRouter(
  routes.map((route) => ({
    ...route,
    element: (
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        {route.element}
      </PrimeReactProvider>
    ),
  }))
);

localStorage.setItem("theme", "light");

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ViewportFix>
      <RouterProvider router={router} />
    </ViewportFix>
  </React.StrictMode>
);
