import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./language-selector.css";

const languages = [
  { code: "vi", lang: "Tiếng Việt" },
  { code: "en", lang: "English" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="language-selector">
      <button className="language-logo" onClick={toggleDropdown}>
        <img src={require(`../Assets/${i18n.language}.png`)} alt="Logo" />
      </button>
      {showDropdown && (
        <ul className="language-dropdown">
          {languages.map((lng) => (
            <li key={lng.code}>
              <button
                className={`language-button ${
                  lng.code === i18n.language ? "active" : ""
                }`}
                onClick={() => {
                  changeLanguage(lng.code);
                  setShowDropdown(false);
                }}
              >
                <span className="language-flag">
                  <img
                    src={require(`../Assets/${lng.code}.png`)}
                    alt={lng.lang}
                  />
                </span>
                <span className="language-name">{lng.lang}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
