import './Contacts.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import { FaFacebookF, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';

const Contacts = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="contacts">
      <section className="contacts-hero">
        <div className="container">
          <h1>Свържете се с нас</h1>
          <p>Вашият надежден партньор в професионалното почистване</p>
        </div>
      </section>

      <div className="contacts-container">
        <section className="contact-info">
          <h2>Информация за контакт</h2>
          
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h3>Адрес</h3>
              <p>ул. "Примерна" 123, София 1000</p>
            </div>
          </div>

          <div className="info-item">
            <FaPhone className="icon" />
            <div>
              <h3>Телефон</h3>
              <p>+359 888 123 456</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="icon" />
            <div>
              <h3>Имейл</h3>
              <p>info@cleaningcompany.bg</p>
            </div>
          </div>

          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contacts;
