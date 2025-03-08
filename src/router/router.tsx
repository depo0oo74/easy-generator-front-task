// ** import routes
import routes from "./routes/index";

// ** import layouts
import Navbar from "../components/layouts/Navbar";

// ** import home page
import Home from '../views/website/home'

// ** Error page Not found
import NotFound from "../views/errors/NotFound";

// ** Import useAuth context
import {useAuth} from '../hooks/useAuth'

// ** Import cookies 
import Cookies from 'js-cookie';

// ** router dom imports
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

const Router = () => {
    // ** Hooks
    const { accessToken } = useAuth();

    // ** vars 
    const token: string | undefined = accessToken && accessToken != '' ? accessToken : Cookies.get('accessToken')

    // ** routes of default layout
    const defaultLayoutRoutes = routes.filter((ele) => ele.layout === "default");
  
    // ** routes of auth layout
    const authLayoutRoutes = routes.filter((ele) => ele.layout === "auth");
  
    // ** default layout
    function defaultLayout() {
      if (!token || token == '') {
        return <Navigate to="/login" replace />
      }
      return (
        <>
          <Navbar />
          <Outlet />
        </>
      );
    }
  
    // ** auth layout
    function authLayout() {
      if (token) {
        return <Navigate to="/" replace />
      }
      return (
        <>
          <Outlet />
        </>
      );
    }
  
    return (
      <BrowserRouter>
        <Routes>
          {/* default layout routes */}
          <Route path="/" element={defaultLayout()}>
            {defaultLayoutRoutes.map((ele, index) => (
              <Route key={index} path={ele.path} element={<ele.component />} />
            ))}
            <Route path="/home" element={<Home />} />
          </Route>
          {/* auth layout routes */}
          <Route path="/" element={authLayout()}>
            {authLayoutRoutes.map((ele, index) => (
              <Route key={index} path={ele.path} element={<ele.component />} />
            ))}
          </Route>
          {/* if route is fault redirect to NotFound page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    )
  };
  
export default Router;