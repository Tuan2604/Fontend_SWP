import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPurchasedList = ({ postId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) {
        setError(new Error("Post ID is not defined."));
        setLoading(false);
        return; // Return early if postId is not defined
      }

      try {
        const userToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          `https://localhost:7071/api/post-apply/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        // Assuming API returns an object with a 'buyerInfo' array containing user info
        if (response.data && response.data.buyerInfo) {
          setUsers(response.data.buyerInfo);
        } else {
          setUsers([]); // Set empty array if no users found
        }

        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        setError(error); // Set error state
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, [postId]); // Reload data when postId changes

  if (loading) return <p>Loading...</p>; // Display loading indicator

  if (error) return <p>Error fetching users: {error.message}</p>; // Display error message

  // Check if users array is defined and not empty before mapping
  if (!users || users.length === 0) {
    return <p>No users found for Post ID: {postId}</p>;
  }

  return (
    <div>
      <h1>List of Users Who Purchased Post ID: {postId}</h1>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPurchasedList;
