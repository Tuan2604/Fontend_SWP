import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Home.css"; // Import the CSS file for Home component styling
import ShoppingCard from "../Post/ShoppingCard"; // Import the corrected ShoppingCard component
import Footer from "../Footer/Footer";
import CategoryBar from "./CategoryBar"; // Import the CategoryBar component
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [paymentId, setPaymentId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const statusPayment = search.get("vnp_TransactionStatus");
  const transactionNo = search.get("vnp_TransactionNo");
  const [status, setStatus] = useState("");
  const accessToken = localStorage.getItem("accessToken");

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
  // if (statusPayment === "00") {
  //   navigate("/");
  // }
  // useEffect(() => {
  //   if (statusPayment === "00") {
  //     setStatus("Success");
  //   } else if (statusPayment === "02") {
  //     setStatus("Error");
  //   } else {
  //     console.log("nothing");
  //   }
  //   axios.put('https://localhost:7071/api/payment')
  // }, [status]);

  useEffect(() => {
    // Retrieve paymentId from localStorage
    const storedPaymentId = localStorage.getItem("paymentId");
    if (storedPaymentId) {
      setPaymentId(storedPaymentId);
    }
  }, []);

  useEffect(() => {
    if (statusPayment === "00") {
      setStatus("Success");
    } else if (statusPayment === "02") {
      setStatus("Error");
    } else {
      console.log("nothing");
    }
  }, [statusPayment]);
  console.log("paymentId", paymentId, "status", status);
  useEffect(() => {
    if (paymentId && status) {
      axios
        .put(
          "https://localhost:7071/api/payment",
          {
            id: paymentId,
            status: status,
            transactionId: transactionNo,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log("Payment status updated:", response);
          alert("Payment status updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating payment status:", error);
          alert("Error updating payment status: " + error.message);
        });
    }
  }, [paymentId, status]);

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
