import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(LanguageDetector) //LanguageDetector để tự động dò tìm ngôn ngữ dựa vào trình duyệt.
  .use(initReactI18next) // Khởi tạo tích hợp với React.
  .use(Backend) // Cho phép tải các file chứa nội dung dịch thuật từ server.
  .init({
    debug: true,
    fallbackLng: "en", // Ngôn ngữ mặc định khi ngôn ngữ của người dùng
    returnObjects: true,
    interpolation: {
      escapeValue: false, // Tắt tính năng thoát các ký tự đặc biệt trong nội dung dịch
    },
  });

export default i18n;