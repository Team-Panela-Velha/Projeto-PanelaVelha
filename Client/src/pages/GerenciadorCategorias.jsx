import axios from "axios";
import { useState, useEffect } from "react";
import AcessoNegadoMsg from "../components/AcessoNegadoMsg";

function GerenciadorCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);

    async function fetchUser() {
        const token = localStorage.getItem('jwtToken'); // Obter o token do localStorage

        axios.get('http://127.0.0.1:5000/api/verificar_usuario', {
            headers: {
                "Authorization": token, // Passa o token no cabeçalho Authorization
            },
        })
            .then(response => {
                setUser(response.data);
            })
    }

    useEffect(() => {
        fetchUser();
    }, []);

    // Fetch all categories
    async function fetchCategorias() {
        try {
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:5000/api/mostrar_categorias");
            setCategorias(response.data.categorias);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    // Fetch categories by search
    async function fetchPesquisaCategorias(pesquisa) {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:5000/api/pesquisar_categoria/${pesquisa}`);
            setCategorias(response.data.categorias);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    // Effect: refetch when component mounts or searchTerm changes
    useEffect(() => {
        if (searchTerm.trim() === "") {
            fetchCategorias();
        } else {
            fetchPesquisaCategorias(searchTerm.trim());
        }
    }, [searchTerm]);

    // Other CRUD operations...
    async function criarCategoria(e, nome) {
        e.preventDefault();
        await axios.post("http://127.0.0.1:5000/api/criar_categoria", { nome_categoria: nome });
        setSearchTerm("");

        fetchCategorias();
    }

    async function editarCategoria(e, id, nome) {
        e.preventDefault();
        await axios.patch("http://127.0.0.1:5000/api/editar_categoria", { id_categoria: id, nome_categoria: nome });
        setSearchTerm("");

        fetchCategorias();
    }

    async function excluirCategoria(e, id) {
        e.preventDefault();
        await axios.delete("http://127.0.0.1:5000/api/excluir_categoria", { data: { id_categoria: id } });
        setCategorias(prev => prev.filter(categoria => categoria.id !== id));
    }

    const [showModalDeletar, setShowModalDeletar] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [showModalCriar, setShowModalCriar] = useState(false);
    const [categoria, setCategoria] = useState("");
    const [currentCategoria, setCurrentCategoria] = useState(null);

    const handleDelete = () => setShowModalDeletar(false);
    const handleSave = () => console.log("Categoria atualizada:", newName);
    const handleCreate = () => {
        if (categoria.trim() === "") return alert("O nome da categoria é obrigatório!");
        setShowModalCriar(false);
        setSearchTerm("");
    };

    return (
        <>
            {user && user.admin == 0 ? (
                <AcessoNegadoMsg />
            ) : (
                <div className="flex flex-col w-full h-full items-center gap-10 mt-12">
                    <h1 className="text-5xl font-semibold text-chocolate-cosmos">Categorias</h1>
                    <div className="flex flex-col w-full h-auto bg-red-100 mr-[3%] p-5">
                        {/* Pesquisa de categorias */}
                        <div className="w-full mx-auto px-4 mb-4">
                            <input
                                type="text"
                                placeholder="Pesquisar categoria..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
                            />
                        </div>
                        <div className="flex p-5 justify-between">
                            <div className="w-full mx-auto px-4">
                                <h2 className="text-redwood text-sm uppercase font-bold">Categorias existentes :</h2>
                                {loading && <p>Carregando...</p>}
                                {error && <p>Erro ao carregar categorias.</p>}
                                {!loading && categorias.map((categoria) => (
                                    <div
                                        key={categoria.id}
                                        className="flex justify-between items-center px-2 py-1 border-b border-gray-300"
                                    >
                                        <h3 className="text-base text-gray-800">{categoria.nome_categoria}</h3>
                                        <div className="flex items-center gap-4 text-lg text-gray-600">
                                            <i
                                                className="bi bi-pencil hover:text-blue-600 cursor-pointer"
                                                onClick={() => {
                                                    setNewName(categoria.nome_categoria);
                                                    setCurrentCategoria(categoria.id);
                                                    setShowEditModal(true);
                                                }}
                                            ></i>
                                            {showEditModal && (
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
                                                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
                                                            >
                                                                Cancelar
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    editarCategoria(e, currentCategoria, newName);
                                                                    setShowEditModal(false);
                                                                    handleSave();
                                                                }}
                                                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                                            >
                                                                Salvar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <i
                                                className="bi bi-trash hover:text-red-600 cursor-pointer"
                                                onClick={() => {
                                                    setCurrentCategoria(categoria.id);
                                                    setShowModalDeletar(true);
                                                }}
                                            ></i>
                                            {showModalDeletar && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                                        <h2 className="text-lg font-semibold mb-4">
                                                            Tem certeza que deseja deletar essa categoria?
                                                        </h2>
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                onClick={() => setShowModalDeletar(false)}
                                                                className="px-4 py-2 rounded  bg-gray-300 hover:bg-gray-400 text-black"
                                                            >
                                                                Cancelar
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    excluirCategoria(e, currentCategoria);
                                                                    handleDelete();
                                                                }}
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

                            {/* Botão Criar Categoria */}
                            <button
                                className="flex justify-center items-center bg-white rounded-full w-8 h-8 text-xl"
                                onClick={() => setShowModalCriar(true)}
                            >
                                +
                            </button>

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
                                                    setCategoria("",
                                                    setShowModalCriar(false));
                                                }}
                                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    criarCategoria(e, categoria);
                                                    setCategoria("");
                                                    handleCreate();
                                                }}
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

            )}
        </>
    );
}

export default GerenciadorCategorias;