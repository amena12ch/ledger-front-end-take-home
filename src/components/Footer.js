import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-items">
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
      <small>Copyright @2021</small>
    </footer>
  );
};

export default Footer;
