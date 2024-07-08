import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, Row, Col } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineElement,
} from "chart.js";
import AdminLayout from "../../../layout/header/AdminLayout";
import { useAuth } from "../../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineElement
);

const processData = (data) => {
  const counts = {};
  data.forEach((item) => {
    const month = item.date.getMonth();
    counts[month] = (counts[month] || 0) + 1;
  });
  return counts;
};

function DashboardPage() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, setUserInformation } = useAuth();
  // const [user, setUser] = useState([]);
  // const [post, setPost] = useState([]);
  // const [report, setReport] = useState([]);
  // const [product, setProduct] = useState([]);
  const user = [
    { date: new Date(2021, 0, 1) },
    { date: new Date(2021, 0, 1) },
    { date: new Date(2021, 1, 1) },
    { date: new Date(2021, 2, 1) },
    { date: new Date(2021, 2, 1) },
    { date: new Date(2021, 2, 1) },
  ];
  const post = [
    { date: new Date(2021, 0, 1) },
    { date: new Date(2021, 0, 1) },
    { date: new Date(2021, 0, 1) },
    { date: new Date(2021, 1, 1) },
    { date: new Date(2021, 1, 1) },
  ];
  const report = [
    { date: new Date(2021, 0, 1) },
    { date: new Date(2021, 1, 1) },
  ];
  const product = [
    { date: new Date(2021, 0, 1) },
    { date: new Date(2021, 1, 1) },
    { date: new Date(2021, 1, 1) },
    { date: new Date(2021, 2, 1) },
    { date: new Date(2021, 2, 1) },
  ];
  const [reload, setReload] = useState(true);

  const usersData = processData(user);
  const postsData = processData(post);
  const reportsData = processData(report);
  const productData = processData(product);

  const totalUser = user.length;
  const totalPost = post.length;
  const totalReport = report.length;
  const totalProduct = product.length;

  const handleLogout = () => {
    setIsLogin(false);
    setUserInformation({});
    navigate("/login", { replace: true });
  };

  const chartData = {
    labels: Object.keys(usersData),
    datasets: [
      {
        label: "Users",
        data: Object.values(usersData),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Posts",
        data: Object.values(postsData),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Reports",
        data: Object.values(reportsData),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "Sales",
        data: Object.values(productData),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate("/login"); // Redirect to admin login if not logged in
  //     return;
  //   }
  //   const handleFetchData = async () => {
  //     try {
  //       const [getUser, getPost, getProduct, getReport] = await Promise.all([
  //         axios.get("https://localhost:7071/api/user-management"),
  //       ]);
  //       if (getUser.status === 200) {
  //         // setData(response.data);
  //         setUser(getUser.data);
  //       } else {
  //         console.error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred while fetching user data");
  //     }
  //   };
  //   if (reload) {
  //     setReload(false);
  //     handleFetchData();
  //   }
  // }, [isLogin, reload, navigate]);
  return (
    <>
      <AdminLayout onLogout={handleLogout}>
        <div>
          <Row gutter={16} style={{ marginBottom: "2%" }}>
            <Col span={6}>
              <Card title="Total Users" bordered={false}>
                {totalUser}
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Total Posts" bordered={false}>
                {totalPost}
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Total Reports" bordered={false}>
                {totalReport}
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Total Sales" bordered={false}>
                {totalProduct}
              </Card>
            </Col>
          </Row>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>
      </AdminLayout>
    </>
  );
}

export default DashboardPage;
