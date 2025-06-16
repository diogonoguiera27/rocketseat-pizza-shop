import { createBrowserRouter } from "react-router-dom";

import { SignIn } from "./pages/auth/sign-in";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignUp } from "./pages/auth/sign-up";
import { Orders } from "./pages/app/orders/orders";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Error } from "./pages/erro";
import { NotFound } from "./404";
import { ProductCatalog } from "./pages/app/ProductCatalog/ProductCatalog";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {path: "/", element: <Dashboard/>},
            {path: "/orders", element: <Orders/>},
            {path: "/ProductCatalog", element: <ProductCatalog/>},
            
        ],
    },
    {
        path: "/",
        element: <AuthLayout/>,
        children: [
            {path: "/sign-in", element: <SignIn/>},
            {path: "/sign-up", element: <SignUp/>},
        ],
    },
    {
      path:'*',
      element: <NotFound/>  
    }
    
    
    
])