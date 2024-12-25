import React, {useState} from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";

const Latest = () => {
    const [userMessage, setUserMessages] = useState('')
    const [conversation, setConversation] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userMessage.trim()) return;

        const usermsg = { type: 'user', content: userMessage }
        setConversation((prev) => [...prev, usermsg])
       
        const genAI = new GoogleGenerativeAI("ENTER-YOUR-API-KEY");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = userMessage;
        const result = await model.generateContent(prompt);

        const aimessage = { type: 'ai', content: result.response.text() }
        setConversation((prev) => [...prev, aimessage])
        

        setUserMessages('')

    }

  return (
    <div className="h-lvh p-20">
      
    <div className="card rounded-sm h-[500px] p-4 flex flex-col gap-5  overflow-y-auto">
         {conversation.map((message, index) => (
            <div key={index} className={`p-2 w-full ${message.type === 'user' ? 'bg-slate-200' : 'bg-green-400 text-right' }`}>
                <p>{message.content}</p>
            </div>
         ))}
    </div>

    <div className="card flex   ">
        <form className='flex w-full gap-5' onSubmit={handleSubmit}>
            <input value={userMessage} onChange={(e) => setUserMessages(e.target.value)} placeholder='Chat Here' className='w-full bg-slate-200 rounded-r-sm p-2' type="text" />
            <button type='submit' className='p-2 rounded-sm text-white bg-green-500'>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default Latest
