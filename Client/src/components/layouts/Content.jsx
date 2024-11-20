import Home from "../../views/pages/Home"
import Teste from "../../views/pages/Teste"
import Login from "../../views/pages/Login"
import { Routes, Route } from "react-router-dom"

const Content = props => (
    <>
        <main className='flex flex-col w-[80%] ml-[21%] bg-peaches'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teste" element={<Teste />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </main>
    </>
)

export default Content;