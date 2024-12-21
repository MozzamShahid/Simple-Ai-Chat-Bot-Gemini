import React from 'react'
import logo from '../assets/ourlogo.svg';
import image from '../assets/main-img.svg';

const FirstSection = () => {
  return (
    <div className='h-lvh'>
    <section>
      <div className="h-36 content-center">
        <img src={logo} alt="main logo" className='h-10' />
      </div>
    </section>

    <section className='flex h-[600px] gap-14'>
      <div className='flex-1 flex-col content-center justify-evenly'>
        <div className=' flex flex-col gap-8'>
        <h1 className='font-sans text-7xl font-semibold text-white'>Performance-Based Outbound SDR Services</h1>
        <p className='font-sans text-base text-white'>Harness the power of CIENCE's performance-based outbound SDR services to fill your pipeline with qualified, held appointments. Our expert SDRs and advanced technology ensure you achieve sustainable growth and superior ROI.</p>
        <input type="email" className='p-3 rounded-md border placeholder-white bg-transparent text-white border-green-400 ' placeholder="Enter your email address"/>
        <button className='bg-gradient-to-r from-green-400 to-green-500 text-black p-3 font-semibold rounded-md'>Book My Consultation Today!</button>
        </div>
      </div>
      <div className='flex-1 flex-col '>
      <img src={image} alt="main logo" className='h-full max-w-full' />
      </div>
    </section>
    </div>
  )
}

export default FirstSection
