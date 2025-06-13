import './About.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>За Нас</h1>
          <p>Вашият надежден партньор в професионалното почистване</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-story">
            <h2>Нашата История</h2>
            <p>С над 5 години опит в бранша, ние се утвърдихме като една от водещите компании за професионално почистване. Започнахме като малък семеен бизнес и израснахме благодарение на доверието на нашите клиенти и неотменния стремеж към съвършенство.</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="feature-icon">⭐</div>
              <h3>Качество</h3>
              <p>Използваме само професионални препарати и оборудване от най-висок клас</p>
            </div>
            <div className="value-card">
              <div className="feature-icon">🤝</div>
              <h3>Отговорност</h3>
              <p>Гарантираме сигурност и конфиденциалност на нашите клиенти</p>
            </div>
            <div className="value-card">
              <div className="feature-icon">🌿</div>
              <h3>Екологичност</h3>
              <p>Работим с екологични препарати, щадящи околната среда</p>
            </div>
            <div className="value-card">
              <div className="feature-icon">👥</div>
              <h3>Професионализъм</h3>
              <p>Нашият екип преминава редовно обучения за най-новите методи</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2>Нашият Екип</h2>
          <p>Зад успеха ни стои екип от отдадени професионалисти с богат опит в сферата на почистването. Всеки член на екипа преминава през строг подбор и редовни обучения, за да гарантираме най-високо качество на услугите ни.</p>
          <div className="cta-section">
            <Button 
              text="Свържете се с нас" 
              onClick={() => navigate('/contacts')}
              className="cta-button"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
