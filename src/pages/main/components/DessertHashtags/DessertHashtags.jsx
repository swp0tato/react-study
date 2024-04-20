import React from "react";
import "./DessertHashtags.style.css";

const DessertHashtags = () => {
  const dessertData = [
    {
      type: "소금빵",
      icon: "https://img.icons8.com/external-others-ghozy-muhtarom/64/external-bread-food-filled-line-others-ghozy-muhtarom.png",
    },
    {
      type: "에그타르트",
      icon: "https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/62/external-egg-tart-dessert-rabit-jes-outline-color-rabit-jes.png",
    },
    {
      type: "쿠키",
      icon: "https://img.icons8.com/external-dreamcreateicons-outline-color-dreamcreateicons/64/external-cookies-thanksgiving-dreamcreateicons-outline-color-dreamcreateicons.png",
    },
    {
      type: "아이스크림",
      icon: "https://img.icons8.com/external-fill-outline-pongsakorn-tan/64/external-cold-sweet-and-dessert-fill-outline-pongsakorn-tan.png",
    },
    {
      type: "빙수",
      icon: "https://img.icons8.com/external-goofy-color-kerismaker/96/external-Shaved-ice-summer-goofy-color-kerismaker.png",
    },
    {
      type: "크로플",
      icon: "https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/external-waffle-sweet-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png",
    },
    { type: "케이크", icon: "https://img.icons8.com/doodle/64/cake--v1.png" },
    {
      type: "마카롱",
      icon: "https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/62/external-macaroon-dessert-rabit-jes-outline-color-rabit-jes.png",
    },
    {
      type: "스콘",
      icon: "https://img.icons8.com/external-filled-outlines-amoghdesign/64/external-bake-thanksgiving-day-filled-outlines-amoghdesign-2.png",
    },
    {
      type: "브라우니",
      icon: "https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/62/external-brownie-dessert-rabit-jes-outline-color-rabit-jes.png",
    },
    { type: "도넛", icon: "https://img.icons8.com/doodle/64/doughnut.png" },
    {
      type: "샌드위치",
      icon: "https://img.icons8.com/external-filled-outline-lima-studio/64/external-bread-food-filled-outline-lima-studio.png",
    },
  ];

  return (
    <div className="dessert_hashtags_section">
      <div className="dessert_hashtag">
        #소금빵 #에그타르트 #쿠키 #아이스크림 #빙수 #크로플 #케이크 #마카롱
        #스콘 #브라우니 #도넛 #샌드위치
      </div>
      <div className="dessert_button">
        {dessertData.map((item, index) => (
          <button key={index}>
            {item.icon && <img src={item.icon} alt="dessert-icon" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DessertHashtags;
