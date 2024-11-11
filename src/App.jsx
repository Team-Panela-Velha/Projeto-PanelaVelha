import { useState } from 'react'
import './App.css'
import Aside from './components/Aside'

function App() {
  
  return (
    <>
      <div className="flex min-h-screen">
        <Aside/>
        <main className='flex flex-col w-5/6 bg-peaches'>
          <div className="w-full h-screen">
            <div className='w-[95%] h-[90%] m-5 bg-black '>h</div>
          </div>
        </main>
        
      </div>
    </>
  )
}

export default App
