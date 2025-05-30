import axios from 'axios';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: 'airi',
        password: 'password',
      });
      setToken(response.data.token);
      console.log('取得したトークン:', response.data.token);
    } catch (error) {
      console.log('ログイン失敗:', error);
    }
  };

  const getHelloMessage = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/hello', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data);
    } catch (error) {
      console.error('hello API 呼び出し失敗:', error);
      setMessage('API呼び出しに失敗しました。');
    }
  };

  return (
    <div>
      <h1>JWT Login Test</h1>
      <button onClick={login}>ログイン</button>
      <p>Token: {token}</p>

      <button onClick={getHelloMessage} disabled={!token}>
        トークンで /auth/hello 呼び出し
      </button>
      <p>メッセージ：{message}</p>
    </div>
  );
}

export default App;
