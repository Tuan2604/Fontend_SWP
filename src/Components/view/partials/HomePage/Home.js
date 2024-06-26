import React from 'react';
import Slider from 'react-slick';
import './Home.css'; // Import the CSS file for Home component styling
import Footer from '../Footer/Footer';

const Home = () => {
  const sliderImages = [
    'https://daihoc.fpt.edu.vn/wp-content/uploads/2020/02/web-banner-1920x550.jpg',
    'https://microsoft.fptcloud.com/wp-content/uploads/2023/11/FPT-Smart-Cloud-Blog-Post-BR8-1.png',
    'https://csmovietnam.com/wp-content/uploads/2023/08/banner-website-1920-x-900px-2.png',
  ];

  const cardsData = [
    {
      imageUrl: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png',
      title: 'Tài Liệu SV',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      imageUrl: 'https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg',
      title: 'Tài liệu prj',
      description: 'Description of Car 2',
      price: '$20,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      imageUrl: 'https://giadungnhaviet.com/wp-content/uploads/2018/09/bo-mach-dieu-khien-arduino-r3-2.jpg',
      title: 'Bang mach dien tu',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      imageUrl: 'https://library.fpt.edu.vn/Uploads/HN/Images/Catalogue/FPT190025804.png',
      title: 'Sach kanji co ban',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      imageUrl: 'https://dongphuccati.com/images/products/2020/05/18/original/2-1.jpg',
      title: 'Ao fpt',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
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
                <img src={url} alt={`Slide ${index + 1}`} className="slider-image" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="shopping-cards-container">
          {cardsData.map((card, index) => (
            <div key={index} className="shopping-card">
              <img src={card.imageUrl} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <p className="card-price">{card.price}</p>
                <div className="card-features">
                  {card.features.map((feature, idx) => (
                    <span key={idx} className="card-feature">{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
