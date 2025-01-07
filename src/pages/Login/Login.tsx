import { ChangeEvent, useContext, useState } from "react";

import { Plus, LogIn } from "lucide-react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  //const context = useContext(TaskContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      console.log("teste>>>", isLogged);
      console.log("EmailError>>>", emailError);
      if (isLogged) {
        navigate("/");
      } else {
        alert("Não deu certo.");
      }
    }
    if (!email) {
      setEmailError("Digite seu e-mail.");
    }
    if (!password) {
      setPasswordError("Digite sua senha.");
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center  p-40">
      <div className="space-y-4 w-[500px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Faça seu Login
        </h1>
        <div className="p-8 space-y-8 bg-slate-200 rounded-md shadow flex flex-col">
          <div className="flex flex-col ">
            <input
              type="text"
              placeholder="Digite seu e-mail..."
              className={`border ${
                emailError
                  ? "border-red-500 outline-red-500 focus:outline-0"
                  : "border-slate-300"
              } outline-slate-400 px-4 py-2 rounded-md`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.length > 1) setEmailError(null);
              }}
            />
            {passwordError && (
              <span className=" text-red-500 text-sm mt-1">
                {passwordError}
              </span>
            )}
          </div>
          <div className="flex flex-col ">
            <input
              type="password"
              placeholder="Digite sua senha..."
              className={`border ${
                passwordError
                  ? "border-red-500 outline-red-500 focus:outline-0"
                  : "border-slate-300"
              } outline-slate-400 px-4 py-2 rounded-md`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length > 0) setPasswordError(null);
              }}
            />
            {passwordError && (
              <span className=" text-red-500 text-sm mt-1">
                {passwordError}
              </span>
            )}
          </div>

          <button
            onClick={() => handleLogin()}
            className="
      bg-slate-500 text-violet-50 px-4 py-2 
      rounded-md font-medium flex justify-center items-center gap-2 hover:bg-slate-600"
          >
            <LogIn className="size-4" />
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
};
