import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import logoImage from '../../assets/logos/K.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCallClick = () => {
    window.location.href = 'tel:0884392626';
  };

  return (
    <header className="header">
      <div className="header-logo-container">
        <Link to="/" className="header-logo-link" onClick={closeMobileMenu}>
          <img src={logoImage} alt="KonishevSoft Logo" className="header-logo-image" />
          <h2>KL Cleaning Services</h2>
        </Link>
      </div>
      
      <button 
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className={`header-navigation ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <ul>
          <li><NavLink to="/" end onClick={closeMobileMenu}>Начало</NavLink></li>
          <li><NavLink to="/services" onClick={closeMobileMenu}>Услуги</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobileMenu}>За нас</NavLink></li>
          <li><NavLink to="/contacts" onClick={closeMobileMenu}>Контакти</NavLink></li>
        </ul>
      </nav>
      
      <div className="header-actions">
        <button className="contact-btn" onClick={handleCallClick}>
          📞 Свържете се с нас
        </button>
      </div>
    </header>
  );
};

export default Header; 