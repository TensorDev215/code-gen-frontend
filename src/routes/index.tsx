import { createBrowserRouter } from 'react-router-dom'
import HomeLayout from '../layout/Home'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import DashboardLayout from '../layout/Dashboard'
import Page404 from '../pages/Page404'

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
  }
])

export default routes
