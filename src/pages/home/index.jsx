import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Input,
  Dropdown,
  Button,
  Menu,
  Avatar,
  Typography,
  Badge,
  Card,
  Carousel,
} from "antd";
import {
  DownOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const userMenu = (
  <Menu>
    <Menu.Item key="1">
      <a href="#">Profile</a>
    </Menu.Item>
    <Menu.Item key="2">
      <a href="#">Settings</a>
    </Menu.Item>
    <Menu.Item key="3">
      <a href="#">Sign Out</a>
    </Menu.Item>
  </Menu>
);

// Sample data for the cards (for todayEvents)
const todayEvents = [
  { title: "Event 1", description: "Description for Event 1" },
  { title: "Event 2", description: "Description for Event 2" },
  { title: "Event 3", description: "Description for Event 3" },
  { title: "Event 4", description: "Description for Event 4" },
  { title: "Event 5", description: "Description for Event 5" },
];

const cardStyle = {
  width: "100%",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
};

const carouselStyle = {
  display: "flex",
  alignItems: "center",
};

export const HomePage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const mainUrl = process.env.VITE_API_BASE_URL;
        const apiUrl = process.env.VITE_API_URL_UPCOMING_EVENT;

        console.log("Base URL:", mainUrl);
        console.log("API URL:", apiUrl);

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${mainUrl}${apiUrl}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {}, // Add necessary data if required by the API
        };

        const response = await axios.request(config);
        console.log("API Response:", response.data);

        if (response.data.status) {
          setUpcomingEvents(response.data.data);
          console.log("Upcoming Events Set:", response.data.data);
        } else {
          console.error("Failed to fetch events:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // console.log("Upcoming Events State:", upcomingEvents);

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white p-4 flex justify-between items-center">
        <div
          className="relative flex items-center w-full max-w-xs mx-auto"
          style={{ marginTop: "12px" }}
        >
          {/* Search Input */}
          <Input
            placeholder="Search..."
            size="small"
            className="rounded-full px-3 py-1 w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
            prefix={<SearchOutlined className="text-blue-500" />}
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #d1d5db",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            size="small"
            className="absolute right-1"
            style={{
              backgroundColor: "#1890ff",
              border: "none",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        {/* Notification and User Login Buttons */}
        <div className="flex items-center space-x-4">
          <Badge count={5} overflowCount={9}>
            <Button
              type="text"
              shape="circle"
              icon={<BellOutlined className="text-gray-800" />}
            />
          </Badge>

          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={{ marginRight: 8 }}
              />
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>

      <Content className="p-4">
        <div className="container mx-auto">
          <Title level={1} className="mb-4">
            Today Events
          </Title>

          {/* Carousel for Today's Events */}
          <Carousel
            autoplay
            slidesToShow={3}
            className="mb-6"
            style={carouselStyle}
          >
            {todayEvents.map((event, index) => (
              <div key={index}>
                <Card title={event.title} bordered={false} style={cardStyle}>
                  <p>{event.description}</p>
                </Card>
              </div>
            ))}
          </Carousel>

          <Title level={1} className="mb-4">
            Upcoming Events
          </Title>

          {/* Carousel for Upcoming Events */}
          <Carousel autoplay slidesToShow={3} style={carouselStyle}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div key={index}>
                  <Card
                    title={event.eventname}
                    bordered={false}
                    style={cardStyle}
                  >
                    <p>{event.description}</p>
                  </Card>
                </div>
              ))
            ) : (
              <p>No upcoming events available.</p>
            )}
          </Carousel>
        </div>
      </Content>

      <Footer className="bg-gray-800 text-white text-center p-4">
        © 2024 Your Company. All rights reserved.
      </Footer>
    </Layout>
  );
};
