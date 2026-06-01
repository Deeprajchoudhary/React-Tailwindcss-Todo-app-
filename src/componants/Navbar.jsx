import react from 'react'


const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-900'>
        <div className="logo mx-4 text-2xl font-bold text-white cursor-pointer">iTask</div>
        <ul className="flex gap-4 mx-4 text-white">
            <li className='hover:scale-105 hover:text-amber-500 m-2'>Home</li>
            <li className='hover:scale-105 hover:text-amber-500 m-2'>About us</li>
            <li className='hover:scale-105 hover:text-amber-500 m-2'>Login</li>
            <li className='hover:scale-105 hover:text-amber-500 m-2'>Sign up</li>
        </ul>
      
    </nav>
  )
}

export default Navbar






