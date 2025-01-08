import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import DatailsTaskPage from "./pages/DatailsTaskPage.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { AuthProvider } from "./contexts/Auth/AuthProvider.tsx";
import { RequireAuth } from "./contexts/Auth/RequireAuth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/getTasks/:id",
    element: (
      <RequireAuth>
        <DatailsTaskPage />
      </RequireAuth>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {/* <App /> */}
  </StrictMode>
);
