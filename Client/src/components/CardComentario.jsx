import React from "react";

const CardComentario = ({ comentario }) => {
    const { nome, comentario: texto, avaliacao, data } = comentario;

    return (
        <div className="p-4 border-b border-gray-300">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{nome}</h3>
                <p className="text-sm text-gray-500">{data}</p>
            </div>
            <div className="flex space-x-1 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={avaliacao >= star ? "gold" : "gray"}
                        viewBox="0 0 576 512"
                        height="1em"
                        className="star-solid"
                    >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                    </svg>
                ))}
            </div>
            <p className="mt-2">{texto}</p>
        </div>
    );
};

export default CardComentario;
