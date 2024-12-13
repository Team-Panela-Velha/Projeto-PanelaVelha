import Home from "../../views/pages/Home"
import Login from "../../views/pages/Login"
import Cadastro from "../../views/pages/Cadastro"
import Usuario from "../../views/pages/Usuario"
import ReceitaPage from "../../views/pages/ReceitaPage"
import CriarReceita from "../../views/pages/CriarReceita"
import Receitas from "../../views/pages/Receitas"
import EditarReceita from "../../views/pages/EditarReceita"
import Pesquisa from "../../views/pages/Pesquisa"
import ReceitasCategoria from "../../views/pages/CategoriaPage"

import { Routes, Route } from "react-router-dom"

const Content = props => (
    <>
        <main className='flex flex-col w-[80%] ml-[21%] bg-peaches'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/receitas" element={<Receitas />} />
                <Route path="/receitas/:id" element={<ReceitaPage />} />
                <Route path="/receitas/pesquisa/:pesquisa" element={<Pesquisa />} />
                <Route path="/receitas/categoria/:categoria" element={<ReceitasCategoria />} />

                <Route path="/usuario" element={<Usuario />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                
                <Route path="/CriarReceita" element={<CriarReceita />} />
                <Route path="/editar_receita/:id" element={<EditarReceita />} />
            </Routes>
        </main>
    </>
)

export default Content;