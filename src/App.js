import axios from 'axios';
import { useEffect, useState } from 'react';

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
      console.log('トークン取得成功:', response.data.token);
      // トークンをローカルストレージに保存
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.log('ログイン失敗:', error);
    }
  };

  const getAdminMessage = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/hello', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data);
      console.log('管理者メッセージ:', response.data);
    } catch (error) {
      console.error('メッセージ取得失敗:', error);
      setMessage('API呼び出しに失敗しました。');
    }
  };
  // useEffectで初回読み込み時にトークンを復元
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setMessage('');
  };

  return (
    <div>
      <h1>ログイン画面</h1>

      {token ? (
        <>
          <button onClick={getAdminMessage}>管理者メッセージ取得</button>
          <p>{message}</p>
          <button onClick={logout}>ログアウト</button>
        </>
      ) : (
        <>
          <button onClick={login}>ログイン</button>
        </>
      )}
    </div>
  );
}

export default App;
