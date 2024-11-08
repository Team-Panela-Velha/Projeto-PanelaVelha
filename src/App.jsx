import { useState } from 'react'
import './App.css'

function App() {
  
  return (
    <>
      <div className="flex bg-stone-50  min-h-screen">
      <aside className='flex justify-start w-1/5 bg-aside-color shadow-right-only'>
        <div className='w-80 h-80  border-zinc-950 rounded-full'>
          <img className="w-full" src="src/assets/img/logo.png" alt="" />
        </div>
      </aside>
      <main className='flex flex-col w-4/5 bg-body-color'>
        main
      </main>
      </div>
    </>
  )
}

export default App
