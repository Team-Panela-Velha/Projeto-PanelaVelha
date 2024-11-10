import React from 'react';
import './Searchbar.css'

function Searchbar() {
    return (
        <form className="relative flex items-center w-[180px] h-[35px] bg-white rounded-full transition-all ease duration-500 focus-within:rounded-sm">
            <button className="text-[#8b8ba7] p-0 bg-none border-none">
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </button>
            <input className="flex-1 text-sm bg-transparent w-full h-full px-2 py-2 border-none placeholder:text-gray-400 focus:outline-none" placeholder="Type your text" required type="text" />
            <button type="reset" className="opacity-0 invisible border-none bg-none p-0 transition-opacity duration-300 text-gray-400 focus:opacity-100 focus:visible">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </form>
    );
}
export default Searchbar;

