import React from 'react';

const Receita = () => {
    return (
        <div className="flex justify-center w-[20%] h-48 p-3 gap-5 bg-gray-100 relative shadow-lg rounded-md">
            <div>
                <div className="bg-orange-200 h-3/4 w-[12vw] rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">

                </div>
                <div className="pt-4">
                    <p className="font-bold text-lg leading-tight">Product title</p>
                </div>
            </div>
        </div>
    );
};

export default Receita;