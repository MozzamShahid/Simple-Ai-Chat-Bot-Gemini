import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";


const Test = () => {
    const [message, setMessage] = useState('') // user response
    const [aimessage, setAiMessage] = useState(false); 
    const [aairesponse, setAiresponse] = useState(''); // ai response


    const handleChange = (e) => {
        e.preventDefault();
        console.log(message);
        setAiMessage(true)
    }

    useEffect(() => {
        if (!message) return;

        const genAI = new GoogleGenerativeAI("ENTER-YOUR-API-KEY");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = message;

        const fetchData = async () => {
            const result = await model.generateContent(prompt);
            setAiresponse(result.response.text());
        }
        fetchData();
    }, [message])

    return (
        <div className='h-lvh p-20'>

            {message ?
                <div className='card h-[500px] flex flex-col gap-5'>

                    <div>
                        <p className='bg-blue-300 p-2 text-left rounded-sm border border-black'>{message}</p>
                    </div>

                    {aimessage && (
                        <div>
                            <p className='bg-blue-300 p-2 text-right rounded-sm border border-black'>{aairesponse}</p>
                        </div>
                    )}
                </div> : <p>Loading...</p>
            }



            <div className='card w-full flex gap-2'>
                <form onSubmit={handleChange}>
                    <input className='w-full p-2 bg-slate-400' placeholder='Chat'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} type="text" />
                    <button type='submit' className='bg-stone-950 rounded-sm p-2 text-white'>Send</button>
                </form>
            </div>

        </div>
    )
}

export default Test
