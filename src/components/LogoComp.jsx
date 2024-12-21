import React from 'react'
import google from  '../assets/logos/google.svg'
import microsoft from  '../assets/logos/microsoft.svg'
import okta from  '../assets/logos/okta.svg'
import uber from  '../assets/logos/uber.svg'
import yamaha from  '../assets/logos/yamaha.svg'


const LogoComp = () => {
  return (
    <section className='h-[100px]'>
        <div className='flex justify-center align-middle gap-20'>
            <img src={okta} alt="okta-logo" />
            <img src={yamaha} alt="yamaha-logo" />
            <img src={microsoft} alt="microsoft-logo" />
            <img src={google} alt="google-logo" />
            <img src={uber} alt="uber-logo" />
            
        </div>
    </section>
  )
}

export default LogoComp
