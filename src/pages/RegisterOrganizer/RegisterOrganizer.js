import React from "react";
import { useEffect, useState } from "react";
import { GetUser } from "../../services/UserStorageService";
import { useNavigate } from "react-router-dom";
import { RegisterOrganizerApi } from "../../services/api/AccountApi";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

function RegisterOrganizer() {
    const navigate = useNavigate();
    const [currentUser] = useState(GetUser());
    const [organizerInfo, setOrganizerInfo] = useState({
        name: "",
        description: "",
        userId: "",
    });
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [acceptTerms, setAcceptTerms] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        } else {
            setOrganizerInfo(prev => ({ ...prev, userId: currentUser?.userName }));
        }
    }, [currentUser, navigate]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!organizerInfo.name.trim()) {
            newErrors.name = "Organizer name is required";
        } else if (organizerInfo.name.length < 3) {
            newErrors.name = "Organizer name must be at least 3 characters";
        }
        
        if (!organizerInfo.description.trim()) {
            newErrors.description = "Description is required";
        } else if (organizerInfo.description.length < 20) {
            newErrors.description = "Description must be at least 20 characters";
        }
        
        if (!logo) {
            newErrors.logo = "Logo is required";
        }
        
        if (!acceptTerms) {
            newErrors.terms = "You must accept the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, logo: 'Please select a valid image file' }));
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, logo: 'File size must be less than 5MB' }));
                return;
            }
            
            setLogo(file);
            setErrors(prev => ({ ...prev, logo: '' }));
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => setLogoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const registerOrganizerRequest = new FormData();
            registerOrganizerRequest.append("organizerInfo", JSON.stringify(organizerInfo));
            registerOrganizerRequest.append("logo", logo);

            const response = await RegisterOrganizerApi(registerOrganizerRequest);

            if (response) {
                alert("Register organizer successfully! Please sign in again to access organizer features.");
                navigate("/signin");
            } else {
                alert("Register organizer failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const termsAndConditions = [
        "Provide accurate and complete information about events",
        "Ensure events comply with all applicable laws and regulations",
        "Handle customer inquiries and complaints promptly and professionally",
        "Ensure the safety and security of attendees at events",
        "Not sell tickets above the maximum capacity of the venue",
        "Provide refunds in accordance with the stated refund policy",
        "Comply with the platform's privacy policy and terms of service",
        "Ensure all promotional materials are truthful and not misleading",
        "Not engage in any fraudulent or deceptive practices",
        "Not use the ticketing system for illegal or unauthorized purposes"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-secondary-900 py-8 px-4 transition-colors duration-300">
            <ThemeToggle />
            
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button 
                        onClick={() => navigate("/")}
                        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </button>
                    <h1 className="text-4xl font-bold text-secondary-700 dark:text-primary-400 mb-2">Become an Organizer</h1>
                    <p className="text-secondary-500 dark:text-gray-300 max-w-2xl mx-auto">
                        Join our platform as an event organizer and start creating amazing experiences for your audience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold text-secondary-700 dark:text-white mb-6">
                                Organizer Information
                            </h2>

                            <form onSubmit={HandleSubmit} className="space-y-6">
                                {/* Organizer Name */}
                                <div>
                                    <label htmlFor="organizername" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                        Organizer Name *
                                    </label>
                                    <input
                                        value={organizerInfo.name}
                                        onChange={(e) => setOrganizerInfo({ ...organizerInfo, name: e.target.value })}
                                        type="text"
                                        id="organizername"
                                        placeholder="Enter your organization name"
                                        className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                            errors.name 
                                                ? 'border-red-500 dark:border-red-400' 
                                                : 'border-gray-300 dark:border-gray-600'
                                        } rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none`}
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="organizerdescription" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                        Organization Description *
                                    </label>
                                    <textarea
                                        value={organizerInfo.description}
                                        onChange={(e) => setOrganizerInfo({ ...organizerInfo, description: e.target.value })}
                                        id="organizerdescription"
                                        rows={4}
                                        placeholder="Tell us about your organization, what types of events you plan to organize, and your experience..."
                                        className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                                            errors.description 
                                                ? 'border-red-500 dark:border-red-400' 
                                                : 'border-gray-300 dark:border-gray-600'
                                        } rounded-lg text-secondary-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none resize-vertical`}
                                        required
                                    />
                                    <div className="mt-1 flex justify-between text-sm">
                                        {errors.description && <p className="text-red-500 dark:text-red-400">{errors.description}</p>}
                                        <p className="text-gray-500 dark:text-gray-400 ml-auto">
                                            {organizerInfo.description.length}/500
                                        </p>
                                    </div>
                                </div>

                                {/* Logo Upload */}
                                <div>
                                    <label htmlFor="organizeravt" className="block text-sm font-medium text-secondary-700 dark:text-gray-200 mb-2">
                                        Organization Logo *
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-primary-400 dark:hover:border-primary-500 transition-colors duration-200">
                                        <div className="space-y-1 text-center">
                                            {logoPreview ? (
                                                <div className="mb-4">
                                                    <img
                                                        src={logoPreview}
                                                        alt="Logo preview"
                                                        className="mx-auto h-32 w-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                                    />
                                                </div>
                                            ) : (
                                                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label htmlFor="organizeravt" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                                    <span>{logoPreview ? 'Change logo' : 'Upload a logo'}</span>
                                                    <input
                                                        id="organizeravt"
                                                        name="organizeravt"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleLogoChange}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                        </div>
                                    </div>
                                    {errors.logo && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.logo}</p>}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <div className="flex items-start">
                                        <input
                                            id="acceptTerms"
                                            name="acceptTerms"
                                            type="checkbox"
                                            checked={acceptTerms}
                                            onChange={(e) => setAcceptTerms(e.target.checked)}
                                            className="h-4 w-4 text-primary-500 focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded mt-1"
                                        />
                                        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-secondary-600 dark:text-gray-300">
                                            I agree to the Terms and Conditions for Event Organizers and understand my responsibilities as listed in the requirements section.
                                        </label>
                                    </div>
                                    {errors.terms && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.terms}</p>}
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
                                            Submitting Application...
                                        </div>
                                    ) : (
                                        'Submit Application'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Requirements Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-8">
                            <h3 className="text-xl font-semibold text-secondary-700 dark:text-white mb-4">
                                Organizer Requirements
                            </h3>
                            <p className="text-sm text-secondary-600 dark:text-gray-300 mb-4">
                                As an event organizer on our platform, you agree to:
                            </p>
                            <ul className="space-y-3">
                                {termsAndConditions.map((term, index) => (
                                    <li key={index} className="flex items-start text-sm text-secondary-600 dark:text-gray-300">
                                        <svg className="w-4 h-4 text-primary-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {term}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                                <h4 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
                                    Benefits of Being an Organizer
                                </h4>
                                <ul className="text-sm text-primary-600 dark:text-primary-400 space-y-1">
                                    <li>• Access to organizer dashboard</li>
                                    <li>• Event analytics and insights</li>
                                    <li>• Customer management tools</li>
                                    <li>• Marketing support</li>
                                    <li>• Revenue tracking</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterOrganizer;
