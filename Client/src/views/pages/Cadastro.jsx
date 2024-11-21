import "../../components/css/Login.css"

const Cadastro = () => (
    <>
        <div className="flex justify-center items-center w-full h-screen">
            <form className="flex flex-col items-center justify-center gap-8 w-2/5 h-3/4 bg-slate-100 rounded-lg tela-login">
                <h1 className="text-redwood font-bold text-3xl mb-4">CADASTRO</h1>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-1">
                        <label className="relative left-1/3" for="username">Usuário</label>
                        <input className="w-1/3 relative left-1/3 h-7" type="text" id="username" name="username" required></input>
                    </div>
                        
                    <div className="flex flex-col gap-1">
                        <label className="relative left-1/3" for="password">Senha</label>
                        <input className="w-1/3 relative left-1/3 h-7" type="password" id="password" name="password" required></input>
                    </div>
                </div>
                <div className="w-3/12">
                    <div>
                        <button className="bg-redwood w-full h-10 rounded-sm" type="submit"><p className="text-white">Cadastrar</p></button>
                    </div>
                </div>         
            </form>
        </div>
    </>
)

export default Cadastro