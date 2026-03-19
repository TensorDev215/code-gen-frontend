import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex justify-between px-3'>
      <Link to='/' className='flex items-center gap-3 h-6 cursor-pointer no-underline'>
        <img src='images/logo.png' alt='logo' className='w-5' />
        <h1 className='font-title font-bold text-xl text-darkBlue'>CodeGen</h1>
      </Link>
      <p className='font-body text-sm'>Get CodeGen App</p>
    </header>
  )
}

export default Header
