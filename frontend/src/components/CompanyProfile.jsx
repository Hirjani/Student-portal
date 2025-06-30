import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { errorToast, successToast } from "../lib/toast";

const CompanyProfile = () => {
  const formDataInitialState = {
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    companyLogoUrl: "",
    headquarters: "",
    companyPhone: "",
    companyEmail: "",
  };
  const [formData, setFormData] = useState(formDataInitialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form submitted:", formData);
      const updatedData = {};
      for (const key in formDataInitialState) {
        if (formData[key] !== "") {
          updatedData[key] = formData[key];
        }
      }
      const res = await axiosInstance.put(
        "/api/user/company/profile",
        updatedData
      );

      if (res.status === 200) {
        console.log("Profile saved successfully:", res.data);
        successToast("Profile saved successfully!");
      } else {
        console.error("Error saving profile:", res.data);
        errorToast("Error saving profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving company profile:", error);
      errorToast(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/user/company/profile");
        if (res.status === 200) {
          setFormData({
            companyName: res.data.companyName || "",
            companyDescription: res.data.companyDescription || "",
            companyWebsite: res.data.companyWebsite || "",
            companyLogoUrl: res.data.companyLogoUrl || "",
            headquarters: res.data.headquarters || "",
            companyPhone: res.data.companyPhone || "",
            companyEmail: res.data.companyEmail || "",
          });
        } else {
          console.error("Error fetching profile:", res.data);
        }
      } catch (error) {
        console.error("Error fetching company profile:", error);
      }
    };
    fetchCompanyProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg">
          <div className="px-6 py-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Company Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Create or update your company information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter your company name"
              />
            </div>

            {/* Company Description */}
            <div>
              <label
                htmlFor="companyDescription"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Description
              </label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-vertical"
                placeholder="Describe your company, mission, and values..."
              />
            </div>

            {/* Company Website */}
            <div>
              <label
                htmlFor="companyWebsite"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Website
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">🌐</span>
                </div>
                <input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="https://www.yourcompany.com"
                />
              </div>
            </div>

            {/* Company Logo URL */}
            <div>
              <label
                htmlFor="companyLogoUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Logo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">🖼️</span>
                </div>
                <input
                  type="url"
                  id="companyLogoUrl"
                  name="companyLogoUrl"
                  value={formData.companyLogoUrl}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              {formData.companyLogoUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                  <img
                    src={formData.companyLogoUrl}
                    alt="Company Logo Preview"
                    className="w-20 h-20 object-contain border border-gray-200 rounded-md"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Headquarters */}
            <div>
              <label
                htmlFor="headquarters"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Headquarters
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">📍</span>
                </div>
                <input
                  type="text"
                  id="headquarters"
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="City, State, Country"
                />
              </div>
            </div>

            {/* Company Phone */}
            <div>
              <label
                htmlFor="companyPhone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">📞</span>
                </div>
                <input
                  type="tel"
                  id="companyPhone"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Company Email */}
            <div>
              <label
                htmlFor="companyEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">📧</span>
                </div>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="contact@yourcompany.com"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 shadow-sm"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
