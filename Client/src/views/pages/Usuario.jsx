const Usuario = () => {
    function logout() { 
        localStorage.removeItem("jwtToken");
        window.location.href = "/";
    }

    return (
        <div>
            <button onClick={logout}>Sair</button>
        </div>
    );
};

export default Usuario;