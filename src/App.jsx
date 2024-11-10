import { useState } from 'react'
import './App.css'
import Aside from './components/Aside'

function App() {
  
  return (
    <>
      <div className="flex min-h-screen">
        <Aside/>
        <main className='flex flex-col w-full bg-peaches'>
          main
        </main>
        
      </div>
    </>
  )
}

export default App
