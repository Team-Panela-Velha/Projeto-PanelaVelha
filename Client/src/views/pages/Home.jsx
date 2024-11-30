import Categoria from "../../components/Categoria";
import Receita_Populares from "../../components/Receita_Populares";
import Regioes from "../../components/Regioes";
import SectionTitle from "../../components/SectionTitle";
import Slider from "../../components/Slider";
import SliderCard from "../../components/SliderCard";

const Home = () => (
    <>
        <div className="w-full h-screen">
            <div className='mt-6 mr-[3%]'>
                <Slider />
            </div>
            <div>
                <SectionTitle
                text="receitas mais requisitadas"
                />
                <Receita_Populares/>
            </div>
            <div className="mt-12">
            <SectionTitle
                text="Experimente o melhor de cada Região"
                />
                <Regioes/>
            </div>
            <div>
            <SectionTitle
                text="O que deseja coxinhar hoje"
                />

                <div>
                    <Categoria/>
                </div>
                <div className="flex w-full mr-[3%] justify-center">
                    <SliderCard/>
                </div>
                
            </div>
        </div>
    </>
)

export default Home;