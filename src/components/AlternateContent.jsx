import React from 'react'
import { FaAward } from "react-icons/fa6";
import mainImg from '../assets/outboundsdr.png'



const AlternateContent = () => {

    const AIconWithText = ({ Icon, text }) => {
        return (
          <div className='flex gap-6 items-center'>
                              <div>{<Icon />}</div>
                              <p>{text}</p>
                          </div>
        );
      };

  return (
    <section className="flex items-center justify-center h-[700px] gap-10">
        <div className="flex-1">
                        <div className='flex items-center justify-center mt-10'>
                                <img src={mainImg} alt="main-img" className=" h-full w-full " />
                        </div>
                    </div>
    
                <section className="flex-1">
            <div className="flex flex-col gap-5">
                <div className="font-sans text-6xl font-bold text-left leading-none text-white"><h1>Comprehensive Outbound Sales Development</h1></div>
                    <div className="font-sans text-lg text-white flex flex-col gap-5 flex-1"><p>Our meticulously crafted outbound sales development strategies have propelled over 1,500 companies across 195+ B2B sectors to new heights. CIENCE’s SDR teams are built to sustain your growth with highly targeted, multi-channel campaigns.</p>
                        <div className='flex flex-col gap-3'>
                        <AIconWithText Icon={FaAward} text="Specialized outbound SDR expertise" />
                        <AIconWithText Icon={FaAward} text="Multi-channel campaigns" />
                        <AIconWithText Icon={FaAward} text="Consistent pipeline growth" />
                        </div>
                    </div>
                    <input type="email" className='p-3 rounded-md border placeholder-white bg-transparent text-white border-green-400 ' placeholder="Enter your email address"/>
                    <button className='bg-gradient-to-r from-green-400 to-green-500 text-black p-3 font-semibold rounded-md'>Book My Consultation Today!</button>
            </div>
    
    
    
                </section>
            </section>
  )
}

export default AlternateContent
