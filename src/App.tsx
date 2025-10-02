import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import DefaultLayout from "./components/layout/DefaultLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/Verify";

// import { supabase } from "./servies/supabase";
import { handleAddWatches } from "./servies/handleAddData";

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

    //    So the approach is to first handle the auth with supabase's users table,
    // then incert a row to our own users table which include the business logic code.
    //
    //   In simple term:  User signs up → gets added to auth.users.
    // You listen to the signup event (e.g. via a Supabase function, webhook, or after-login logic) → insert a corresponding row in your users table with default values.
    // Now you manage your users with all the custom fields without messing with the auth system.
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
      element: <DefaultLayout />,
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
