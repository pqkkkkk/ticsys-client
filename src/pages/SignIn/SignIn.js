import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { SignInApi, SignInWithGoogleApi } from "../../services/api/AccountApi";
import { setUserSession, setToken } from "../../services/UserStorageService";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const HandleSignIn = async () => {
        const signInRequest = {
            userName: username,
            passWord: password
        };
        
        if(!username || !password) {
            alert("Please fill in all fields");
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await SignInApi(signInRequest);
            if(response){
                console.log(response);
                if(response.authenticated === true) {
                    alert(response.message);
                    setUserSession(response.user);
                    setToken(response.token);
                    
                    // Kiểm tra xem có saved redirect path không
                    const redirectPath = sessionStorage.getItem('redirectAfterLogin');
                    if (redirectPath) {
                        sessionStorage.removeItem('redirectAfterLogin');
                        navigate(redirectPath);
                    } else {
                        navigate("/");
                    }
                } else {
                    alert(response.message);
                }
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            // Decode JWT token từ Google
            console.log('Google credential response:', credentialResponse);
            const decoded = jwtDecode(credentialResponse.credential);
            console.log('Google user info:', decoded);
            
            // Tạo một request tương tự như đăng nhập thông thường
            // Bạn có thể gửi thông tin Google user đến backend để xử lý
            const googleSignInRequest = {
                idToken: credentialResponse.credential,
            };
            
            // TODO: Gọi API backend để xử lý đăng nhập Google
            const response = await SignInWithGoogleApi(googleSignInRequest);
            console.log('Google login response:', response);
            // Hiện tại sẽ giả lập phản hồi thành công
            if(response && response.data?.authenticated) {
                alert("Google login successful!");
            }
            else{
                alert("Google login failed. Please try again.");
                return;
            }
            
            
            setUserSession(response.data.user);
            setToken(response.data.accessToken);

            // Redirect
            const redirectPath = sessionStorage.getItem('redirectAfterLogin');
            if (redirectPath) {
                sessionStorage.removeItem('redirectAfterLogin');
                navigate(redirectPath);
            } else {
                navigate("/");
            }
            
        } catch (error) {
            console.error('Google login error:', error);
            alert("Google login failed. Please try again.");
        }
    };

    const handleGoogleLoginError = () => {
        console.error('Google login failed');
        alert("Google login failed. Please try again.");
    };

    const handleFacebookLogin = () => {
        // TODO: Implement Facebook login
        alert("Facebook login coming soon!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-secondary-900 flex items-center justify-center p-4">
            <ThemeToggle />
            <div className="w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-secondary-700 dark:text-primary-400 mb-2">TicSys</h1>
                    <p className="text-secondary-500 dark:text-gray-300">Your Event Management Platform</p>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                    {/* Welcome Text */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-secondary-700 dark:text-white mb-2">Welcome Back</h2>
                        <p className="text-secondary-500 dark:text-gray-300">Sign in to your account</p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3 mb-6">
                        {/* Google Login Component */}
                        <div className="w-full">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={handleGoogleLoginError}
                                useOneTap={false}
                                theme="outline"
                                size="large"
                                width="100%"
                                text="continue_with"
                                shape="rectangular"
                            />
                        </div>
                        
                        <button 
                            onClick={handleFacebookLogin}
                            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg py-3 px-4 font-medium transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Continue with Facebook
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-gray-800 text-secondary-500 dark:text-gray-300">or continue with username</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); HandleSignIn(); }}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                Username
                            </label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-600 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <button 
                                type="button"
                                onClick={() => alert("Forgot password functionality coming soon!")}
                                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium bg-transparent border-none cursor-pointer"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center mt-6 text-secondary-600 dark:text-gray-300">
                        Don't have an account?{' '}
                        <button 
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium bg-transparent border-none cursor-pointer underline"
                        >
                            Create an account
                        </button>
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-secondary-500 dark:text-gray-400">
                    © 2025 TicSys. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default SignIn;
