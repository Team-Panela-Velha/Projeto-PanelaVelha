import { useState } from 'react'
import './App.css'

function App() {
  
  return (
    <>
      <div className="flex bg-stone-50  min-h-screen">
        <aside className='flex justify-start w-1/5 bg-aside-color shadow-right-only border-r-2 border-img-border-color'>
          <div className='flex justify-center h-1/6 my-8'>
            <img className="border-2 border-img-border-color rounded-full" src="src/assets/img/logo.png" alt="" />
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
