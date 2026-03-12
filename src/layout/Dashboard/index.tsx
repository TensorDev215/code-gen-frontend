import { Suspense, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardHeader from './Header'
import Navbar from './Navbar'
import { ThemeContext } from '../../context/ThemeProvider'

const DashboardLayout = () => {
  const { isExpanded, setIsExpanded } = useContext(ThemeContext)

  return (
    <>
      <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className={`min-h-[100vh] ${isExpanded ? 'lg:pl-60' : 'lg:pl-20'} transition-all duration-300`}>
        <DashboardHeader />
        <Suspense fallback={<div />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  )
}

export default DashboardLayout
