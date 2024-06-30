import { Row, Typography, Col, Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";

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

function PostManagementPage() {
    const navigate = useNavigate()
  return (
    <>
      <div className="content-container" style={{ marginTop: "3%" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: "2%" }}
        >
          <Typography.Title level={3} style={{ margin: 0 }}>
            Your Post
          </Typography.Title>
          <Button
            style={{
              maxWidth: "200px",
              margin: 0,
              backgroundColor: "#e38d13",
              color: "#fff",
            }}
            onClick={() => navigate("/saler/post-create")}
          >
            Create New Post
          </Button>
        </Flex>
        <Row>
          {cardsData.map((card, index) => (
            <Col span={6}>
              <div key={index} className="shopping-card">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <p className="card-price">{card.price}</p>
                  <div className="card-features">
                    {card.features.map((feature, idx) => (
                      <span key={idx} className="card-feature">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default PostManagementPage;
