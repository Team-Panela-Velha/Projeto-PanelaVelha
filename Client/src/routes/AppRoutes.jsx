import Home from "../pages/Home"
import Login from "../pages/login/Login"
import Cadastro from "../pages/Cadastro"
import Usuario from "../pages/Usuario"
import ReceitaPage from "../pages/ReceitaPage"
import CriarReceita from "../pages/CriarReceita"
import Receitas from "../pages/Receitas"
import EditarReceita from "../pages/EditarReceita"
import Pesquisa from "../pages/Pesquisa"
import ReceitasCategoria from "../pages/CategoriaPage"
import Gerenciador from "../pages/Gerenciador"

import { Routes, Route } from "react-router-dom"
import GerenciadorUsuarios from "../pages/GerenciadorUsuarios"
import GerenciadorCategorias from "../pages/GerenciadorCategorias"
import GerenciadorHistorico from "../pages/GerenciadorHistorico"

const AppRoutes = props => (
    <>
       
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/receitas" element={<Receitas/>} />
                <Route path="/receitas/:id" element={<ReceitaPage />} />
                <Route path="/receitas/pesquisa/:pesquisa" element={<Pesquisa />} />
                <Route path="/receitas/categoria/:categoria" element={<ReceitasCategoria/>} />

                <Route path="/usuario" element={<Usuario />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/gerenciador" element={<Gerenciador />} />
                <Route path="/gerenciadorUsuarios" element={<GerenciadorUsuarios />} />
                <Route path="/gerenciadorCategorias" element={<GerenciadorCategorias />} />
                <Route path="/gerenciadorHistorico" element={<GerenciadorHistorico />} />
                
                <Route path="/CriarReceita" element={<CriarReceita />} />
                <Route path="/editar_receita/:id" element={<EditarReceita />} />
            </Routes>
    
    </>
)

export default AppRoutes;