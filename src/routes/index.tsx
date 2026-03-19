import { createBrowserRouter } from 'react-router-dom'
import HomeLayout from '../layout/Home'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import DashboardLayout from '../layout/Dashboard'
import Page404 from '../pages/Page404'
import Signin from '../pages/Auth/SignIn'
import Signup from '../pages/Auth/SignUp'
import VerifyEmail from '../pages/Auth/VerifyEmail'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  }
])

export default routes
