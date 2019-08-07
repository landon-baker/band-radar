import React from 'react';

const Login = () => {
  return (
    <form action="http://localhost:8888/login" method="get">
      <button type="submit">Login with Spotify</button>
    </form>
  );
};

export default Login;
