import React from "react";
import "./Details.css";

const Details = () => {
  const sliderImages = [
    "https://daihoc.fpt.edu.vn/wp-content/uploads/2020/02/web-banner-1920x550.jpg",
    "https://microsoft.fptcloud.com/wp-content/uploads/2023/11/FPT-Smart-Cloud-Blog-Post-BR8-1.png",
    "https://csmovietnam.com/wp-content/uploads/2023/08/banner-website-1920-x-900px-2.png",
  ];

  const cardsData = [
    {
      imageUrl:
        "https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png",
      title: "Tài Liệu SV",
      description: "Description of Car 1",
      price: "$10,000",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
      title: "Tài liệu prj",
      description: "Description of Car 2",
      price: "$20,000",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      imageUrl:
        "https://giadungnhaviet.com/wp-content/uploads/2018/09/bo-mach-dieu-khien-arduino-r3-2.jpg",
      title: "Bang mach dien tu",
      description: "Description of Car 1",
      price: "$10,000",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      imageUrl:
        "https://library.fpt.edu.vn/Uploads/HN/Images/Catalogue/FPT190025804.png",
      title: "Sach kanji co ban",
      description: "Description of Car 1",
      price: "$10,000",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      imageUrl:
        "https://dongphuccati.com/images/products/2020/05/18/original/2-1.jpg",
      title: "Ao fpt",
      description: "Description of Car 1",
      price: "$10,000",
      features: ["Feature 1", "Feature 2", "Feature 3"],
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
    <>
      <main className="container">
        {/* Left Column / Headphones Image */}
        <div className="left-column">
          <div
            style={{
              backgroundImage:
                "url('https://dongphuccati.com/images/products/2020/05/18/original/2-1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height:"800px",
              marginRight: '100px'
            }}
          ></div>

        </div>
        {/* Right Column */}
        <div className="right-column">
          {/* Product Description */}
          <div className="product-description">
            <span>Headphones</span>
            <h1>Beats EP</h1>
            <p>
              The preferred choice of a vast range of acclaimed DJs. Punchy,
              bass-focused sound and high isolation. Sturdy headband and on-ear
              cushions suitable for live performance
            </p>
          </div>
          {/* Product Configuration */}
          <div className="product-configuration">
            {/* Product Color */}
            <div className="product-color">
              <span>Color</span>
              <div className="color-choose">
                <div>
                  <input
                    data-image="red"
                    type="radio"
                    id="red"
                    name="color"
                    defaultValue="red"
                    defaultChecked
                  />
                  <label htmlFor="red">
                    <span />
                  </label>
                </div>
                <div>
                  <input
                    data-image="blue"
                    type="radio"
                    id="blue"
                    name="color"
                    defaultValue="blue"
                  />
                  <label htmlFor="blue">
                    <span />
                  </label>
                </div>
                <div>
                  <input
                    data-image="black"
                    type="radio"
                    id="black"
                    name="color"
                    defaultValue="black"
                  />
                  <label htmlFor="black">
                    <span />
                  </label>
                </div>
              </div>
            </div>
            {/* Cable Configuration */}
            <div className="cable-config">
              <span>Cable configuration</span>
              <div className="cable-choose">
                <button>Straight</button>
                <button>Coiled</button>
                <button>Long-coiled</button>
              </div>
              <a href="#">How to configurate your headphones</a>
            </div>
          </div>
          <div className="product-price">
            <span>148$</span>
            <a href="#" className="cart-btn">
              Add to cart
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Details;
