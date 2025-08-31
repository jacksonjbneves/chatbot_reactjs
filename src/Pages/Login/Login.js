import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, setUserNivelPermissao } from "../../Utils/Auth";
import API from "../../Config/API";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    
    e.preventDefault();    
    try {   
      const res = await API.post("/usuarios/login", { email, senha });
      if(res.data.nivelPermissao >=2){
        setToken(res.data.token);      
        setUserNivelPermissao(res.data.nivelPermissao);      
        navigate("/dashboard/add-question");
      }
      setError("Usuario não tem permissão de acesso");
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div className="container-full border d-flex justify-content-center align-items-center vh-100">
        <div className="container-login shadow border rounded-3 p-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
              <input type="email" className="form-control" id="staticEmail" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
              <input type="password" className="form-control" id="staticSenha" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required/>              
              <button type="submit" className="btn btn-outline-primary">Entrar</button>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    </div>
  );
}
