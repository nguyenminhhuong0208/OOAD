import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./language-selector.css";

const languages = [
  { code: "vi", lang: "Tiếng Việt" },
  { code: "en", lang: "English" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation(); // để truy cập vào đối tượng i18n của thư viện
  const [showDropdown, setShowDropdown] = useState(false); // kiểm soát việc hiển thị/ẩn dropdown chọn ngôn ngữ.

  useEffect(() => {
    document.body.dir = i18n.dir(); // để thay đổi hướng viết của ứng dụng
  }, [i18n, i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // để thay đổi ngôn ngữ hiển thị của ứng dụng
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // đóng/mở dropdown chọn ngôn ngữ.
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
