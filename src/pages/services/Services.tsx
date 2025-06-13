import './Services.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/contacts');
  };

  return (
    <div className="services">
      <section className="services-hero">
        <div className="container">
          <h1>Нашите Услуги</h1>
          <p>Професионални решения за всички ваши нужди от почистване</p>
        </div>
      </section>

      <section className="services-grid">
        <div className="service-card">
          <div className="feature-icon">🏠</div>
          <h3>Домашно Почистване</h3>
          <ul>
            <li>Основно почистване</li>
            <li>Поддържащо почистване</li>
            <li>Почистване на прозорци</li>
            <li>Почистване след ремонт</li>
            <li>Почистване на мебели</li>
          </ul>
          <Button 
            text="Запитване" 
            onClick={handleLearnMore}
            className="secondary"
          />
        </div>

        <div className="service-card">
          <div className="feature-icon">🏢</div>
          <h3>Офис Почистване</h3>
          <ul>
            <li>Ежедневно почистване</li>
            <li>Дезинфекция</li>
            <li>Почистване на общи части</li>
            <li>Абонаментни услуги</li>
            <li>Почистване на офис техника</li>
          </ul>
          <Button 
            text="Запитване" 
            onClick={handleLearnMore}
            className="secondary"
          />
        </div>

        <div className="service-card">
          <div className="feature-icon">⚡</div>
          <h3>Специализирано Почистване</h3>
          <ul>
            <li>Пране на мека мебел</li>
            <li>Машинно почистване на подове</li>
            <li>Почистване на щори и завеси</li>
            <li>Премахване на петна</li>
            <li>Почистване на килими</li>
          </ul>
          <Button 
            text="Запитване" 
            onClick={handleLearnMore}
            className="secondary"
          />
        </div>
      </section>

      <section className="pricing-info">
        <div className="container">
          <h2>Гъвкави Ценови Планове</h2>
          <p>Предлагаме индивидуални оферти според вашите конкретни нужди и изисквания. Свържете се с нас за безплатна консултация и оглед.</p>
          <Button 
            text="Поискайте Оферта" 
            onClick={handleLearnMore}
            className="cta-button"
          />
        </div>
      </section>
    </div>
  );
};

export default Services;
