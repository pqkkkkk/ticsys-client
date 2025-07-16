import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInApi } from "../../services/api/AccountApi";
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

    const handleGoogleLogin = () => {
        // TODO: Implement Google login
        alert("Google login coming soon!");
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
                        <button 
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg py-3 px-4 font-medium text-secondary-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                        
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
                            onClick={() => alert("Sign up functionality coming soon!")}
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
