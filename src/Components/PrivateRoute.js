import { Navigate } from "react-router-dom";
import { getToken, getUserNivelPermissao } from "../Utils/Auth";

export default function PrivateRoute({ children, requiredLevel }) {
  const token = getToken();
  const userNivelPermissao = getUserNivelPermissao();

  // Não está logado → redireciona para login
  if (!token) return <Navigate to="/login" replace />;

  // Logado, mas não tem permissão → redireciona para chat
  if (requiredLevel && userNivelPermissao < requiredLevel) return <Navigate to="/chat" replace />;

  return children; // Tem permissão → libera acesso
}
