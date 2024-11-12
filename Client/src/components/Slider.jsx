import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';

function Slider() {
    return (
        <Swiper
        spaceBetween={15}
        slidesPerView={2.5}
        speed={500}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false, // Não desabilita o autoplay quando o usuário interage com o swiper
          }}
        modules={[Autoplay]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
        <SwiperSlide><img src="https://media.istockphoto.com/id/1355483021/pt/foto/feijoada-typical-brazilian-food-traditional-brazilian-food-made-with-black-beans-top-view-copy.jpg?s=612x612&w=0&k=20&c=u_n8MU0TkaLpRDLBrYVSRGtNGwFJtjjSZ-zKZOyL_Qo=" alt="Paisagem" className="w-full h-40 sm:h-48 md:h-[224px] lg:h-[272px] xl:h-[298px]" /></SwiperSlide>
        <SwiperSlide><img src="https://i0.statig.com.br/bancodeimagens/22/fi/ci/22fici80lylnpviqgv2zo7f84.jpg" alt="Paisagem" className="w-full h-40 sm:h-48 md:h-[224px] lg:h-[272px] xl:h-[298px]" /></SwiperSlide>
        <SwiperSlide><img src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/irjevh15v2x1usozninu" alt="Paisagem" className="w-full h-40 sm:h-48 md:h-[224px] lg:h-[272px] xl:h-[298px]" /></SwiperSlide>
        <SwiperSlide><img src="https://forbes.com.br/wp-content/uploads/2021/07/Life_Dia-da-Pizza-Veridiana-Margherita_8julho2021_Divulgacao.jpg" alt="Paisagem" className="w-full h-40 sm:h-48 md:h-[224px] lg:h-[272px] xl:h-[298px]" /></SwiperSlide>
        ...
        </Swiper>
    );
}

export default Slider;