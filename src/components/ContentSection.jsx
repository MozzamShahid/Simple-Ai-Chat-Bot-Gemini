import React from 'react'
import review from '../assets/matthew.png'
import { FaAward } from "react-icons/fa6";


const ContentSection = () => {
    
    const IconWithText = ({ Icon, text }) => {
      return (
        <div className='flex gap-6 items-center'>
                            <div>{<Icon />}</div>
                            <p>{text}</p>
                        </div>
      );
    };
    

    return (
        <section className="flex flex-col items-center justify-center h-[600px] mt-4 gap-10">
            <div className="font-sans text-6xl font-bold w-2/3 text-center leading-none text-white"><h1>Why Choose CIENCE for Outbound SDR Services</h1></div>

            <section className="flex">
                <div className="font-sans text-lg text-white flex flex-col gap-5 flex-1"><p>Outbound prospecting is the key to growing and scaling your business. Unfortunately, building an in-house sales team is difficult, time-consuming, and expensive.</p>
                    <p>With CIENCE, you can outsource for a fraction of the cost. Our professionally-trained staff and finely-honed process can be plugged in to become your own well-oiled sales machine.</p>

                    <div className='flex flex-col gap-3'>
                    <IconWithText Icon={FaAward} text="Performance-based lead generation" />
                    <IconWithText Icon={FaAward} text="Transparent cost-per-lead" />
                    <IconWithText Icon={FaAward} text="High-quality held appointments" />
                    </div>
                </div>

                <div className="flex-1">
                    <div className='flex items-center justify-center mt-10'>
                            <img src={review} alt="review-img" />
                    </div>
                </div>


            </section>
        </section>
    )
}

export default ContentSection
