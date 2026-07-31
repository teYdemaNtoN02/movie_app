import "../css/Header.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

  return (
    <header className="Header">
      <div className="Logo" onClick={() => navigate(`/`)}>
        🎬 MovieApp
      </div>

      <nav className="Nav">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}

export default Header;