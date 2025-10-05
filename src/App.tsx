import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import DefaultLayout from "./components/layout/DefaultLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/Verify";

import { handleAddWatches } from "./servies/handleAddData";
import { RouteProtection } from "./servies/RouteProtection";

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

    // const fetchUserInfo = async () => {
    //   const {
    //     data: { session },
    //     error,
    //   } = await supabase.auth.getSession();
    //
    //   if (error) {
    //     console.log("there was an error:", error);
    //   }
    //   console.log(session);
    // };
    // fetchUserInfo();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/verify",
      element: <VerifyOtp />,
    },
    {
      element: (
        <RouteProtection>
          <DefaultLayout />
        </RouteProtection>
      ),
      children: [
        {
          path: "/",
          element: <Homepage />,
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
