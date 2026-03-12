import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
      <div>
        <Suspense fallback={<div />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  )
}

export default HomeLayout
