function GerenciadorUsuarios() {
    return (
        <>
            <div className="flex flex-col w-full h-full items-center gap-10 mt-12">
                <h1 className="text-5xl font-semibold text-chocolate-cosmos">Usuarios</h1>
                <div className="flex flex-col w-full h-auto bg-red-100 mr-[3%] p-5">
                    <h2 className="text-redwood text-sm uppercase font-bold p-5 ">Lista de Úsuario :</h2>
                    <div className="flex justify-between px-5 py-2">
                        <h3>Matheus Lopes</h3>
                        <div className="flex gap-5">
                            <label>ADM</label>
                            <input
                                type="checkbox"
                            // id={}
                            // value={}
                            // className=""
                            // onChange={}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GerenciadorUsuarios;