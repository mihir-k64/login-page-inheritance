import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const navigate = useNavigate(); 

  const handleLoginClick = () => {  // Added this function
    navigate('/auth');  // This redirects to your custom login page
  };

  return (
    <div>
      <h1>Welcome to Our App</h1>
      <li>
      {
      isAuthenticated ? <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button> : <button onClick={handleLoginClick}>Log In</button> 
      }
      </li>
    </div>
  );
}

export default LoginPage;
