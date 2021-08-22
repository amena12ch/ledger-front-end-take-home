import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Posts">Posts</Link>
          </li>
          <li>
            <Link to="/Albums">Albums</Link>
          </li>
          <li>
            <Link to="/Todos">Todos</Link>
          </li>
        </ul>
        <h1 className="logo">
          <Link to="/">
            <img
              src="/assets/images/logo.png"
              className="logo-img"
              alt="logo"
            />
          </Link>
        </h1>
      </div>
    </nav>
  );
};

export default Header;
