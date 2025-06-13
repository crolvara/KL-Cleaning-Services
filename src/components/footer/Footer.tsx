import './Footer.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="footer">
      <p>{t.footer.copyright}</p>
    </footer>
  );
};

export default Footer; 