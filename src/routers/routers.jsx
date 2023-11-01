import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DetailCountry from "../pages/DetailCountry";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/detail/:title",
    element: <DetailCountry />,
  },
]);

export default router;