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
} from "chart.js";
import AdminLayout from "../../../layout/header/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Hook/useAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, setUserInformation } = useAuth();
  const [data, setData] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalReports: 0,
    totalCampuses: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    if (!isLogin) {
      navigate("/login"); // Redirect to admin login if not logged in
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7071/api/statistical/summary"
        );
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching data");
      }
    };

    fetchData();
  }, [isLogin, navigate]);

  const chartData = {
    labels: ["Users", "Posts", "Reports", "Campuses", "Categories"],
    datasets: [
      {
        label: "Statistics",
        data: [
          data.totalUsers,
          data.totalPosts,
          data.totalReports,
          data.totalCampuses,
          data.totalCategories,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
      },
    ],
  };

  const handleLogout = () => {
    setIsLogin(false);
    setUserInformation({});
    navigate("/login", { replace: true });
  };

  return (
    <AdminLayout onLogout={handleLogout}>
      <div>
        <Row gutter={16} style={{ marginBottom: "2%" }}>
          <Col span={6}>
            <Card title="Total Users" bordered={false}>
              {data.totalUsers}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Posts" bordered={false}>
              {data.totalPosts}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Reports" bordered={false}>
              {data.totalReports}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Campuses" bordered={false}>
              {data.totalCampuses}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Categories" bordered={false}>
              {data.totalCategories}
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
  );
}

export default Dashboard;
