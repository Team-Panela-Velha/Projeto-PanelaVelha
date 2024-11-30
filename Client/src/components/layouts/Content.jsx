import Home from "../../views/pages/Home"
// import Teste from "../../views/pages/Teste"
import Login from "../../views/pages/Login"
import Cadastro from "../../views/pages/Cadastro"
import Usuario from "../../views/pages/Usuario"

import { Routes, Route } from "react-router-dom"
import ReceitaPage from "../../views/pages/ReceitaPage"
import CriarReceita from "../../views/pages/CriarReceita"

const Content = props => (
    <>
        <main className='flex flex-col w-[80%] ml-[21%] bg-peaches'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/receitas/:id" element={<ReceitaPage />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/CriarReceita" element={<CriarReceita />} />
            </Routes>
        </main>
    </>
)

export default Content;