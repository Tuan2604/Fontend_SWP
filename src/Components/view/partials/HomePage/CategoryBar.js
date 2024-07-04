import React from "react";
import "./CategoryBar.css"; // Import the CSS file for CategoryBar component styling
import {
  FaBook,
  FaPencilAlt,
  FaGift,
  FaLaptop,
  FaTshirt,
} from "react-icons/fa"; // Example icons from FontAwesome

const categories = [
  { icon: <FaBook />, label: "Tài liệu" },
  { icon: <FaPencilAlt />, label: "Dụng cụ học tập" },
  { icon: <FaGift />, label: "Vật phẩm" },
  { icon: <FaLaptop />, label: "Thiết bị học tập" },
  { icon: <FaTshirt />, label: "Đồng phục FPT" },
];

const CategoryBar = () => {
  return (
    <div className="category-bar">
      {categories.map((category, index) => (
        <div key={index} className="category-item">
          {category.icon}
          <span>{category.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
