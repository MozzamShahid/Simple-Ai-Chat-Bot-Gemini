import React from 'react'

const Header = () => {
  return (
    <section className="flex justify-between items-center gap-10 text-white text-xl font-normal h-[80px]">
      <div>
        <h1 className="text-4xl" >AiChat</h1>
      </div>

      <nav>
        <ul className='flex gap-10 font-normal'>
            <li>Home</li>
            <li>Contact us</li>
            <li>About us</li>
        </ul>
      </nav>

      <div>
        <button className="btn bg-blue-800 rounded-md border border-white px-5 py-2">Login</button>
      </div>
    </section>
  )
}

export default Header
