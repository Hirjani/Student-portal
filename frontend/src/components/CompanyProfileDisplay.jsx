import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { errorToast } from "../lib/toast";
import { useSearchParams } from "react-router-dom";

const CompanyProfileDisplay = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const companyId = searchParams.get("id");

  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/user/company/display?id=" + companyId
        );
        if (res.status === 200) {
          setCompanyData(res.data);
        } else {
          console.error("Error fetching profile:", res.data);
          errorToast("Error loading company profile");
        }
      } catch (error) {
        console.error("Error fetching company profile:", error);
        errorToast("Error loading company profile");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading company profile...</p>
        </div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Company Profile Found
          </h2>
          <p className="text-gray-600">
            Please create your company profile first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-t-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                {companyData.companyLogoUrl ? (
                  <img
                    src={companyData.companyLogoUrl}
                    alt={`${companyData.companyName} Logo`}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain bg-white rounded-2xl shadow-lg p-4"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">🏢</span>
                  </div>
                )}
              </div>

              {/* Company Name and Basic Info */}
              <div className="text-center md:text-left text-white flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {companyData.companyName || "Company Name"}
                </h1>
                {companyData.headquarters && (
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-100 mb-4">
                    <span className="text-lg">📍</span>
                    <span className="text-lg">{companyData.headquarters}</span>
                  </div>
                )}
                {companyData.companyWebsite && (
                  <a
                    href={companyData.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 px-4 py-2 rounded-lg text-white"
                  >
                    <span>🌐</span>
                    <span>Visit Website</span>
                    <span>↗️</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Company Description Section */}
        {companyData.companyDescription && (
          <div className="bg-white shadow-xl px-8 py-8 border-t border-gray-100">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">📝</span>
                About Us
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {companyData.companyDescription}
              </p>
            </div>
          </div>
        )}

        {/* Company Details Grid */}
        <div className="bg-white rounded-b-2xl shadow-xl px-8 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">ℹ️</span>
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">🏢</span>
                <h3 className="text-lg font-semibold text-gray-800">
                  Company Name
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                {companyData.companyName || "Not specified"}
              </p>
            </div>

            {/* Headquarters Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">📍</span>
                <h3 className="text-lg font-semibold text-gray-800">
                  Headquarters
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                {companyData.headquarters || "Not specified"}
              </p>
            </div>

            {/* Website Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">🌐</span>
                <h3 className="text-lg font-semibold text-gray-800">Website</h3>
              </div>
              {companyData.companyWebsite ? (
                <a
                  href={companyData.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 text-lg underline transition-colors duration-200"
                >
                  {companyData.companyWebsite}
                </a>
              ) : (
                <p className="text-gray-600 text-lg">Not specified</p>
              )}
            </div>

            {/* Founded Date (if you add this field later) */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">📅</span>
                <h3 className="text-lg font-semibold text-gray-800">
                  Profile Created
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                {companyData.createdAt
                  ? new Date(companyData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileDisplay;
