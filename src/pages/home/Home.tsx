import './Home.css';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

const Home = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  
  const handleLearnMoreClick = () => {
    navigate('/services');
  };
  
  return (
    <div className="home-container">
      <section className="home-hero" id="начало">
        <div className="container">
          <h1>Професионално почистване за вашия дом и офис</h1>
          <p className="section-description">Доверете се на нашия опит за безупречна чистота и комфорт</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Професионализъм</h3>
              <p>Обучен персонал и модерно оборудване за отлични резултати</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Екологичност</h3>
              <p>Използваме само екологични и безопасни почистващи препарати</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Качество</h3>
              <p>Гарантирани резултати и внимание към всеки детайл</p>
            </div>
          </div>

          <div className="cta-section">
            <Button 
              text="Научете повече" 
              className="cta-button" 
              onClick={handleLearnMoreClick} 
            />
          </div>
        </div>
      </section>

      <section className="services-overview">
        <div className="container">
          <h2>Нашите Услуги</h2>
          <p className="section-description">Предлагаме пълен набор от професионални почистващи услуги</p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Домашно Почистване</h3>
              <p>Цялостно почистване на вашия дом с внимание към детайла</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Офис Почистване</h3>
              <p>Професионална поддръжка на офис пространства</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🧹</div>
              <h3>Специализирано Почистване</h3>
              <p>Почистване след ремонт, пране на мека мебел и др.</p>
            </div>
          </div>

          <div className="cta-section">
            <Button 
              text="Вижте всички услуги" 
              className="secondary-button" 
              onClick={() => navigate('/services')} 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
