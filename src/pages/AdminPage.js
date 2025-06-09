import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AdminPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/admin/hello', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data);
      } catch (error) {
        setMessage('取得失敗');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>管理画面</h2>
      <p>{message}</p>
    </div>
  );
};

export default AdminPage;
