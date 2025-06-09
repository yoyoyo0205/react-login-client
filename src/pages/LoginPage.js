import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      if (token) {
        navigate('/admin');
      }
    } catch (error) {
      setErrorMsg('ログインに失敗しました。ユーザー名またはパスワードが間違っています。');
    }
  };

  return (
    <div className="login-container">
      <h2>ログインページ</h2>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <div className="form-group">
        <input
          type="text"
          placeholder="ユーザーID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={login}>ログイン</button>
    </div>
  );
};

export default LoginPage;
