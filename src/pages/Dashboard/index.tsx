import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import { Send } from 'lucide-react'
import { getSampleCode } from '../../hooks/fetchData'

interface DeepSeekInputProps {
  placeholder?: string
  maxHeight?: number
}

type Message = {
  role: 'user' | 'assistant'
  text: string
}

const Dashboard = ({ placeholder = 'Ask anything, get instant answers...', maxHeight = 128 }: DeepSeekInputProps) => {
  const [inputValue, setInputValue] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(e.target.value)
  }

  const handleSend = async (): Promise<void> => {
    const prompt = inputValue.trim()
    if (!prompt) return
    setMessages(m => [...m, { role: 'user', text: prompt }])
    setInputValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    setLoading(true)

    try {
      const data = await getSampleCode(prompt)

      setMessages(m => [...m, { role: 'assistant', text: data }])
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', text: 'Error generating code. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (suggestion: string): void => {
    setInputValue(suggestion)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const suggestions: string[] = ['DeepThink', 'Search']

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-white border-b p-10'>
        <h1>Chat</h1>
      </header>

      <div className='flex-1 flex felx-col justify-between'>
        <div className='mx-auto w-full max-w-3x1 p-4'>
          <div className='mb-4 h-3/4 overflow-y-auto rounded-md py-3 px-40 bg-white'>
            {messages.length === 0 ? (
              <div className='text-gray-500'>No message yet. Start the conversation!</div>
            ) : (
              messages.map((m, idx) => (
                <div key={idx} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span
                    className={`inline-block px-3 py-2 rounded-md ${
                      m.role === 'user' ? 'bg-lightGray text-black' : 'bg-white text-black'
                    }`}
                  >
                    {m.text}
                  </span>
                </div>
              ))
            )}
            {loading && <div className='mt-2 text-gray-500'>Generating code ...</div>}
          </div>

          <div className='w-full max-w-3xl mx-auto transition-all duration-200 ease-in-out'>
            <div className='flex flex-col w-full bg-white border px-3 border-gray border-solid rounded-2xl overflow-hidden transition-all duration-200'>
              <div className='flex items-end py-2 gap-2'>
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  disabled={false}
                  className='flex-1 max-h-32 bg-transparent border-0 text-black placeholder-gray-500 outline-none resize-none text-sm py-2 disabled:cursor-not-allowed'
                  rows={1}
                  style={{ maxHeight: `${maxHeight}px` }}
                  aria-label='Message input'
                />
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2 px-3 pb-3 overflow-x-auto hide-scrollbar'>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={false}
                      className='h-9 px-3 py-2 text-xs bg-white border border-gray border-solid  hover:bg-[#3D3D4A] text-gray-300 rounded-full whitespace-nowrap transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className='h-9 p-2 bg-darkBlue border-0 rounded-full hover:cursor-pointer text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed'
                  aria-label='Send message'
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
