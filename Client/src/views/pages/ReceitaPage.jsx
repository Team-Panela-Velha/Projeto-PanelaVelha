import Garfo from "../../assets/img/garfo-e-faca.png";
import Relogio from "../../assets/img/despertar.png";
import Chefe from "../../assets/img/chefe-de-cozinha.png";
import Nivel from "../../assets/img/elevacao.png";
const ReceitaPage = () => (
    <>
        <div className="w-full h-screen">
            <div className="flex flex-col justify-center">
                <div className="text-5xl text-center mt-5 font-semibold">
                    <h1>Caipirinha</h1>
                    <hr className="border-[1.5px] border-black mt-7 mr-3" />
                </div>
                <div className="flex justify-between mr-3">
                    <div>
                        21/11/2024
                    </div>
                    <div>
                        <i class="bi bi-star-fill"></i>
                    </div>
                </div>
                <div className="flex mt-5 mr-3 bg-red-100">
                    <div className="flex flex-col m-2" >
                        <div>
                            <img className="w-[30rem] h-[20rem]" src="https://images.pexels.com/photos/27626304/pexels-photo-27626304/free-photo-of-comida-alimento-refeicao-frio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                    </div>
                    <div className="flex flex-col w-[35rem]">
                        <div className="w-full">
                            <img className="w-16 h-16 justify-self-center mt-5 " src={Garfo} alt="" />
                        </div>
                        <div className="w-full text-xs text-center">
                            <p className="text-sm font-semibold mt-3">Enviado por Matheus</p>
                            <p className="w-96 justify-self-center mt-2">
                                " Feita com morangos frescos e cachaça, essa variação doce e equilibrada da caipirinha tradicional é perfeita para festas ou momentos de relaxamento. Experimente e encante seus convidados! "
                            </p>
                        </div>
                        <div className="flex gap-5 justify-center mt-8">
                            <div className="relative flex flex-col justify-center items-center w-28 h-28 border-[1px] border-redwood shadow-lg rounded-2xl">
                                <img className="absolute top-[-20px] w-12 h-12" src={Relogio} alt="" />
                                <p className="uppercase font-bold mt-5">12 min</p>
                                <p className="uppercase text-xs w-16 font-semibold">Tempo de Preparo</p>
                            </div>
                            <div className="relative flex flex-col justify-center items-center w-28 h-28 border-[1px] border-redwood shadow-lg rounded-2xl">
                                <img className="absolute top-[-20px] w-12 h-12" src={Nivel} alt="" />
                                <p className="uppercase font-bold mt-5">Facil</p>
                                <p className="uppercase text-xs w-16 font-semibold">culdade</p>
                            </div>
                            <div className="relative flex flex-col justify-center items-center w-28 h-28 border-[1px] border-redwood shadow-lg rounded-2xl">
                                <img className="absolute top-[-20px] w-12 h-12" src={Chefe} alt="" />
                                <p className="uppercase font-bold mt-5">1 pessoa</p>
                                <p className="uppercase text-xs w-16 font-semibold">Serve</p>
                            </div>
                            
                        </div>

                    </div>
                </div>
                <div className="flex justify-between mr-3 mt-3">
                    <div className="border-r-2">
                        <h1>igredientes</h1>
                    </div>
                    <div>
                        modo de preparo
                    </div>
                </div>

            </div>
        </div>

    </>
)

export default ReceitaPage;