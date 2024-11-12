import React from "react";
import { Carousel } from "flowbite-react";
import "./css/Slider.css";

function Slider() {
    return (
        <Carousel className="w-full h-[500px]">
            <img src="https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg.webp" alt="Paisagem" className="object-cover" />
            <img src="https://www.pontotel.com.br/local/wp-content/uploads/2022/05/imagem-corporativa.webp" alt="Corporativa" className="object-cover" />
            <img src="https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg.webp" alt="Paisagem" className="object-cover" />
            <img src="https://www.pontotel.com.br/local/wp-content/uploads/2022/05/imagem-corporativa.webp" alt="Corporativa" className="object-cover" />
        </Carousel>

    );
}

export default Slider;