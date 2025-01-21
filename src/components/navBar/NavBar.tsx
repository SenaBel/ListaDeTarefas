import { X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className=" w-screen  items-center px-8 py-4 bg-slate-700 text-white border-b border-slate-600">
      <div className="flex items-center gap-10">
        {/* Adicionar conteúdo da navbar, como logo ou links, caso necessário */}
        <div className="flex  items-center justify-between w-full">
          <h1 className="text-3xl font-semibold"> Sua Vida Mais Organizada</h1>
          <button
            onClick={() => auth.signout()}
            className="
        bg-slate-500 text-violet-50 px-4 py-2 
        rounded-md font-medium flex justify-center items-center gap-2 hover:bg-slate-600"
          >
            Sair
            <X className="size-4" />
          </button>
        </div>
      </div>
      <div>{/* Se precisar adicionar outros links ou botões */}</div>
    </nav>
  );
};

export default Navbar;
