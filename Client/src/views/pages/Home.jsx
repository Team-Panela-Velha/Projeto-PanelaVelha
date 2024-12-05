import Categoria from "../../components/Categoria";
import MaisReceitas from "../../components/MaisReceitas";
import Receita_Populares from "../../components/Receita_Populares";
import Regioes from "../../components/Regioes";
import SectionTitle from "../../components/SectionTitle";
import Slider from "../../components/Slider";
import SliderCard from "../../components/SliderCard";
import { Link } from "react-router-dom"

const Home = () => (
    <>
        <div className="w-full h-screen">
            <div className='mt-6 mr-[3%]'>
                <Slider />
            </div>
            <div>
                <SectionTitle
                    text="receitas mais procuradas"
                />
                <Receita_Populares />
            </div>
            <div className="mt-12">
                <SectionTitle
                    text="Experimente o melhor de cada Região"
                />
                <Regioes />
            </div>
            <div className='my-6 flex flex-col'>
                <SectionTitle
                    text="O que deseja cozinhar hoje?"
                />
                <div className="mr-[5%]">
                <Categoria />
                </div>
            </div>
            <div className="flex w-full my-10 justify-center">
                <SliderCard />
            </div>
            <div className="pb-10">
                <SectionTitle
                    text="você também pode gostar"
                />
                <MaisReceitas />
            </div>
        </div>
    </>
)

export default Home;