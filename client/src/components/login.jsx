import React from 'react';

const Login = () => {
  return (
    <div className="loginWrapper">
      <div className="row">
        <h3>Welcome to Band Radar!</h3>
        <h4>Get started by clicking the button below to login with Spotify</h4>
        <div className="row">
          <form action="http://localhost:8888/login" method="get">
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
