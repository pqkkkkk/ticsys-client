import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpApi } from "../../services/api/AccountApi";
import { format } from "date-fns";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

function SignUp() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!fullname.trim()) newErrors.fullname = "Full name is required";
        if (!username.trim()) newErrors.username = "Username is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!phone.trim()) newErrors.phone = "Phone number is required";
        if (!gender) newErrors.gender = "Gender is required";
        if (!birthday) newErrors.birthday = "Birthday is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const HandleSignUp = async () => {
        if (!validateForm()) return;

        const signUpRequest = {
            fullName: fullname,
            userName: username,
            email: email,
            passWord: password,
            phoneNumber: phone,
            birthday: format(new Date(birthday), "yyyy-MM-dd"),
            gender: gender,
            roles: ["USER"],
            avatarPath: ""
        };

        setIsLoading(true);
        try {
            const response = await SignUpApi(signUpRequest);
            if (response) {
                console.log(response);
                if (response === "successfully") {
                    alert("Sign up successful");
                    navigate("/signin");
                } else {
                    alert("Sign up failed");
                }
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInRedirect = () => {
        navigate("/signin");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-secondary-900 flex items-center justify-center p-4">
            <ThemeToggle />
            <div className="w-full max-w-2xl">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-secondary-700 dark:text-primary-400 mb-2">TicSys</h1>
                    <p className="text-secondary-500 dark:text-gray-300">Create your account to get started</p>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                    {/* Welcome Text */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-secondary-700 dark:text-white mb-2">Join TicSys</h2>
                        <p className="text-secondary-500 dark:text-gray-300">Fill in your information to create an account</p>
                    </div>

                    {/* Sign Up Form */}
                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); HandleSignUp(); }}>
                        {/* Full Name & Username Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fullname" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                    Full Name
                                </label>
                                <input
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    type="text"
                                    id="fullname"
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                        errors.fullname 
                                            ? 'border-red-500 dark:border-red-400' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    } rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                    required
                                />
                                {errors.fullname && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.fullname}</p>}
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                    Username
                                </label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    id="username"
                                    placeholder="Choose a username"
                                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                        errors.username 
                                            ? 'border-red-500 dark:border-red-400' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    } rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                    required
                                />
                                {errors.username && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.username}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                Email Address
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                placeholder="Enter your email address"
                                className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                    errors.email 
                                        ? 'border-red-500 dark:border-red-400' 
                                        : 'border-gray-300 dark:border-gray-600'
                                } rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
                        </div>

                        {/* Password & Confirm Password Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    placeholder="Create a password"
                                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                        errors.password 
                                            ? 'border-red-500 dark:border-red-400' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    } rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                    required
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                        errors.confirmPassword 
                                            ? 'border-red-500 dark:border-red-400' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    } rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                    required
                                />
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        {/* Phone & Gender Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="tel"
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                        errors.phone 
                                            ? 'border-red-500 dark:border-red-400' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    } rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                    required
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                    Gender
                                </label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    id="gender"
                                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                        errors.gender 
                                            ? 'border-red-500 dark:border-red-400' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    } rounded-lg text-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                    required
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.gender}</p>}
                            </div>
                        </div>

                        {/* Birthday */}
                        <div>
                            <label htmlFor="birthday" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                Birthday
                            </label>
                            <input
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                type="date"
                                id="birthday"
                                className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                    errors.birthday 
                                        ? 'border-red-500 dark:border-red-400' 
                                        : 'border-gray-300 dark:border-gray-600'
                                } rounded-lg text-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                required
                            />
                            {errors.birthday && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.birthday}</p>}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-primary-500 focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded mt-1"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-secondary-600 dark:text-gray-300">
                                I agree to the{' '}
                                <button 
                                    type="button"
                                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium bg-transparent border-none cursor-pointer underline"
                                    onClick={() => alert("Terms and conditions coming soon!")}
                                >
                                    Terms and Conditions
                                </button>
                                {' '}and{' '}
                                <button 
                                    type="button"
                                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium bg-transparent border-none cursor-pointer underline"
                                    onClick={() => alert("Privacy policy coming soon!")}
                                >
                                    Privacy Policy
                                </button>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center mt-6 text-secondary-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <button 
                            type="button"
                            onClick={handleSignInRedirect}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium bg-transparent border-none cursor-pointer underline"
                        >
                            Sign in here
                        </button>
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-400 dark:text-gray-400">
                    © 2025 TicSys. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default SignUp;
