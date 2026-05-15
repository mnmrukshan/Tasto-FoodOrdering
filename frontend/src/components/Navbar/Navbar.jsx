import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const { getTotalCartAmount, token, setToken, search, setSearch, userData } = useContext(StoreContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
      if (window.scrollY > lastScrollY && window.scrollY > 150) setVisible(false);
      else setVisible(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.navbar-profile')) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileMenu]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfileMenu(false);
    navigate('/')
  }

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''} ${!visible ? 'hidden' : ''}`}>
      {/* ... previous code remains the same ... */}
      <Link to='/' className='logo-container' onClick={() => window.scrollTo(0, 0)}>
        <svg className="logo-svg" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
            <mask id="logo-mask">
              <rect x="0" y="0" width="40" height="40" fill="white" />
              {/* Bite Mark */}
              <circle cx="36" cy="4" r="8" fill="black" />
              {/* Fork Silhouette Slits */}
              <rect x="17" y="24" width="1.5" height="12" rx="1" fill="black" />
              <rect x="21.5" y="24" width="1.5" height="12" rx="1" fill="black" />
            </mask>
          </defs>
          <path d="M4 8C4 5.79086 5.79086 4 8 4H32C34.2091 4 36 5.79086 36 8V12H24V36H16V12H4V8Z" fill="url(#logo-gradient)" mask="url(#logo-mask)" />
        </svg>
        <span className="logo-text">TASTO</span>
      </Link>
      <ul className={`navbar-menu ${showSearch ? 'hide' : ''}`}>
        <Link to="/" className={location.pathname === "/" && location.hash === "" ? "active" : ""}>Home</Link>
        <a href='/#explore-menu' className={location.hash === "#explore-menu" ? "active" : ""}>Our Menu</a>
        <a href='/#app-download' className={location.hash === "#app-download" ? "active" : ""}>Get App</a>
        <a href='/#footer' className={location.hash === "#footer" ? "active" : ""}>Contact</a>
      </ul>
      <div className="navbar-right">
        <div className={`navbar-search-container ${showSearch ? 'active' : ''}`}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus={showSearch}
          />
          {showSearch ? (
            <img
              src={assets.cross_icon}
              alt="close"
              className="search-close"
              onClick={() => { setShowSearch(false); setSearch(""); }}
            />
          ) : (
            <img src={assets.search_icon} alt="search" onClick={() => setShowSearch(true)} />
          )}
        </div>
        <Link to='/cart' className={`navbar-cart-icon ${location.pathname === "/cart" ? "active" : ""}`}>
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile' onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <img src={assets.profile_icon} alt="" className="profile-icon-main" />
            <div className={`navbar-profile-dropdown ${showProfileMenu ? 'active' : ''}`}>
              <div className="user-details">
                <p className="user-name">{userData.name || "Guest"}</p>
                <p className="user-email">{userData.email || "user@tasto.com"}</p>
              </div>
              <hr className="dropdown-divider" />
              <li onClick={() => navigate('/myorders')}> 
                <img src={assets.bag_icon} alt="" /> 
                <p>Orders</p>
              </li>
              <li onClick={logout} className="logout-item"> 
                <img src={assets.logout_icon} alt="" /> 
                <p>Logout</p>
              </li>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar

