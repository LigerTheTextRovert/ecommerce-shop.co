import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { handleAddWatches } from "./db/handleAddData";
import Navbar from "./components/layout/Navbar";

function App() {
  useEffect(() => {
    const insertData = async () => {
      try {
        const data = await handleAddWatches();
        console.log("incerted data", data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    insertData();
  }, []);

  const router = createBrowserRouter([
    {
      element: <Navbar />,
      children: [
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
