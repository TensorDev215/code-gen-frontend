import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}

export default HomeLayout
