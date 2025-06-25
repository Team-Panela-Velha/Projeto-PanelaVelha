export default function AcessoNegadoMsg() {
  return (
    <div className=" flex flex-col h-full gap-7 justify-center items-center">
      <h1 className="text-4xl font-bold">Usuário não autorizado</h1>
      <div>
        <i class="bi bi-x-lg text-5xl text-persian-red"></i>
      </div>
      <p className="text-lg text-gray-700">
        <a href="/">Por favor, volte à página inicial.</a>
      </p>
    </div>
  );
}
