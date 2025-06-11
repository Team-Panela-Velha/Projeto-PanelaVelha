import axios from "axios";
import { useState, useEffect } from "react";

function GerenciadorCategorias() {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchCategorias() {
        axios.get("http://127.0.0.1:5000/api/mostrar_categorias")
        .then(response => {
            setCategorias(response.data.categorias);
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchCategorias();
    }, []);

    const [showModalDeletar, setShowModalDeletar] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [itemName, setItemName] = useState("Nome Original");
    const [newName, setNewName] = useState(itemName);

    const [showModalCriar, setShowModalCriar] = useState(false);
    const [categoria, setCategoria] = useState("");


    const handleDelete = () => {
        console.log("Categoria deletada");
        setShowModalDeletar(false);
    };


    const handleSave = () => {
        setShowEditModal(false);
        console.log("Categoria atualizado:", newName);
    };

    const handleCreate = () => {
        if (categoria.trim() === "") return alert("O nome da categoria é obrigatório!");
        console.log("Nova categoria criada:", categoria);
        setShowModalCriar(false);
    };

    return (
        <>
            <div className="flex flex-col w-full h-full items-center gap-10 mt-12">
                <h1 className="text-5xl font-semibold text-chocolate-cosmos">Categorias</h1>
                <div className="flex flex-col w-full h-auto bg-red-100 mr-[3%] p-5">
                    <div className="flex p-5 justify-between">
                            <div className="w-full mx-auto px-4">
                                <h2 className="text-redwood text-sm uppercase font-bold">Categorias existentes :</h2>
                                {categorias.map((cat) => (
                                    <div
                                    key={cat.id}
                                    className="flex justify-between items-center px-2 py-1 border-b border-gray-300"
                                    >
                                    {/* Nome da categoria */}
                                    <h3 className="text-base text-gray-800">{cat.nome_categoria}</h3>

                                    {/* Ações */}
                                    <div className="flex items-center gap-4 text-lg text-gray-600">
                                        {/* Editar */}
                                        <i
                                        className="bi bi-pencil hover:text-blue-600 cursor-pointer"
                                        onClick={() => {
                                            setNewName(itemName);
                                            setShowEditModal(true);
                                        }}
                                        ></i>

                                        {/* Modal de Edição */}
                                        {showEditModal && (
                                        // Troca o fundo preto do modal por um blur
                                        // <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
                                            // <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                            <h2 className="text-lg font-semibold mb-4">Editar Categoria</h2>
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                className="w-full px-3 py-2 mb-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                onClick={() => setShowEditModal(false)}
                                                className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black"
                                                >
                                                Cancelar
                                                </button>
                                                <button
                                                onClick={handleSave}
                                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                                >
                                                Salvar
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        )}

                                        {/* Excluir */}
                                        <i
                                        className="bi bi-trash hover:text-red-600 cursor-pointer"
                                        onClick={() => setShowModalDeletar(true)}
                                        ></i>

                                        {/* Modal de Exclusão */}
                                        {showModalDeletar && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                            <h2 className="text-lg font-semibold mb-4">
                                                Tem certeza que deseja deletar essa categoria?
                                            </h2>
                                            <div className="flex justify-center gap-2">
                                                <button
                                                onClick={() => setShowModalDeletar(false)}
                                                className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black"
                                                >
                                                Cancelar
                                                </button>
                                                <button
                                                onClick={handleDelete}
                                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                                >
                                                Deletar
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                    </div>
                                ))}
                            </div>


                        {/* CRIAR CATEGORIA */}
                        <button className="flex justify-center items-center bg-white rounded-full w-8 h-8 text-xl" onClick={() => setShowModalCriar(true)}>+</button>

                        {showModalCriar && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                                    <h2 className="text-xl font-semibold mb-4">Criar nova categoria</h2>

                                    <input
                                        type="text"
                                        placeholder="Nome da categoria"
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setCategoria("");
                                                setShowModalCriar(false);
                                            }}
                                            className="px-4 py-2 rounded bg-butterscotch hover:bg-gray-400"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleCreate}
                                            className="px-4 py-2 rounded bg-redwood text-white hover:bg-red-700"
                                        >
                                            Criar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GerenciadorCategorias;