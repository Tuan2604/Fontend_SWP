import React from "react";
import Slider from "react-slick";
import "./Home.css"; // Import the CSS file for Home component styling
import ShoppingCard from "../Post/ShoppingCard"; // Import the corrected ShoppingCard component
import Footer from "../Footer/Footer";
import CategoryBar from "./CategoryBar"; // Import the CategoryBar component

const Home = () => {
  const sliderImages = [
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2020/02/web-banner-1920x550.jpg",
    "https://microsoft.fptcloud.com/wp-content/uploads/2023/11/FPT-Smart-Cloud-Blog-Post-BR8-1.png",
    "https://csmovietnam.com/wp-content/uploads/2023/08/banner-website-1920-x-900px-2.png",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Ensure arrows are enabled
  };

  return (
    <div className="home-container">
      <div className="content-container">
        <div className="slider-container">
          <Slider {...sliderSettings}>
            {sliderImages.map((url, index) => (
              <div key={index} className="slider-image-container">
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  className="slider-image"
                />
              </div>
            ))}
          </Slider>
        </div>
        <CategoryBar /> {/* Use the CategoryBar component */}
        <ShoppingCard /> {/* Render the corrected ShoppingCard component */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
