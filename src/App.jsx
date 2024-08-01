import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Template1 from "./pages/Frontend/PagesTemplates/Template1/Template1";
import Template2 from "./pages/Frontend/PagesTemplates/Template2/Template2";
import Template3 from "./pages/Frontend/PagesTemplates/Template3/Template3";
import Template4 from "./pages/Frontend/PagesTemplates/Template4/Template4";
import Template5 from "./pages/Frontend/PagesTemplates/Tempate5/Template5";
import Template6 from "./pages/Frontend/PagesTemplates/Template6/Template6";
import Template7 from "./pages/Frontend/PagesTemplates/Template7/Template7";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "template1",
          element: <Template1 />,
        },
        {
          path: "template2",
          element: <Template2 />,
        },
        {
          path: "template3",
          element: <Template3 />,
        },
        {
          path: "template4",
          element: <Template4 />,
        },
        {
          path: "template5",
          element: <Template5 />,
        },
        {
          path: "template6",
          element: <Template6 />,
        },
        {
          path: "template7",
          element: <Template7/>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default App;
