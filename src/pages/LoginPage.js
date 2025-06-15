import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMsg('ユーザーIDとパスワードを両方入力してください。');
      return;
    }
    await login();
  };

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
      setErrorMsg('ログインに失敗しました。\nユーザー名またはパスワードが間違っています。');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
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
      <button onClick={handleSubmit}>ログイン</button>

      <hr style={{ margin: '20px 0' }} />

      <button onClick={handleGoogleLogin}>Googleログイン</button>
    </div>
  );
};

export default LoginPage;
