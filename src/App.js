import axios from 'axios';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState('');

  const login = async () => {
    const response = await axios.post('http://localhost:8080/auth/login', {
      username: 'airi',
      password: 'password',
    });
    setToken(response.data.token);
    console.log('取得したトークン:', response.data.token);
  };

  return (
    <div>
      <h1>JWT Login Test</h1>
      <button onClick={login}>ログイン</button>
      <p>Token: {token}</p>
    </div>
  );
}

export default App;
