import './NavMenu.css';
import moviePng from '../../../assets/movie.png'
import { useLocation } from 'react-router-dom';

const NavMenu = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  }

  return (
    <div className="nav-menu">
      <div className="left">
        <span className="logo">
          <img height="24px" width="24px" src={moviePng} alt="Image of movie film popcorn drink and 3D glasses" />
          <p className="logo-text">The Movie Database</p>
        </span>
        <a href="/" className={ isActive("/") }>Home</a>
      </div>
      <div className="right">
        {/* Log in/Sign up functionality goes here */}
      </div>
    </div>
  )
}

export default NavMenu;