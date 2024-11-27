import Receita_Populares from "../../components/Receita_Populares";
import Regioes from "../../components/Regioes";
import Searchbar from "../../components/Searchbar";
import Slider from "../../components/Slider";
import SliderCard from "../../components/SliderCard";

const Home = () => (
    <>
        <div className="w-full h-screen">
            <div className='mt-6 mr-[3%]'>
                <Slider />
            </div>
            <div>
                <h1>As mais requisitadas</h1>
                <Receita_Populares />
            </div>
            <div className="mt-12">
                <h1>Experimente o melhor de cada região</h1>
                <Regioes />
            </div>
            <div>
                <h1>oq deseja cozinhar hoje??</h1>
                <div className="flex w-full mr-[3%] justify-center">
                    <SliderCard/>
                </div>
            </div>
        </div>
    </>
)

export default Home;