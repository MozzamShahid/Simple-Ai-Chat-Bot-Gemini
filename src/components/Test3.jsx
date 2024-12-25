import React, {useState} from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";


const Test = () => {
    const [userMessage, setUserMessages] = useState('')
    const [conversation, setConversation] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!userMessage.trim()) return;

        const userWrite = {type: 'user', content: userMessage}
        setConversation((prev)=> [...prev, userWrite])
        console.log(userWrite)

        // Fetch AI response
        const genAI = new GoogleGenerativeAI("AIzaSyDaC7HxL_n5UjJSaeZhg2AsU5oWKJUmXv0");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = userMessage;

        const result = await model.generateContent(prompt);

        const aiResponse = {type: 'ai', content: result.response.text() }
        setConversation((prev)=>[...prev, aiResponse])
        console.log(aiResponse)

        setUserMessages('')
    }

  return (
    <div className='h-lvh p-20'>
      
      <div className='card h-[500px] flex flex-col gap-5 overflow-y-auto'>
            
            {conversation.map((message, index) => (
               <div key={index} className={`p-2 rounded-sm w-full ${message.type === 'user' ? 'bg-slate-100' : 'bg-green-400'} `}>
                 <p>{message.content}</p>
               </div>
            ))}

      </div>

      <div  className='card w-full flex gap-2 mt-4'>
        <form onSubmit={handleSubmit} className='flex gap-5 w-full'>
            <input value={userMessage} onChange={(e) => setUserMessages(e.target.value)} placeholder='Chat Here' className='w-full bg-slate-200 rounded-md border border-gray-100 p-2' type="text" />
            <button type="submit" className='bg-green-500 rounded-sm p-2 text-white'>Submit</button>
        </form>
      </div>

    </div>
  )
}

export default Test
