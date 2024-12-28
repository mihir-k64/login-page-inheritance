import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import googleIcon from './images/google.png';
import linkdenIcon from './images/linkden.png';
import githubIcon from './images/github.png';

function Login(props) {
    const [logindetail, setLogindetail] = useState({ email: "", password: "" });
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    // Check if user is authenticated and redirect if needed
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redirect to home/dashboard after successful login
        }
    }, [isAuthenticated, navigate]);

    function handleDefault(event) {
        event.preventDefault();
        alert("Manual login is not yet configured with Auth0.");
    }

    function handleInput(event) {
        const { name, value } = event.target;
        setLogindetail((prevState) => ({ ...prevState, [name]: value }));
    }

    // Custom social login handlers
    const handleSocialLogin = (connection) => {
        loginWithRedirect({
            connection,
            prompt: 'select_account',
            screen_hint: 'signup',
            skipIntermediate: true,
            // Add these additional parameters
            loginHint: logindetail.email, // If you want to pre-fill the email
            auth0Client: {
                name: 'your-app-name',
                version: '1.0.0'
            },
            // This ensures we bypass Auth0's universal login
            authorizationParams: {
                response_type: 'code',
                connection: connection,
            }
        });
    };

    return (
        <div className='loginContainer'>
            <h1>Login</h1>
            <form className="inputform" onSubmit={handleDefault}>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    placeholder='email@gmail.com'
                    id='email'
                    name='email'
                    onChange={handleInput}
                    value={logindetail.email}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    placeholder='********'
                    id='password'
                    name='password'
                    onChange={handleInput}
                    value={logindetail.password}
                />
                <div className="divider">
                    <span>OR</span>
                </div>
                <div className="social-login">
                    <button
                        type="button"
                        className="social-btn google-btn"
                        onClick={() => handleSocialLogin('google-oauth2')}
                    >
                        <img src={googleIcon} alt="Google icon" className="social-icon" />
                        <span>Continue with Google</span>
                    </button>

                    <button
                        type="button"
                        className="social-btn linkedin-btn"
                        onClick={() => handleSocialLogin('linkedin')}
                    >
                        <img src={linkdenIcon} alt="LinkedIn icon" className="social-icon" />
                        <span>Continue with LinkedIn</span>
                    </button>

                    <button
                        type="button"
                        className="social-btn github-btn"
                        onClick={() => handleSocialLogin('github')}
                    >
                        <img src={githubIcon} alt="GitHub icon" className="social-icon" />
                        <span>Continue with GitHub</span>
                    </button>
                </div>
                <button type='submit'>Login</button>
            </form>
            <button onClick={props.displayRegister} className='registerHere'>
                Don't have an account? Register
            </button>
        </div>
    );
}

export default Login;