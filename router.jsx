import { createBrowserRouter } from "react-router-dom";
import Add from "./src/pages/Add";
import EmployeeList from "./src/pages/EmployeeList";
import Error from "./src/pages/Error";

export const router = createBrowserRouter([
   {
    path: "/",
    element: <Add />,
    
  },
   {
    path: "/list-employee",
    
    element: <EmployeeList />,
  },
  {
    path: "*",
    element: 
   <Error/>,
  },
]);

