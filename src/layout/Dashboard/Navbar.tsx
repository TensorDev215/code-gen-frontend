import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { PanelLeftDashed } from 'lucide-react'

interface NavbarProps {
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ isExpanded, setIsExpanded }: NavbarProps) => {
  return (
    <>
      <div
        className={`lg:flex flex-col ${
          isExpanded ? 'w-60' : 'w-20'
        } h-[100vh] fixed z-50 ${isExpanded ? 'bg-lightGray' : 'background-opacity-0'} transition-all duration-200`}
      >
        <div className='flex justify-between px-5 gap-2 py-2 items-center'>
          <Link to='/' className='flex items-center gap-3 h-6 cursor-pointer no-underline'>
            <img src='images/logo.png' alt='logo' className='w-5' />
            <h1 className={`font-title font-bold text-xl text-darkBlue ${isExpanded ? 'block' : 'hidden'}`}>CodeGen</h1>
          </Link>
          <div
            className='flex justify-center items-center text-black text-lg cursor-pointer'
            onClick={() => {
              setIsExpanded(prev => !prev)
            }}
          >
            <PanelLeftDashed size={20} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
