
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
                            <img className="w-[30rem] h-[20rem]" src="https://octo.com.br/wp-content/uploads/2020/03/Blog_caipirinha_de_limao.jpg" alt="" />
                        </div>
                        <div className="flex justify-between m-2">
                        <div>
                            <i class="bi bi-circle-fill"></i> 5 porções
                            </div>
                            <div>
                                <i class="bi bi-stopwatch-fill"></i> 12min
                            </div>
                            <div>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <p className="text-center">Avalie!!</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mr-3 mt-3">
                    <div className=" border-r-2">
                        <h1>ingredientes</h1>
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