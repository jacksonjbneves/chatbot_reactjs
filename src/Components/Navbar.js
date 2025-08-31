import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken, removeUserNivelPermissao } from "../Utils/Auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    removeUserNivelPermissao();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {!token && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
            {token && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard/add-question">Dashboard</Link></li>
                <li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
