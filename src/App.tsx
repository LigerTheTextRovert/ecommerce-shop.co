import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>home</h1>,
    },
    {
      path: "/pricing",
      element: <h1>pricing</h1>,
    },
    {
      path: "*",
      element: <h1>page not found :(</h1>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
