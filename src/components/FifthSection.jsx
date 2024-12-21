import React from 'react'

const FifthSection = () => {
    
    const DivTo = ({number, text}) => {
      return (
        <div flex-1>
                <div className="flex flex-col gap-2">
                    <h1 className="font-sans text-white text-4xl font-bold">{number}</h1>
                    <p className='text-left text-white text-xl font-base font-normal '>{text}</p>
                </div>
            </div>
      );
    };    

  return (
    <section className="flex flex-col items-center justify-center h-[600px] gap-10">
        <div className="font-sans text-6xl font-bold w-2/3 text-center leading-none text-white">The future of sales development reps</div>
        <p className="text-center text-white text-xl font-base w-3/4">Machine-Driven and Human-Powered Prospecting at Scale. From years of experience providing best-in-class sales development services and using the top tools for sales enablement, we’ve learned a few lessons</p>
    
    <section className="bg-white bg-opacity-10 w-full h-auto p-20 rounded-md border border-stone-50 border-opacity-10 drop-shadow-md">
        <div className="flex justify-center items-center gap-10">
            <DivTo number="01" text="Putting the right resource on the right outbound SDR activities is hard"/>
            <DivTo number="02" text="Handling replies quickly and effectively is crucial for appointment setting"/>
            <DivTo number="03" text="Optimizing activities that result in the best outcomes is critical"/>
        </div>
    </section>
    </section>
  )
}

export default FifthSection
