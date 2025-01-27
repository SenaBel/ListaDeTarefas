import { useContext, useRef, useState } from "react";

import { LogIn, User, Lock } from "lucide-react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";

export const Login = () => {
  //const context = useContext(TaskContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const inputPassword = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

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
            <div className="flex items-center gap-2">
              <User className="text-slate-700" />
              <CustomInput
                name="email"
                type="text"
                placeholder="Digite seu e-mail..."
                error={emailError}
                className={`flex-grow border ${
                  emailError
                    ? "border-red-500 outline-red-500 focus:outline-0"
                    : "border-slate-300"
                } outline-slate-400 px-4 py-2 rounded-md`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.length > 0) setEmailError(null);
                }}
                onPressEnter={() => inputPassword.current?.focus()}
              />

              {/* <input
                type="text"
                placeholder="Digite seu e-mail..."
                className={`flex-grow border ${
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
            {emailError && (
              <span className=" text-red-500 text-sm mt-1 ml-8">
                {emailError}
              </span>
            )} */}
            </div>
            {emailError && (
              <span className=" text-red-500 text-sm mt-1 ml-8">
                {emailError}
              </span>
            )}
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center gap-2">
              <Lock className="text-slate-700" />

              <CustomInput
                name="password"
                type="password"
                placeholder="Digite sua senha..."
                error={passwordError}
                ref={inputPassword}
                className={`flex-grow border ${
                  passwordError
                    ? "border-red-500 outline-red-500 focus:outline-0"
                    : "border-slate-300"
                } outline-slate-400 px-4 py-2 rounded-md`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length > 0) setPasswordError(null);
                }}
                onPressEnter={() => loginButtonRef.current?.focus()}
              />

              {/* <input
                type="password"
                placeholder="Digite sua senha..."
                className={`flex-grow border ${
                  passwordError
                    ? "border-red-500 outline-red-500 focus:outline-0"
                    : "border-slate-300"
                } outline-slate-400 px-4 py-2 rounded-md`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length > 0) setPasswordError(null);
                }}
              /> */}
            </div>
            {passwordError && (
              <span className=" text-red-500 text-sm mt-1 ml-8">
                {passwordError}
              </span>
            )}
          </div>

          <button
            ref={loginButtonRef}
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
