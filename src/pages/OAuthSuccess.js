import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //今後トークンをクエリから取得して保存したい場合はここで処理
    console.log('OAuth login successful!');
    navigate('/admin'); //認証済みページへリダイレクト
  }, [navigate]);

  return <div>ログイン成功！リダイレクト中です...</div>;
};

export default OAuthSuccess;
